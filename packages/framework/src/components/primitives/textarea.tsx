import {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import {
  type FieldSize,
  semanticDataAttributes,
  type SemanticProps,
  type State,
  type Tone,
} from "../../lib/data-attrs";
import { FieldShell } from "./field-shell";

/** Props for the {@link Textarea} component. */
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix">,
    SemanticProps<FieldSize> {
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
 * Multi-line text input with optional chrome (prefix, inset label, hint, message).
 * Shares geometry and chrome layout with {@link Input} and {@link Select}
 * via the internal {@link FieldShell} wrapper.
 *
 * @example
 * ```tsx
 * <Textarea insetLabel="Mission Brief" rows={4} />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      disabled,
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
    const resolvedState: State = disabled
      ? "disabled"
      : invalid
        ? "error"
        : state ?? "default";
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
        <textarea
          ref={ref}
          className={cn("od-textarea", className)}
          aria-invalid={invalid || undefined}
          aria-required={props.required || undefined}
          {...semanticProps}
          {...props}
        />
      );
    }

    return (
      <FieldShell
        className={className}
        controlKind="textarea"
        density={density}
        hint={hint}
        insetLabel={insetLabel}
        message={message}
        prefix={prefix}
        size={size}
        tone={resolvedTone}
      >
        {({ hintId, messageId }) => {
          const describedBy = [messageId, hintId].filter(Boolean).join(" ") || undefined;
          return (
            <textarea
              ref={ref}
              className="od-textarea"
              aria-invalid={invalid || undefined}
              aria-required={props.required || undefined}
              aria-describedby={describedBy}
              disabled={disabled}
              {...semanticProps}
              {...props}
            />
          );
        }}
      </FieldShell>
    );
  },
);
