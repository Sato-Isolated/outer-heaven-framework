import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

/** Props for the {@link Badge} component. */
export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    SemanticProps {}

/**
 * Inline status label rendered as a `<span>`.
 *
 * Extends {@link SemanticProps} — tone, size, state and density are
 * converted to `data-*` attributes for pure-CSS styling.
 *
 * @example
 * ```tsx
 * <Badge tone="warning" size="sm">Tactical Theme</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, density, size = "sm", state, tone, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn("od-badge", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});

