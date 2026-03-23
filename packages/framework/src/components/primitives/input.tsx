import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    SemanticProps {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, density, invalid = false, size, state, tone, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn("od-input", className)}
      aria-invalid={invalid || undefined}
      {...semanticDataAttributes({
        tone,
        size,
        state: invalid ? "error" : state,
        density,
      })}
      {...props}
    />
  );
});
