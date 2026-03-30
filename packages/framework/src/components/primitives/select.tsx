"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";
import {
  type FieldSize,
  semanticDataAttributes,
  type SemanticProps,
  type State,
  type Tone,
} from "../../lib/data-attrs";
import { Z_INDEX_OVERLAY } from "../../lib/constants";
import { FieldShell } from "./field-shell";

/** A single option inside a {@link Select} dropdown. */
export interface SelectOption {
  value: string;
  label: string;
  /** When `true` the option is visible but not selectable. */
  disabled?: boolean;
}

/** Props for the {@link Select} component. */
export interface SelectProps extends SemanticProps<FieldSize> {
  "aria-label"?: string;
  className?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  disabled?: boolean;
  /** Helper text below the field. */
  hint?: string;
  /** Floating label inside the field border. */
  insetLabel?: string;
  /** Mark as invalid — auto-sets `tone="danger"` and `aria-invalid`. */
  invalid?: boolean;
  /** Validation / status message. */
  message?: string;
  /** Callback when the selected value changes. */
  onValueChange?: (value: string) => void;
  /** Available options. */
  options: SelectOption[];
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Leading adornment (icon, symbol). */
  prefix?: ReactNode;
  /** Mark as required for accessibility. */
  required?: boolean;
  /** Controlled value. */
  value?: string;
}

