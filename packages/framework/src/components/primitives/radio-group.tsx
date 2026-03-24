"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
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

/* ─── Context ─── */

interface RadioGroupContextValue extends SemanticProps {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error(
      "RadioGroup.Item must be used within a <RadioGroup>.",
    );
  }

  return context;
}

/* ─── RadioGroup ─── */

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">,
    SemanticProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      children,
      className,
      defaultValue,
      density,
      disabled,
      name,
      onValueChange,
      orientation = "vertical",
      size,
      state,
      tone,
      value,
      ...props
    },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? "",
    );
    const activeValue = value ?? uncontrolledValue;

    const contextValue = useMemo<RadioGroupContextValue>(
      () => ({
        name,
        value: activeValue,
        density,
        disabled,
        size,
        state,
        tone,
        onValueChange: (nextValue) => {
          if (value === undefined) {
            setUncontrolledValue(nextValue);
          }
          onValueChange?.(nextValue);
        },
      }),
      [activeValue, density, disabled, name, onValueChange, size, state, tone, value],
    );

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      const group = event.currentTarget;
      const items = Array.from(
        group.querySelectorAll<HTMLInputElement>(
          'input[type="radio"]:not(:disabled)',
        ),
      );
      const current = items.indexOf(event.target as HTMLInputElement);

      if (current === -1) return;

      const isVertical = orientation === "vertical";
      const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
      const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

      let next: number | undefined;

      switch (event.key) {
        case nextKey:
          next = (current + 1) % items.length;
          break;
        case prevKey:
          next = (current - 1 + items.length) % items.length;
          break;
        default:
          return;
      }

      event.preventDefault();
      items[next].focus();
      items[next].click();
    }

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          data-orientation={orientation}
          className={cn("od-radio-group", className)}
          onKeyDown={handleKeyDown}
          {...semanticDataAttributes({ tone, size, state, density })}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

/* ─── RadioGroupItem ─── */

export interface RadioGroupItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    SemanticProps {
  value: string;
  invalid?: boolean;
  description?: ReactNode;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  function RadioGroupItem(
    {
      children,
      className,
      density,
      description,
      disabled: itemDisabled,
      invalid = false,
      size,
      state,
      tone,
      value,
      ...props
    },
    ref,
  ) {
    const group = useRadioGroupContext();
    const baseId = useId();
    const labelId = children ? `${baseId}-label` : undefined;
    const descriptionId = description ? `${baseId}-description` : undefined;
    const disabled = itemDisabled || group.disabled;
    const checked = group.value === value;
    const resolvedState: State = disabled
      ? "disabled"
      : invalid
        ? "error"
        : checked
          ? "active"
          : state ?? "default";
    const resolvedTone: Tone | undefined =
      resolvedState === "error" ? tone ?? "danger" : tone ?? group.tone;

    return (
      <label
        className={cn("od-radio", className)}
        {...semanticDataAttributes({
          tone: resolvedTone,
          size: size ?? group.size,
          state: resolvedState,
          density: density ?? group.density,
        })}
      >
        <input
          ref={ref}
          className="od-radio-input"
          type="radio"
          name={group.name}
          value={value}
          checked={checked}
          disabled={disabled}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          onChange={() => group.onValueChange(value)}
          {...props}
        />
        <span aria-hidden="true" className="od-radio-control">
          <span className="od-radio-indicator" />
        </span>
        {children || description ? (
          <span className="od-radio-copy">
            {children ? (
              <span id={labelId} className="od-radio-label">
                {children}
              </span>
            ) : null}
            {description ? (
              <span id={descriptionId} className="od-radio-description">
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);
