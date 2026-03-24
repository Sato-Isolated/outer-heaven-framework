---
name: oh-component
description: "Scaffold new Outer Haven Framework components (primitives or compositions) that follow the project's tactical dark-ops design system. Use when: creating a new UI component, adding a variant, building a composition, or extending the framework component library."
argument-hint: "Describe the component to create (e.g. 'progress bar primitive with tone support')"
---

# Outer Haven Component Authoring

Create components that are visually and architecturally consistent with the Outer Haven Framework design system.

## When to Use

- Adding a new **primitive** (`od-*`) or **composition** (`oh-*`) to the framework
- Creating a one-off component in an app that must match the tactical theme
- Extending an existing component with new variants or features

## Decision: Primitive vs Composition

| Type | Prefix | Renders | Example |
|------|--------|---------|---------|
| **Primitive** | `.od-{name}` | Single semantic element + data-attrs | Button, Badge, Panel |
| **Composition** | `.oh-{name}__{part}` | Multiple primitives assembled together | StatGrid, CommandHero |

## Procedure

### 1. Determine Component Category

Ask yourself:
- Is it a **single interactive or display element**? → Primitive
- Does it **assemble multiple primitives** into a layout? → Composition

### 2. Create the TypeScript Component

Follow the reference patterns in [./references/component-patterns.md](./references/component-patterns.md).

**Primitives** go in `packages/framework/src/components/primitives/`.
**Compositions** go in `packages/framework/src/components/compositions/`.

Key rules:
1. **Always extend `SemanticProps`** — provides `tone`, `size`, `state`, `density`
2. **Use `forwardRef`** — all primitives must forward refs
3. **Spread `semanticDataAttributes()`** on the root element
4. **Use `cn()`** to merge `"od-{name}"` base class with user `className`
5. **Support `asChild` via `Slot`** when the component should render as a different element (links, etc.)
6. **Resolve state**: `disabled` → `"disabled"`, `loading` → `"loading"`, else prop or `"default"`
7. **Validate a11y in dev mode**: warn if interactive elements lack accessible names

### 3. Create the CSS

Follow token usage rules in [./references/design-tokens.md](./references/design-tokens.md).

**Primitives** get a dedicated file in `packages/framework/src/styles/components/primitives/`.
**Compositions** add rules to `packages/framework/src/styles/components/compositions.css`.

Key rules:
1. **Never use raw color values** — always reference `--od-*` tokens or `--od-tone-*` dynamic vars
2. **Use tone variables** for contextual styling: `var(--od-tone-border)`, `var(--od-tone-bg)`, `var(--od-tone-solid)`, `var(--od-tone-text)`, `var(--od-tone-glow)`
3. **Apply the tactical aesthetic**:
   - `clip-path: polygon(...)` for clipped corners
   - `box-shadow: var(--od-shadow-inset), var(--od-shadow-panel)` for surface depth
   - Focus ring: `box-shadow: var(--od-focus-ring), var(--od-tone-glow)`
   - Borders: `1px solid var(--od-tone-border)`
4. **Use spacing tokens**: `var(--od-space-1)` through `var(--od-space-8)`
5. **Use motion tokens**: `var(--od-motion-fast)`, `var(--od-motion-base)` with `var(--od-motion-ease-standard)`
6. **Respect reduced motion**: wrap animations in `@media (prefers-reduced-motion: no-preference)`
7. **Add responsive breakpoints** for mobile (480px), tablet (768px), desktop (1024px, 1280px)

### 4. Wire Up Exports

1. Add the CSS `@import` to the appropriate index file:
   - Primitives: `packages/framework/src/styles/components/primitives/index.css`
   - Compositions: already in `compositions.css`
2. Re-export the component from `packages/framework/src/index.ts`

### 5. Write Tests

Add tests in `packages/framework/src/components/primitives/__tests__/`.
Test pattern:
- Renders without crashing
- Applies tone data-attribute
- Applies custom className
- Supports `asChild` if applicable
- Keyboard/a11y behavior

### 6. Quality Checklist

- [ ] Component uses `SemanticProps` and `semanticDataAttributes()`
- [ ] CSS uses only `--od-*` / `--od-tone-*` tokens (no hardcoded colors)
- [ ] Clipped corners or tactical visual cue present
- [ ] Focus styles use `var(--od-focus-ring)`
- [ ] Responsive breakpoints included (at minimum 768px)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Component re-exported from `index.ts`
- [ ] Test file created and passing

## Component Template

Use [./assets/primitive-template.tsx](./assets/primitive-template.tsx) as a starting point for new primitives.