/**
 * Custom select dropdown with keyboard navigation and portal-rendered listbox.
 * Supports controlled and uncontrolled modes, {@link FieldShell} chrome, and
 * full ARIA combobox semantics.
 *
 * @example
 * ```tsx
 * <Select
 *   insetLabel="Region"
 *   options={[{ value: "eu", label: "Europe" }, { value: "us", label: "US" }]}
 *   onValueChange={setRegion}
 * />
 * ```
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      "aria-label": ariaLabel,
      className,
      defaultValue,
      density,
      disabled = false,
      hint,
      insetLabel,
      invalid = false,
      message,
      onValueChange,
      options,
      placeholder = "Select\u2026",
      prefix,
      required,
      size,
      state,
      tone,
      value: controlledValue,
    },
    ref,
  ) {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? controlledValue : internalValue;

    const [open, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const typeAheadBuffer = useRef("");
    const typeAheadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [pos, setPos] = useState<{
      top: number;
      left: number;
      width: number;
    } | null>(null);

    const uid = useId();
    const listboxId = `${uid}-listbox`;
    const optionId = (i: number) => `${uid}-opt-${i}`;

    const selectedOption = options.find((o) => o.value === currentValue);
    const displayLabel = selectedOption?.label ?? placeholder;

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

    const semanticProps = semanticDataAttributes({
      tone: resolvedTone,
      size,
      state: resolvedState,
      density,
    });

    const mergeRef = useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.RefObject<HTMLButtonElement | null>).current =
            node;
      },
      [ref],
    );

    const reposition = useCallback(() => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }, []);

    const openListbox = useCallback(() => {
      if (disabled) return;
      reposition();
      setOpen(true);
      const idx = options.findIndex(
        (o) => o.value === currentValue && !o.disabled,
      );
      setHighlightedIndex(
        idx >= 0 ? idx : options.findIndex((o) => !o.disabled),
      );
    }, [disabled, reposition, options, currentValue]);

    const closeListbox = useCallback((returnFocus = true) => {
      setOpen(false);
      setHighlightedIndex(-1);
      if (returnFocus) triggerRef.current?.focus();
    }, []);

    const selectOption = useCallback(
      (opt: SelectOption) => {
        if (opt.disabled) return;
        if (!isControlled) setInternalValue(opt.value);
        onValueChange?.(opt.value);
        closeListbox();
      },
      [isControlled, onValueChange, closeListbox],
    );

    useEffect(() => {
      if (!open) return;
      window.addEventListener("scroll", reposition, true);
      window.addEventListener("resize", reposition);
      return () => {
        window.removeEventListener("scroll", reposition, true);
        window.removeEventListener("resize", reposition);
      };
    }, [open, reposition]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        const t = e.target as Node;
        if (
          triggerRef.current?.contains(t) ||
          listboxRef.current?.contains(t)
        )
          return;
        closeListbox(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, closeListbox]);

    const nextEnabled = useCallback(
      (from: number, dir: 1 | -1) => {
        let i = from + dir;
        while (i >= 0 && i < options.length) {
          if (!options[i].disabled) return i;
          i += dir;
        }
        return from;
      },
      [options],
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
          e.preventDefault();
          openListbox();
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((i) => nextEnabled(i, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((i) => nextEnabled(i, -1));
          break;
        case "Home":
          e.preventDefault();
          setHighlightedIndex(options.findIndex((o) => !o.disabled));
          break;
        case "End": {
          e.preventDefault();
          let last = -1;
          for (let i = options.length - 1; i >= 0; i--) {
            if (!options[i].disabled) {
              last = i;
              break;
            }
          }
          if (last >= 0) setHighlightedIndex(last);
          break;
        }
        case "Enter":
        case " ":
          e.preventDefault();
          if (
            highlightedIndex >= 0 &&
            !options[highlightedIndex].disabled
          ) {
            selectOption(options[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          closeListbox();
          break;
        case "Tab":
          closeListbox();
          break;
        default: {
          /* type-ahead: jump to first option matching typed characters */
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            clearTimeout(typeAheadTimer.current);
            typeAheadBuffer.current += e.key.toLowerCase();
            typeAheadTimer.current = setTimeout(() => {
              typeAheadBuffer.current = "";
            }, 500);
            const match = options.findIndex(
              (o) =>
                !o.disabled &&
                o.label.toLowerCase().startsWith(typeAheadBuffer.current),
            );
            if (match >= 0) setHighlightedIndex(match);
          }
          break;
        }
      }
    };

    useEffect(() => {
      if (!open || highlightedIndex < 0) return;
      listboxRef.current
        ?.querySelector(`[data-index="${highlightedIndex}"]`)
        ?.scrollIntoView({ block: "nearest" });
    }, [open, highlightedIndex]);

    const chevron = (
      <svg
        className="od-select-chevron"
        viewBox="0 0 16 16"
        focusable="false"
        aria-hidden="true"
        data-open={open || undefined}
      >
        <path
          d="M3.5 6.25 8 10.75l4.5-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );

    const hasChrome = Boolean(prefix || insetLabel || hint || message);

    const listbox =
      open && pos
        ? createPortal(
            <div
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              className="od-select-listbox"
              aria-label={ariaLabel}
              {...semanticProps}
              style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                width: pos.width,
                zIndex: Z_INDEX_OVERLAY,
              }}
            >
              {options.map((opt, i) => (
                <div
                  key={opt.value}
                  id={optionId(i)}
                  role="option"
                  className="od-select-option"
                  data-index={i}
                  data-highlighted={i === highlightedIndex || undefined}
                  data-disabled={opt.disabled || undefined}
                  aria-selected={opt.value === currentValue}
                  aria-disabled={opt.disabled || undefined}
                  onMouseEnter={() => {
                    if (!opt.disabled) setHighlightedIndex(i);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(opt);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>,
            document.body,
          )
        : null;

    const trigger = (
      <button
        ref={mergeRef}
        type="button"
        role="combobox"
        className={cn("od-select", !hasChrome && className)}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && highlightedIndex >= 0
            ? optionId(highlightedIndex)
            : undefined
        }
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        disabled={disabled}
        onClick={() => (open ? closeListbox() : openListbox())}
        onKeyDown={handleKeyDown}
        {...semanticProps}
      >
        <span
          className="od-select-value"
          data-placeholder={!selectedOption || undefined}
        >
          {displayLabel}
        </span>
        {!hasChrome && chevron}
      </button>
    );

    if (!hasChrome) {
      return (
        <>
          {trigger}
          {listbox}
        </>
      );
    }

    return (
      <>
        <FieldShell
          className={className}
          controlKind="select"
          density={density}
          hint={hint}
          indicator={chevron}
          insetLabel={insetLabel}
          message={message}
          prefix={prefix}
          size={size}
          tone={resolvedTone}
        >
          {({ hintId, messageId }) => {
            const describedBy = [messageId, hintId].filter(Boolean).join(" ") || undefined;
            return (
              <button
                ref={mergeRef}
                type="button"
                role="combobox"
                className="od-select"
                aria-label={ariaLabel}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-controls={open ? listboxId : undefined}
                aria-activedescendant={
                  open && highlightedIndex >= 0
                    ? optionId(highlightedIndex)
                    : undefined
                }
                aria-invalid={invalid || undefined}
                aria-required={required || undefined}
                aria-describedby={describedBy}
                disabled={disabled}
                onClick={() => (open ? closeListbox() : openListbox())}
                onKeyDown={handleKeyDown}
                {...semanticProps}
              >
                <span
                  className="od-select-value"
                  data-placeholder={!selectedOption || undefined}
                >
                  {displayLabel}
                </span>
              </button>
            );
          }}
        </FieldShell>
        {listbox}
      </>
    );
  },
);
