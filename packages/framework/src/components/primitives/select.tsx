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
import { FieldShell } from "./field-shell";

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
    <FieldShell
      className={className}
      controlKind="select"
      hint={hint}
      indicator={
        <svg viewBox="0 0 16 16" focusable="false">
          <path
            d="M3.5 6.25 8 10.75l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      }
      insetLabel={insetLabel}
      message={message}
      prefix={prefix}
      tone={resolvedTone}
    >
        <select
          ref={ref}
          className="od-select"
          aria-invalid={invalid || undefined}
          {...semanticProps}
          {...props}
        />
    </FieldShell>
  );
});
