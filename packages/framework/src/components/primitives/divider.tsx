import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  orientation?: "horizontal" | "vertical";
  contrast?: "subtle" | "strong";
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    className,
    contrast = "subtle",
    density,
    orientation = "horizontal",
    size,
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
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});

