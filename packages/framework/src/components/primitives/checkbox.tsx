import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type State,
  type Tone,
} from "../../lib/data-attrs";

/** Props for the {@link Checkbox} component. */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    SemanticProps {
  /** Mark the checkbox as invalid — auto-sets `tone="danger"` and `aria-invalid`. */
  invalid?: boolean;
  /** Secondary description rendered below the label. */
  description?: ReactNode;
}

/**
 * Custom checkbox with label and optional description.
 * Wraps a native `<input type="checkbox">` for full form compatibility.
 * Automatically resolves `disabled` → `"disabled"` and `invalid` → `"error"` states.
 *
 * @example
 * ```tsx
 * <Checkbox invalid description="Required for deployment">
 *   Acknowledge risks
 * </Checkbox>
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      children,
      className,
      density,
      description,
      disabled,
      invalid = false,
      size,
      state,
      tone,
      ...props
    },
    ref,
  ) {
    const baseId = useId();
    const labelId = children ? `${baseId}-label` : undefined;
    const descriptionId = description ? `${baseId}-description` : undefined;
    const resolvedState: State = disabled
      ? "disabled"
      : invalid
        ? "error"
        : state ?? "default";
    const resolvedTone: Tone | undefined =
      resolvedState === "error" ? tone ?? "danger" : tone;

    if (
      process.env.NODE_ENV !== "production" &&
      !children &&
      !description &&
      !props["aria-label"] &&
      !props["aria-labelledby"]
    ) {
      console.error(
        "Outer Haven Framework Checkbox: a checkbox without `children`, `description`, `aria-label`, or `aria-labelledby` has no accessible name.",
      );
    }

    return (
      <label
        className={cn("od-checkbox", className)}
        {...semanticDataAttributes({
          tone: resolvedTone,
          size,
          state: resolvedState,
          density,
        })}
      >
        <input
          ref={ref}
          className="od-checkbox-input"
          type="checkbox"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          {...props}
        />
        <span aria-hidden="true" className="od-checkbox-control">
          <span className="od-checkbox-indicator" />
        </span>
        {children || description ? (
          <span className="od-checkbox-copy">
            {children ? (
              <span id={labelId} className="od-checkbox-label">
                {children}
              </span>
            ) : null}
            {description ? (
              <span id={descriptionId} className="od-checkbox-description">
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);
