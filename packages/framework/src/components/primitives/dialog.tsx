"use client";

import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";
import { Button } from "./button";

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    SemanticProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  footer?: ReactNode;
}

export function Dialog({
  children,
  className,
  density,
  description,
  footer,
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

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousActive = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange?.(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onOpenChange, open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="od-dialog-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
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
        {...semanticDataAttributes({ tone, size, state, density })}
        {...props}
      >
        <div className="od-dialog-header">
          <div className="space-y-2">
            <p className="u-mono-label text-primary">Authenticated Overlay</p>
            <h2 id={titleId} className="text-2xl font-semibold text-foreground">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="max-w-2xl text-sm text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            iconOnly
            size="sm"
            variant="ghost"
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

