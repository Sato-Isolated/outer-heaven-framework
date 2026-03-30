"use client";

import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type VisualSize,
} from "../../lib/data-attrs";
import { Button } from "./button";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

/** Props for the {@link Dialog} component. */
export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    SemanticProps<VisualSize> {
  /** Whether the dialog is visible. */
  open: boolean;
  /** Callback when the dialog requests a close (Escape, backdrop). */
  onOpenChange?: (open: boolean) => void;
  /** Dialog heading rendered in the header region. */
  title: string;
  /** Secondary descriptive text below the title. */
  description?: string;
  /** Footer slot (e.g. action buttons). */
  footer?: ReactNode;
  /** Close on backdrop click (default `true`). */
  closeOnBackdrop?: boolean;
  /** Close on Escape key (default `true`). */
  closeOnEscape?: boolean;
  /** Ref to the element that receives initial focus when the dialog opens. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Modal dialog rendered in a portal with focus-trap and scroll-lock.
 * Restores focus to the previously-active element on close.
 *
 * @example
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen} title="Confirm">
 *   <p>Proceed with extraction?</p>
 * </Dialog>
 * ```
 */
export function Dialog({
  children,
  className,
  closeOnBackdrop = true,
  closeOnEscape = true,
  density,
  description,
  footer,
  initialFocusRef,
  onOpenChange,
  open,
  size,
  state = "open",
  title,
  tone = "muted",
  ...props
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onOpenChange?.(false);
      }
    };

    const focusTarget =
      initialFocusRef?.current ??
      getFocusableElements(panelRef.current)[0] ??
      panelRef.current;

    focusTarget?.focus();
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActiveRef.current?.focus();
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeOnEscape, initialFocusRef, onOpenChange, open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="od-dialog-backdrop"
      onClick={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn("od-dialog", className)}
        onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
          if (event.key !== "Tab") {
            return;
          }

          const focusableElements = getFocusableElements(panelRef.current);

          if (focusableElements.length === 0) {
            event.preventDefault();
            panelRef.current?.focus();
            return;
          }

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          const activeElement = document.activeElement;

          if (event.shiftKey && activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
            return;
          }

          if (!event.shiftKey && activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }}
        {...semanticDataAttributes({ tone, size, state, density })}
        {...props}
      >
        <div className="od-dialog-header">
          <div className="od-dialog-copy">
            <p className="u-mono-label text-primary">Authenticated Overlay</p>
            <h2 id={titleId} className="od-dialog-title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="od-dialog-description">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            iconOnly
            size="sm"
            ghost
            tone="muted"
            aria-label="Close dialog"
            onClick={() => onOpenChange?.(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="od-dialog-body">{children}</div>
        {footer ? <div className="od-dialog-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
