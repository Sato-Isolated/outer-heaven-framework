import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";

/** Props for the {@link FieldShell} internal wrapper. */
export interface FieldShellProps {
  children: (ids: FieldShellIds) => ReactNode;
  className?: string;
  /** Which native control this shell wraps — drives geometry data-attr. */
  controlKind: "input" | "select" | "textarea";
  /** Light helper text below the control. */
  hint?: string;
  /** Trailing adornment inside the control row (e.g. chevron, icon). */
  indicator?: ReactNode;
  /** Floating label rendered inside the control border. */
  insetLabel?: string;
  /** Validation or status message below the control. */
  message?: string;
  /** Leading adornment before the control (e.g. icon, currency symbol). */
  prefix?: ReactNode;
  /** Tone passed down for message colouring. */
  tone?: Tone;
}

/** IDs exposed by {@link FieldShell} for ARIA wiring. */
export interface FieldShellIds {
  hintId: string | undefined;
  messageId: string | undefined;
}

/**
 * Internal chrome wrapper shared by {@link Input}, {@link Select} and
 * {@link Textarea}. Provides prefix, inset-label, indicator, hint and
 * message slots with shared CSS-variable-driven geometry.
 *
 * The `children` prop is a render function that receives generated IDs
 * for hint/message elements, enabling `aria-describedby` wiring.
 *
 * **Not exported from the framework barrel** — consumed only by field
 * components internally.
 */
export function FieldShell({
  children,
  className,
  controlKind,
  hint,
  indicator,
  insetLabel,
  message,
  prefix,
  tone,
}: FieldShellProps) {
  const uid = useId();
  const hintId = hint ? `${uid}-hint` : undefined;
  const messageId = message ? `${uid}-message` : undefined;

  return (
    <div className={cn("od-field", className)}>
      <div
        className="od-field-control"
        data-control-kind={controlKind}
        data-has-indicator={indicator ? "true" : undefined}
        data-has-label={insetLabel ? "true" : undefined}
        data-has-prefix={prefix ? "true" : undefined}
      >
        {insetLabel ? (
          <span className="od-field-label">{insetLabel}</span>
        ) : null}
        <div className="od-field-body">
          {prefix ? (
            <span className="od-field-adornment" data-slot="prefix">
              {prefix}
            </span>
          ) : null}
          {children({ hintId, messageId })}
          {indicator ? (
            <span
              aria-hidden="true"
              className="od-field-adornment"
              data-slot="indicator"
            >
              {indicator}
            </span>
          ) : null}
        </div>
      </div>
      {hint || message ? (
        <div className="od-field-meta">
          {hint ? <p id={hintId} className="od-field-hint">{hint}</p> : null}
          {message ? (
            <p id={messageId} className="od-field-message" data-tone={tone ?? "muted"}>
              {message}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}