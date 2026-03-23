import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface ShellProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {}

export const Shell = forwardRef<HTMLDivElement, ShellProps>(function Shell(
  { className, tone, size, state, density, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("od-shell", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});

