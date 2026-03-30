import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

/** Props for the {@link Shell} component. */
export interface ShellProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<SemanticProps, "size"> {}

/**
 * High-level surface wrapper rendered as a `<div>` with `clip-path`
 * corner cuts and tactical glow. Used for hero panels and major content areas.
 *
 * @example
 * ```tsx
 * <Shell tone="primary" state="active">...</Shell>
 * ```
 */
export const Shell = forwardRef<HTMLDivElement, ShellProps>(function Shell(
  { className, tone, state, density, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("od-shell", className)}
      {...semanticDataAttributes({ tone, state, density })}
      {...props}
    />
  );
});
