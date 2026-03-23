import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface PanelProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { className, tone, size, state, density, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn("od-panel", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});

