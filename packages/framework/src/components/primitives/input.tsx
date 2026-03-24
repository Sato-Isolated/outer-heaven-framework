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

/** Props for the {@link Input} component. */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    SemanticProps {
  /** Mark as invalid — auto-sets `tone="danger"` and `aria-invalid`. */
  invalid?: boolean;
  /** Leading adornment (icon, symbol). */
  prefix?: ReactNode;
  /** Floating label inside the field border. */
  insetLabel?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Validation / status message. */
  message?: string;
}

/**
 * Text input with optional chrome (prefix, inset label, hint, message).
 * When no chrome props are set the component renders a bare `<input>`;
 * otherwise it wraps in {@link FieldShell}.
 *
 * @example
 * ```tsx
 * <Input placeholder="Callsign" />
 * <Input insetLabel="Passphrase" invalid message="Required" />
 * ```
 */
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
