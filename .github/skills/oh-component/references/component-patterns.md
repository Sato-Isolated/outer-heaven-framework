# Component Patterns Reference

## File Locations

| Type | Component | CSS | Tests |
|------|-----------|-----|-------|
| Primitive | `packages/framework/src/components/primitives/{name}.tsx` | `packages/framework/src/styles/components/primitives/{name}.css` | `packages/framework/src/components/primitives/__tests__/{name}.test.tsx` |
| Composition | `packages/framework/src/components/compositions/{name}.tsx` | `packages/framework/src/styles/components/compositions.css` | same `__tests__/` folder alongside existing tests |

## Imports Every Component Needs

```tsx
import { type HTMLAttributes, forwardRef } from "react";
import {
  type SemanticProps,
  semanticDataAttributes,
} from "../../lib/data-attrs";
import { cn } from "../../lib/cn";
// Only if supporting asChild:
import { Slot } from "../../lib/slot";
```

## Semantic Props System

All components accept these optional props via `SemanticProps`:

```tsx
tone?: "primary" | "success" | "warning" | "danger" | "muted"   // default: "muted"
size?: "sm" | "md" | "lg"
state?: "default" | "active" | "open" | "loading" | "success" | "warning" | "error" | "disabled"
density?: "compact" | "default" | "roomy"                        // default: "default"
```

These are converted to `data-tone`, `data-size`, `data-state`, `data-density` attributes by `semanticDataAttributes()`.

CSS rules then target `[data-tone="primary"]`, `[data-size="sm"]`, etc.

## Primitive Pattern

```tsx
export interface MyComponentProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  // Component-specific props here
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, tone, size, state, density, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("od-my-component", className)}
        {...semanticDataAttributes({ tone, size, state, density })}
        {...props}
      />
    );
  }
);
MyComponent.displayName = "MyComponent";
```

## Composition Pattern

Compositions do **not** use `forwardRef` (they are layout wrappers). They assemble primitives.

```tsx
export interface MyLayoutProps {
  className?: string;
  items: MyLayoutItem[];
}

export function MyLayout({ className, items }: MyLayoutProps) {
  return (
    <section className={cn("oh-my-layout", className)}>
      {items.map((item, i) => (
        <Panel key={i} tone={item.tone ?? "muted"} density="compact">
          <p className="oh-my-layout__label">{item.label}</p>
          <p className="oh-my-layout__value">{item.value}</p>
        </Panel>
      ))}
    </section>
  );
}
```

## asChild / Slot Pattern

When a component should optionally render as a different element (e.g., button as `<a>`):

```tsx
interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, SemanticProps {
  asChild?: boolean;
}

const Component = forwardRef<HTMLButtonElement, Props>(
  ({ asChild, className, ...props }, ref) => {
    const Tag = asChild ? Slot : "button";
    return <Tag ref={ref} className={cn("od-component", className)} {...props} />;
  }
);
```

## State Resolution Pattern

```tsx
const resolvedState = disabled
  ? "disabled"
  : loading
    ? "loading"
    : state ?? "default";
```

## Tone Resolution Pattern (for error states)

```tsx
const resolvedTone = resolvedState === "error" ? (tone ?? "danger") : tone;
```

## CSS Class Naming

| Type | Pattern | Example |
|------|---------|---------|
| Primitive root | `.od-{name}` | `.od-button` |
| Primitive sub-element | `.od-{name}-{element}` | `.od-button-spinner` |
| Composition root | `.oh-{name}` | `.oh-stat-grid` |
| Composition part | `.oh-{name}__{part}` | `.oh-stat-grid__value` |

## CSS Patterns to Apply

### Surface containers

```css
.od-my-component {
  position: relative;
  border: 1px solid var(--od-tone-border);
  background: var(--od-surface-panel);
  box-shadow: var(--od-shadow-inset), var(--od-shadow-panel);
}
```

### Clipped corner (tactical signature)

```css
.od-my-component {
  clip-path: polygon(
    0 0,
    calc(100% - var(--od-panel-cut)) 0,
    100% var(--od-panel-cut),
    100% 100%,
    0 100%
  );
}
```

### Focus ring

```css
.od-my-component:focus-visible {
  outline: none;
  box-shadow: var(--od-focus-ring), var(--od-tone-glow);
  border-color: var(--od-border-accent);
}
```

### Inset shine pseudo-element

```css
.od-my-component::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.04), transparent 60%);
  pointer-events: none;
}
```

### Tone-driven styling

```css
.od-my-component[data-tone="primary"] {
  border-color: var(--od-tone-border);
  color: var(--od-tone-text);
}
```

### Size variants

```css
.od-my-component[data-size="sm"] { /* smaller geometry */ }
.od-my-component[data-size="lg"] { /* larger geometry */ }
```

### Density

```css
.od-my-component[data-density="compact"] { padding: var(--od-space-2); }
.od-my-component[data-density="roomy"]   { padding: var(--od-space-5); }
```

### Motion (respect reduced-motion)

```css
.od-my-component {
  transition: background var(--od-motion-fast) var(--od-motion-ease-standard),
              border-color var(--od-motion-fast) var(--od-motion-ease-standard);
}

@media (prefers-reduced-motion: reduce) {
  .od-my-component { transition: none; }
}
```

### Responsive breakpoints

```css
@media (max-width: 768px) {
  .od-my-component { /* tablet adjustments */ }
}
@media (max-width: 480px) {
  .od-my-component { /* mobile adjustments */ }
}
```

## Export Wiring

After creating the component:

1. **CSS import** — Add to `packages/framework/src/styles/components/primitives/index.css`:
   ```css
   @import "./{name}.css";
   ```

2. **Barrel export** — Add to `packages/framework/src/index.ts`:
   ```ts
   export { MyComponent, type MyComponentProps } from "./components/primitives/{name}";
   ```
