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

/** Props for the {@link Tabs} container. */
export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue">,
    SemanticProps {
  /** Controlled active tab value. */
  value?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  /** Callback when the active tab changes. */
  onValueChange?: (value: string) => void;
}

/**
 * Tab container providing context to {@link TabsList}, {@link TabsTrigger}
 * and {@link TabsPanel}. Supports controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="ops">
 *   <TabsList>
 *     <TabsTrigger value="ops">Operations</TabsTrigger>
 *     <TabsTrigger value="intel">Intel</TabsTrigger>
 *   </TabsList>
 *   <TabsPanel value="ops">...</TabsPanel>
 *   <TabsPanel value="intel">...</TabsPanel>
 * </Tabs>
 * ```
 */
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

/** Horizontal tab-list wrapper with arrow-key roving focus. */
export function TabsList({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { density, setActiveValue, size, state, tone } = useTabsContext();

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const tablist = event.currentTarget;
    const triggers = Array.from(
      tablist.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
    );
    const current = triggers.indexOf(event.target as HTMLElement);

    if (current === -1) return;

    let next: number | undefined;

    switch (event.key) {
      case "ArrowRight":
        next = (current + 1) % triggers.length;
        break;
      case "ArrowLeft":
        next = (current - 1 + triggers.length) % triggers.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = triggers.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const tabValue = triggers[next].getAttribute("data-value");
    if (tabValue) setActiveValue(tabValue);
    triggers[next].focus();
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn("od-tabs-list", className)}
      onKeyDown={handleKeyDown}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    >
      {children}
    </div>
  );
}

/** Props for the {@link TabsTrigger} button. */
export interface TabsTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    SemanticProps {
  /** The value this trigger activates. */
  value: string;
}

/** Individual tab button inside {@link TabsList}. */
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
      data-value={value}
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

/** Props for the {@link TabsPanel} content area. */
export interface TabsPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  /** The value this panel corresponds to. */
  value: string;
  /** Keep the panel in the DOM even when inactive. */
  forceMount?: boolean;
}

/** Tab content panel — visible when its `value` matches the active tab. */
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
