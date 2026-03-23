"use client";

import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

interface TabsContextValue extends SemanticProps {
  activeValue: string;
  baseId: string;
  setActiveValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>.");
  }

  return context;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue">,
    SemanticProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  children,
  className,
  defaultValue,
  density,
  onValueChange,
  size,
  state = "default",
  tone = "muted",
  value,
  ...props
}: TabsProps) {
  const baseId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const activeValue = value ?? uncontrolledValue;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      activeValue,
      baseId,
      density,
      size,
      state,
      tone,
      setActiveValue: (nextValue) => {
        if (value === undefined) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
    }),
    [activeValue, baseId, density, onValueChange, size, state, tone, value],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={cn("od-tabs", className)}
        {...semanticDataAttributes({ tone, size, state, density })}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { density, size, state, tone } = useTabsContext();

  return (
    <div
      role="tablist"
      className={cn("od-tabs-list", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    SemanticProps {
  value: string;
}

export function TabsTrigger({
  children,
  className,
  value,
  ...props
}: TabsTriggerProps) {
  const { activeValue, baseId, density, setActiveValue, size, tone } =
    useTabsContext();
  const selected = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-${value}-tab`}
      aria-controls={`${baseId}-${value}-panel`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cn("od-tabs-trigger", className)}
      onClick={() => setActiveValue(value)}
      {...semanticDataAttributes({
        tone,
        size,
        state: selected ? "active" : "default",
        density,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  value: string;
  forceMount?: boolean;
}

export function TabsPanel({
  children,
  className,
  forceMount = false,
  value,
  ...props
}: TabsPanelProps) {
  const { activeValue, baseId, density, size, tone } = useTabsContext();
  const selected = activeValue === value;

  if (!selected && !forceMount) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${baseId}-${value}-panel`}
      aria-labelledby={`${baseId}-${value}-tab`}
      hidden={!selected}
      className={cn("od-tabs-panel", className)}
      {...semanticDataAttributes({
        tone,
        size,
        state: selected ? "active" : "default",
        density,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
