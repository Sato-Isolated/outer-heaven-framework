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
import { FieldShell } from "./field-shell";

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
    <FieldShell
      className={className}
      controlKind="input"
      hint={hint}
      insetLabel={insetLabel}
      message={message}
      prefix={prefix}
      tone={resolvedTone}
    >
        <input
          ref={ref}
          className="od-input"
          aria-invalid={invalid || undefined}
          {...semanticProps}
          {...props}
        />
    </FieldShell>
  );
});
