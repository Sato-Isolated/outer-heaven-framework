"use client";

import {
  forwardRef,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type State,
  type Tone,
} from "../../lib/data-attrs";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange">,
    SemanticProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  invalid?: boolean;
  label?: ReactNode;
  description?: ReactNode;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    className,
    defaultChecked = false,
    density,
    description,
    disabled,
    invalid = false,
    label,
    onCheckedChange,
    onClick,
    size,
    state,
    tone,
    type = "button",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;
  const labelId = useMemo(
    () => (label ? `${generatedId}-label` : undefined),
    [generatedId, label],
  );
  const describedById = useMemo(
    () => (description ? `${generatedId}-description` : undefined),
    [description, generatedId],
  );
  const resolvedState: State = disabled
    ? "disabled"
    : invalid
      ? "error"
      : isChecked
        ? "active"
        : state ?? "default";
  const resolvedTone: Tone | undefined =
    resolvedState === "error" ? tone ?? "danger" : tone;

  return (
    <div
      className={cn("od-switch", className)}
      {...semanticDataAttributes({
        tone: resolvedTone,
        size,
        state: resolvedState,
        density,
      })}
    >
      <button
        {...props}
        ref={ref}
        type={type}
        className="od-switch-control"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={labelId}
        aria-describedby={describedById}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        data-checked={isChecked ? "true" : "false"}
        onClick={(event) => {
          if (!disabled) {
            const nextChecked = !isChecked;
            if (!isControlled) {
              setUncontrolledChecked(nextChecked);
            }
            onCheckedChange?.(nextChecked);
          }

          onClick?.(event);
        }}
      >
        <span aria-hidden="true" className="od-switch-thumb" />
      </button>
      {label || description ? (
        <div className="od-switch-copy">
          {label ? (
            <span id={labelId} className="od-switch-label">
              {label}
            </span>
          ) : null}
          {description ? (
            <span id={describedById} className="od-switch-description">
              {description}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
