import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

/** Props for the {@link Divider} component. */
export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<SemanticProps, "size"> {
  /** Axis of the divider line. @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** Visual weight. @defaultValue `"subtle"` */
  contrast?: "subtle" | "strong";
}

/**
 * Decorative separator with `role="separator"` and `aria-orientation`.
 *
 * @example
 * ```tsx
 * <Divider tone="warning" />
 * <Divider orientation="vertical" contrast="strong" />
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    className,
    contrast = "subtle",
    density,
    orientation = "horizontal",
    state,
    tone,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn("od-divider", className)}
      data-orientation={orientation}
      data-contrast={contrast}
      {...semanticDataAttributes({ tone, state, density })}
      {...props}
    />
  );
});
