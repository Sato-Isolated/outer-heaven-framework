import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type State,
} from "../../lib/data-attrs";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SemanticProps {
  variant?: "solid" | "ghost";
  iconOnly?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    density,
    disabled,
    iconOnly = false,
    loading = false,
    size,
    state,
    tone,
    type = "button",
    variant = "solid",
    ...props
  },
  ref,
) {
  const resolvedState: State = disabled
    ? "disabled"
    : loading
      ? "loading"
      : state ?? "default";

  return (
    <button
      ref={ref}
      type={type}
      className={cn("od-button", className)}
      data-variant={variant}
      data-icon={iconOnly ? "true" : "false"}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...semanticDataAttributes({
        tone,
        size,
        state: resolvedState,
        density,
      })}
      {...props}
    >
      {loading ? <span aria-hidden="true" className="od-button-spinner" /> : null}
      {children}
    </button>
  );
});

