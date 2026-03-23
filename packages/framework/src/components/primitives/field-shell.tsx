import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";

export interface FieldShellProps {
  children: ReactNode;
  className?: string;
  controlKind: "input" | "select" | "textarea";
  hint?: string;
  indicator?: ReactNode;
  insetLabel?: string;
  message?: string;
  prefix?: ReactNode;
  tone?: Tone;
}

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
          {children}
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
          {hint ? <p className="od-field-hint">{hint}</p> : null}
          {message ? (
            <p className="od-field-message" data-tone={tone ?? "muted"}>
              {message}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}