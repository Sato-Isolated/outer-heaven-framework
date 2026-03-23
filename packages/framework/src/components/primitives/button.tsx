import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type State,
} from "../../lib/data-attrs";
import { Slot } from "../../lib/slot";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SemanticProps {
  asChild?: boolean;
  ghost?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    asChild = false,
    children,
    className,
    density,
    disabled,
    ghost = false,
    iconOnly = false,
    loading = false,
    size,
    state,
    tone,
    type = "button",
    ...props
  },
  ref,
) {
  const resolvedState: State = disabled
    ? "disabled"
    : loading
      ? "loading"
      : state ?? "default";

  if (
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !props["aria-label"] &&
    !props["aria-labelledby"] &&
    !props.title
  ) {
    console.warn(
      "Outer Heaven Framework Button: `iconOnly` buttons should provide an accessible name via `aria-label`, `aria-labelledby`, or `title`.",
    );
  }

  const sharedProps = {
    className: cn("od-button", className),
    "data-ghost": ghost ? "true" : undefined,
    "data-icon-only": iconOnly ? "true" : undefined,
    "aria-busy": loading || undefined,
    ...semanticDataAttributes({
      tone,
      size,
      state: resolvedState,
      density,
    }),
  };

  if (asChild) {
    return (
      <Slot
        ref={ref}
        aria-disabled={disabled || loading ? "true" : undefined}
        {...sharedProps}
        {...props}
      >
        {children as ReactElement}
      </Slot>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || loading}
      {...sharedProps}
      {...props}
    >
      {loading ? <span aria-hidden="true" className="od-button-spinner" /> : null}
      {children}
    </button>
  );
});
