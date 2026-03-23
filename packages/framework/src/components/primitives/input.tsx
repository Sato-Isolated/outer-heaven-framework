import {
  forwardRef,
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

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    SemanticProps {
  invalid?: boolean;
  prefix?: ReactNode;
  insetLabel?: string;
  hint?: string;
  message?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    density,
    hint,
    insetLabel,
    invalid = false,
    message,
    prefix,
    size,
    state,
    tone,
    ...props
  },
  ref,
) {
  const resolvedState: State = invalid ? "error" : state ?? "default";
  const resolvedTone: Tone | undefined =
    resolvedState === "error"
      ? tone ?? "danger"
      : resolvedState === "warning"
        ? tone ?? "warning"
        : tone;
  const hasChrome = Boolean(prefix || insetLabel || hint || message);
  const semanticProps = semanticDataAttributes({
    tone: resolvedTone,
    size,
    state: resolvedState,
    density,
  });

  if (!hasChrome) {
    return (
      <input
        ref={ref}
        className={cn("od-input", className)}
        aria-invalid={invalid || undefined}
        {...semanticProps}
        {...props}
      />
    );
  }

  return (
    <div className={cn("od-field", className)}>
      <div className="od-control-wrap">
        {prefix ? <span className="od-control-prefix">{prefix}</span> : null}
        {insetLabel ? (
          <span className="od-control-inset-label">{insetLabel}</span>
        ) : null}
        <input
          ref={ref}
          className="od-input"
          aria-invalid={invalid || undefined}
          data-has-prefix={prefix ? "true" : undefined}
          data-has-label={insetLabel ? "true" : undefined}
          {...semanticProps}
          {...props}
        />
      </div>
      {hint || message ? (
        <div className="od-control-meta">
          {hint ? <p className="od-control-hint">{hint}</p> : null}
          {message ? (
            <p
              className="od-control-message"
              data-tone={resolvedTone ?? "muted"}
            >
              {message}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
