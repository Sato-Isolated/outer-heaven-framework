import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SemanticProps {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, density, size, state, tone, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn("od-select", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});
