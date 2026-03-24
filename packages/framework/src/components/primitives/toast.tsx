"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type Tone,
} from "../../lib/data-attrs";
import { DEFAULT_TOAST_DURATION, TOAST_DISMISS_ANIMATION_MS } from "../../lib/constants";
import { Button } from "./button";

/** Props for the {@link Toast} component. */
export interface ToastProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  /** Toast heading. */
  title: string;
  /** Secondary descriptive text. */
  description?: string;
  /** Auto-dismiss delay in ms (default `4200`). */
  duration?: number;
  /** Callback when the toast is dismissed. */
  onDismiss?: () => void;
  /** Action slot (e.g. undo button). */
  action?: ReactNode;
  /** Pause auto-dismiss timer on hover (default `true`). */
  pauseOnHover?: boolean;
  /** Show progress bar (default `true`). */
  showProgress?: boolean;
}

interface ToastRecord extends ToastProps {
  id: string;
  closing?: boolean;
}

interface ToastContextValue {
  push: (toast: Omit<ToastRecord, "id" | "closing">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Individual notification toast with auto-dismiss timer and progress bar.
 * Typically used inside a {@link ToastProvider} — prefer {@link useToast}
 * over rendering `<Toast>` directly.
 */
export function Toast({
  action,
  className,
  closing,
  density,
  description,
  duration = DEFAULT_TOAST_DURATION,
  onDismiss,
  pauseOnHover = true,
  showProgress = true,
  size = "md",
  state = "open",
  title,
  tone = "muted",
  ...props
}: ToastProps & { closing?: boolean }) {
  const remainingRef = useRef(duration);
  const startedAtRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    remainingRef.current = duration;
  }, [duration]);

  useEffect(() => {
    if (!onDismiss || paused || state !== "open") {
      return;
    }

    startedAtRef.current = window.performance.now();
    const timeout = window.setTimeout(() => onDismiss(), remainingRef.current);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [onDismiss, paused, state]);

  return (
    <div
      role="status"
      className={cn(
        "od-toast",
        (closing || state !== "open") && "od-toast-closing",
        className,
      )}
      style={
        {
          "--od-toast-duration": `${duration}ms`,
        } as CSSProperties
      }
      onMouseEnter={() => {
        if (pauseOnHover && state === "open") {
          if (startedAtRef.current !== null) {
            const elapsed = window.performance.now() - startedAtRef.current;
            remainingRef.current = Math.max(0, remainingRef.current - elapsed);
            startedAtRef.current = null;
          }
          setPaused(true);
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover && state === "open") {
          setPaused(false);
        }
      }}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
          <p className="u-mono-label u-tone-text">Signal Relay</p>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
          {action ? <div className="pt-1">{action}</div> : null}
        </div>
        {onDismiss ? (
          <Button
            iconOnly
            size="sm"
            ghost
            tone={tone}
            aria-label="Dismiss toast"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      {showProgress && state === "open" ? (
        <div aria-hidden="true" className="od-toast-progress" />
      ) : null}
    </div>
  );
}

/**
 * Context provider that manages toast state and renders a viewport portal.
 * Wrap your app root with `<ToastProvider>` to enable {@link useToast}.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const closeTimeoutsRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const closeTimeouts = closeTimeoutsRef.current;

    return () => {
      for (const timeout of closeTimeouts.values()) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timeout = closeTimeoutsRef.current.get(id);

    if (timeout) {
      window.clearTimeout(timeout);
      closeTimeoutsRef.current.delete(id);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id ? { ...toast, closing: true } : toast,
      ),
    );

    const existingTimeout = closeTimeoutsRef.current.get(id);

    if (existingTimeout) {
      window.clearTimeout(existingTimeout);
    }

    const timeout = window.setTimeout(() => removeToast(id), TOAST_DISMISS_ANIMATION_MS);
    closeTimeoutsRef.current.set(id, timeout);
  }, [removeToast]);

  const push = useCallback((toast: Omit<ToastRecord, "id" | "closing">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id, closing: false }]);
  }, []);

  const value = useMemo(
    () => ({
      push,
      dismiss,
    }),
    [dismiss, push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="od-toast-viewport" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            closing={toast.closing}
            state={toast.closing ? "disabled" : "open"}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook to push and dismiss toasts from anywhere inside a {@link ToastProvider}.
 *
 * @example
 * ```tsx
 * const { push, dismiss } = useToast();
 * push({ title: "Mission logged", tone: "success" });
 * ```
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}

/**
 * Convenience factory that creates a toast payload for a given
 * {@link Tone}, title and description.
 *
 * @example
 * ```tsx
 * push(toneToast("danger", "Breach detected", "Perimeter compromised"));
 * ```
 */
export function toneToast(
  tone: Tone,
  title: string,
  description: string,
): Omit<ToastRecord, "id" | "closing"> {
  return {
    tone,
    title,
    description,
  };
}
