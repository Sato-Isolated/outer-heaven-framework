import {
  forwardRef,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type State,
  type Tone,
} from "../../lib/data-attrs";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "prefix">,
    SemanticProps {
  invalid?: boolean;
  prefix?: ReactNode;
  insetLabel?: string;
  hint?: string;
  message?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
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
      <select
        ref={ref}
        className={cn("od-select", className)}
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
        <select
          ref={ref}
          className="od-select"
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
