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

/** Props for the {@link Button} component. */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SemanticProps {
  /** Render as child element via the {@link Slot} pattern. */
  asChild?: boolean;
  /** Remove background — text-only button. */
  ghost?: boolean;
  /** Square aspect ratio for icon-only buttons. Requires an accessible name. */
  iconOnly?: boolean;
  /** Show a loading spinner and set `aria-busy`. */
  loading?: boolean;
}

/**
 * Primary interactive element. Supports `asChild` polymorphism, ghost and
 * icon-only variants, and automatic state resolution (`disabled` → `"disabled"`,
 * `loading` → `"loading"`).
 *
 * @example
 * ```tsx
 * <Button tone="primary" size="sm">Deploy</Button>
 * <Button asChild ghost><Link href="/ops">Operations</Link></Button>
 * ```
 */
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
