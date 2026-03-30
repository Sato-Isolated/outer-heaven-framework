# Outer Haven Framework — Workspace Instructions

> Tactical dark-ops React design system for command-center interfaces.

## Project Overview

Monorepo (pnpm workspaces) with two packages:

| Package | Path | Purpose |
|---------|------|---------|
| `@outerhaven/framework` | `packages/framework/` | Component library — 19 primitives, 7 compositions |
| `@outerhaven/demo` | `apps/demo/` | Next.js 15 showcase & visual validation |

**Stack:** React 19, Tailwind CSS 4.2, TypeScript (strict), Vitest, TSup, ESLint 9

## Commands

```sh
pnpm dev              # Start demo (Next.js + Turbopack)
pnpm build            # Build all packages
pnpm test             # Vitest run (jsdom)
pnpm lint             # ESLint
pnpm build:pages      # Static export for GitHub Pages
pnpm deploy:pages     # Build + force-push to gh-pages branch
```

Framework-only build: `pnpm --filter @outerhaven/framework build` (tsup → ESM + DTS)

## Architecture

### Component Taxonomy

| Type | Class prefix | Location | Pattern |
|------|-------------|----------|---------|
| **Primitive** | `.od-{name}` | `packages/framework/src/components/primitives/` | `forwardRef`, `SemanticProps`, single element |
| **Composition** | `.oh-{name}__{part}` | `packages/framework/src/components/compositions/` | Assembles primitives, no ref forwarding |

### Semantic Props System

All components extend `SemanticProps<TSize>` (generic) which provides:
- **tone**: `"primary" | "success" | "warning" | "danger" | "muted"`
- **size**: Full union `"xs" | "sm" | "md" | "lg" | "xl"` — narrowed per component via type aliases:
  - `StandardSize` = `"sm" | "md" | "lg"` (default)
  - `ButtonSize` / `FieldSize` / `VisualSize` = full `Size`
  - `BadgeSize` = `"xs" | "sm" | "md" | "lg"`
- **state**: `"default" | "active" | "open" | "loading" | "success" | "warning" | "error" | "disabled"`
- **density**: `"compact" | "default" | "roomy"`

Props are converted to `data-*` attributes via `semanticDataAttributes()` from `lib/data-attrs.ts`, enabling pure-CSS variant styling.

### Key Utilities

| Utility | Path | Purpose |
|---------|------|---------|
| `cn()` | `lib/cn.ts` | `clsx` + `twMerge` — merge class names without Tailwind conflicts |
| `semanticDataAttributes()` | `lib/data-attrs.ts` | Convert SemanticProps → `data-tone`, `data-size`, etc. |
| `Slot` | `lib/slot.tsx` | Radix-style polymorphic rendering for `asChild` pattern |

### CSS Architecture

```
styles/
├── foundation/        # reset.css, tokens.css (OKLCh), typography.css
├── themes/            # theme-tactical.css
├── components/
│   ├── primitives/    # Per-component files, _base.css shared surface treatment
│   └── compositions.css
└── utilities/         # effects.css, motion.css
```

**Token system** uses OKLCh color space. Dynamic tone variables (`--od-tone-border`, `--od-tone-bg`, `--od-tone-solid`, `--od-tone-text`, `--od-tone-glow`, `--od-tone-ink`) are set per `[data-tone]` selector.

### Token Categories

| Category | Prefix | Examples |
|----------|--------|----------|
| Color | `--od-color-*` | `--od-color-primary`, `--od-color-danger` |
| Surface | `--od-surface-*` | `--od-surface-base`, `--od-surface-elevated`, `--od-surface-panel`, `--od-surface-overlay` |
| Border | `--od-border-*` | `--od-border-subtle`, `--od-border-strong`, `--od-border-accent` |
| Spacing | `--od-space-{1-8}` | 4px–64px scale |
| Gap | `--od-gap-{1-7}` | Component-internal spacing (0.2rem–0.9rem) |
| Radius | `--od-radius-*` | `sm` (4px), `md` (8px), `lg` (14px), `xl` (20px), `2xl` (28px) |
| Font size | `--od-font-size-*` | 8-step scale: `3xs` through `xl` |
| Line width | `--od-line-width-*` | `thin` (1px), `medium` (1.5px), `thick` (2px) |
| Opacity | `--od-opacity-*` | `faint`, `placeholder`, `disabled`, `muted`, `soft` |
| Clip-path cuts | `--od-*-cut` | `--od-control-cut` (8px), `--od-panel-cut` (10px), `--od-shell-cut` (14px) — responsive |
| Gloss | `--od-gloss*` | `--od-gloss`, `--od-gloss-strong`, `--od-gloss-subtle`, `--od-gloss-shimmer` |
| Motion | `--od-motion-*` | `fast` (140ms), `base` (220ms), `slow` (420ms), `spinner` (800ms) |
| Z-index | `--od-z-*` | `dialog` (50), `toast` (60), `tooltip` (70), `transition` (9999) |
| Shadow | `--od-shadow-*` | `panel`, `inset`, `glow-{tone}`, `ring-{tone}`, `depth` |

## Conventions

### Component Authoring Rules

