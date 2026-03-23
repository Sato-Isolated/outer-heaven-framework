"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import { Button } from "./button";

export interface ToastProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  title: string;
  description?: string;
  duration?: number;
  onDismiss?: () => void;
  action?: ReactNode;
}

interface ToastRecord extends ToastProps {
  id: string;
}

interface ToastContextValue {
  push: (toast: Omit<ToastRecord, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function Toast({
  action,
  className,
  density,
  description,
  duration = 4200,
  onDismiss,
  size = "md",
  state = "open",
  title,
  tone = "muted",
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      className={cn("od-toast", className)}
      style={
        {
          "--od-toast-duration": `${duration}ms`,
        } as CSSProperties
      }
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="u-mono-label" style={{ color: "var(--od-tone-text)" }}>
            Signal Relay
          </p>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
          {action ? <div className="pt-1">{action}</div> : null}
        </div>
        {onDismiss ? (
          <Button
            iconOnly
            size="sm"
            variant="ghost"
            tone={tone}
            aria-label="Dismiss toast"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <div aria-hidden="true" className="od-toast-progress" />
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback((toast: Omit<ToastRecord, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismiss(toast.id), toast.duration ?? 4200),
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [dismiss, toasts]);

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
          <Toast key={toast.id} {...toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}

export function toneToast(
  tone: Tone,
  title: string,
  description: string,
): Omit<ToastRecord, "id"> {
  return {
    tone,
    title,
    description,
  };
}

