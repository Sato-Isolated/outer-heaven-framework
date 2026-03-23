import {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type State,
  type Tone,
} from "../../lib/data-attrs";
import { FieldShell } from "./field-shell";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix">,
    SemanticProps {
  invalid?: boolean;
  prefix?: ReactNode;
  insetLabel?: string;
  hint?: string;
  message?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
        <textarea
          ref={ref}
          className={cn("od-textarea", className)}
          aria-invalid={invalid || undefined}
          {...semanticProps}
          {...props}
        />
      );
    }

    return (
      <FieldShell
        className={className}
        controlKind="textarea"
        hint={hint}
        insetLabel={insetLabel}
        message={message}
        prefix={prefix}
        tone={resolvedTone}
      >
          <textarea
            ref={ref}
            className="od-textarea"
            aria-invalid={invalid || undefined}
            {...semanticProps}
            {...props}
          />
      </FieldShell>
    );
  },
);