1. **Extend `SemanticProps`** and spread `semanticDataAttributes()` on the root element
2. **Use `forwardRef`** for all primitives
3. **Use `cn("od-{name}", className)`** for the root class
4. **Support `asChild`** via `Slot` when the component may render as a different element
5. **Resolve state automatically**: `disabled` → `"disabled"`, `loading` → `"loading"`
6. **Resolve tone from validation**: error/invalid state auto-maps to `"danger"` unless explicit tone
7. **Dev-mode a11y warnings** for interactive elements missing accessible names

### CSS Rules

1. **No raw color values** — always use `--od-*` or `--od-tone-*` tokens
2. **Tactical aesthetic**: `clip-path` for clipped corners, `box-shadow` for surface depth and glow
3. **Focus ring**: `box-shadow: var(--od-focus-ring), var(--od-tone-glow)`
4. **Motion tokens**: `var(--od-motion-fast)` (140ms), `var(--od-motion-base)` (220ms), `var(--od-motion-slow)` (420ms)
5. **Spacing tokens**: `var(--od-space-{1-8})` (4px–64px), `var(--od-gap-{1-7})` for component-internal gaps
6. **Font sizes**: use `var(--od-font-size-*)` scale — never hardcode `font-size` values
7. **Line widths**: use `var(--od-line-width-thin/medium/thick)` — never hardcode border widths
8. **Opacity**: use `var(--od-opacity-*)` tokens for disabled/muted/placeholder states
9. **Clip-path cuts**: use `var(--od-control-cut)`, `var(--od-panel-cut)`, `var(--od-shell-cut)` — they scale responsively
10. **Gloss gradients**: use `var(--od-gloss*)` tokens for surface shine effects
11. **Wrap animations** in `@media (prefers-reduced-motion: no-preference)` — each component also has granular reduced-motion overrides
12. **Responsive breakpoints**: 768px (mobile), 1280px (tablet) — cut tokens scale automatically at these breakpoints

### Export Wiring

When adding a component:
1. Add CSS `@import` to `packages/framework/src/styles/components/primitives/index.css` (primitives) or edit `compositions.css` (compositions)
2. Re-export from `packages/framework/src/index.ts`

### Testing

- Tests live in `packages/framework/src/components/primitives/__tests__/`
- Use `@testing-library/react` + Vitest globals
- Test contract: rendered classes, data-attributes, a11y attributes, keyboard interactions
- No visual regression — contract/behavior tests only
- Current count: 73 tests across 11 test files — run `pnpm test` to validate after changes

### Demo App

- Next.js 15 with Turbopack (`apps/demo/`)
- **Fonts**: IBM Plex Sans (400/500/600/700) + IBM Plex Mono (400/500/600), exposed as `--font-outerhaven-sans` / `--font-outerhaven-mono`
- **Page transitions**: `PageTransition` primitive with `TransitionProvider` context wrapping the app
- **Routes**: `/` (landing), `/components` (component deck), `/dashboard/*` (overview, comms, intel, operations, signals, upload)
- **Deployment**: `pnpm deploy:pages` — builds static export, force-pushes to `gh-pages` orphan branch. Requires GitHub Pages enabled on `gh-pages` branch in repo settings

### Field Components

Input, Select, and Textarea share an internal `FieldShell` wrapper and CSS variable-driven geometry. Prefer editing shared control variables over per-component overrides.
- Chrome mode (prefix/label/hint/message): wraps in `FieldShell`; no-chrome mode: bare native element
- Shared CSS lives in `styles/components/primitives/fields.css`
- `aria-invalid` set automatically when `invalid` prop is true

## Pitfalls

- **FieldShell coupling**: Input/Select/Textarea geometry is shared — changing one may affect others
- **Tone auto-resolution**: Components with `invalid`/error state auto-set `tone="danger"` — don't fight it
- **`aria-invalid` on radios**: Not supported by `jsx-a11y/role-supports-aria-props` — use `data-state="error"` + `data-tone="danger"` instead
- **Tailwind v4**: No `tailwind.config.js` — configuration is in CSS (`@theme`, `@import`)
- **pnpm strict**: Always use `pnpm` (not npm/yarn). Peer deps must be declared explicitly
- **ESLint flat config**: `eslint.config.mjs` uses `@eslint/eslintrc` FlatCompat with `next/core-web-vitals` + `next/typescript`
- **Icons**: `lucide-react` — use it over other icon libraries for consistency
- **`data-density="roomy"`**: Typed but not yet styled — only `compact` has CSS rules (v0.4.0 target)
- **Missing size variants**: `xs`/`xl` sizes are typed for some components but may not have CSS — check before using

## Versioning Status

- **v0.1.0** (Foundation): Complete — 16 original primitives, 7 compositions, tokens, demo, tests
- **v0.2.0** (Token Architecture & CSS Hardening): Complete — font-size/line-width/gap/opacity/gloss tokens, clip-path standardisation, responsive consistency
- **v0.3.0** (Accessibility & Motion Audit): Complete — per-component `prefers-reduced-motion`, ARIA gaps (aria-required, aria-describedby, focus traps), keyboard navigation
- **v0.4.0** (Variant Completion & Test Coverage): In progress — see `ROADMAP.md`

## Key References

- Component scaffolding skill: `.github/skills/oh-component/SKILL.md`
- Design tokens reference: `.github/skills/oh-component/references/design-tokens.md`
- Component patterns reference: `.github/skills/oh-component/references/component-patterns.md`
- Roadmap: `ROADMAP.md`
