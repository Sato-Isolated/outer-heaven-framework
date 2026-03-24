"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

type TooltipSide = "top" | "bottom";

function composeHandler<E>(
  original?: (event: E) => void,
  next?: (event: E) => void,
) {
  return (event: E) => {
    original?.(event);
    next?.(event);
  };
}

/** Props for the {@link Tooltip} component. */
export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content" | "children">,
    SemanticProps {
  /** The trigger element the tooltip anchors to. */
  children: ReactElement;
  /** Tooltip content (text or JSX). */
  content: ReactNode;
  /** Preferred placement relative to the trigger. */
  side?: TooltipSide;
  /** Delay before opening in ms (default `120`). */
  openDelay?: number;
}

/**
 * Hover / focus tooltip rendered in a portal.
 * Repositions on scroll/resize and closes on Escape.
 *
 * @example
 * ```tsx
 * <Tooltip content="Copy to clipboard">
 *   <Button iconOnly><Copy /></Button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  children,
  className,
  content,
  density,
  openDelay = 120,
  side = "top",
  size = "sm",
  state = "default",
  tone = "muted",
  ...props
}: TooltipProps) {
  const tooltipId = useId();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const delayRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const updatePosition = useCallback(() => {
    const rect = anchorRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const gap = 12;
    const left = rect.left + rect.width / 2;
    const top =
      side === "bottom" ? rect.bottom + gap : Math.max(rect.top - gap, gap);

    setPosition({ left, top });
  }, [side]);

  useEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    return () => {
      if (delayRef.current !== null) {
        window.clearTimeout(delayRef.current);
      }
    };
  }, []);

  if (!isValidElement(children)) {
    return null;
  }

  const triggerChild = children as ReactElement<{
    "aria-describedby"?: string;
    onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
    onFocus?: (event: FocusEvent<HTMLElement>) => void;
    onBlur?: (event: FocusEvent<HTMLElement>) => void;
  }>;

  const openTooltip = () => {
    if (delayRef.current !== null) {
      window.clearTimeout(delayRef.current);
    }

    delayRef.current = window.setTimeout(() => {
      updatePosition();
      setOpen(true);
    }, openDelay);
  };

  const closeTooltip = () => {
    if (delayRef.current !== null) {
      window.clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    setOpen(false);
  };

  const trigger = cloneElement(triggerChild, {
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: composeHandler(triggerChild.props.onMouseEnter, openTooltip),
    onMouseLeave: composeHandler(triggerChild.props.onMouseLeave, closeTooltip),
    onFocus: composeHandler(triggerChild.props.onFocus, openTooltip),
    onBlur: composeHandler(triggerChild.props.onBlur, closeTooltip),
  });

  return (
    <>
      <span ref={anchorRef} className="od-tooltip-anchor">
        {trigger}
      </span>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              id={tooltipId}
              role="tooltip"
              className={cn("od-tooltip", className)}
              style={
                {
                  left: `${position.left}px`,
                  top: `${position.top}px`,
                  "--od-tooltip-translate":
                    side === "bottom" ? "translate(-50%, 0)" : "translate(-50%, -100%)",
                } as CSSProperties
              }
              {...semanticDataAttributes({ tone, size, state, density })}
              {...props}
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
