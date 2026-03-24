# Outer Haven Framework — Workspace Instructions

> Tactical dark-ops React design system for command-center interfaces.

## Project Overview

Monorepo (pnpm workspaces) with two packages:

| Package | Path | Purpose |
|---------|------|---------|
| `@outerhaven/framework` | `packages/framework/` | Component library — 16 primitives, 7 compositions |
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

All components extend `SemanticProps` which provides:
- **tone**: `"primary" | "success" | "warning" | "danger" | "muted"`
- **size**: `"sm" | "md" | "lg"`
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
5. **Spacing tokens**: `var(--od-space-1)` through `var(--od-space-8)` (4px–64px scale)
6. **Wrap animations** in `@media (prefers-reduced-motion: no-preference)`
7. **Responsive breakpoints**: 768px (mobile), 1280px (tablet)

### Export Wiring

When adding a component:
1. Add CSS `@import` to `packages/framework/src/styles/components/primitives/index.css` (primitives) or edit `compositions.css` (compositions)
2. Re-export from `packages/framework/src/index.ts`

### Testing

- Tests live in `packages/framework/src/components/primitives/__tests__/`
- Use `@testing-library/react` + Vitest globals
- Test contract: rendered classes, data-attributes, a11y attributes, keyboard interactions
- No visual regression — contract/behavior tests only
- Current count: ~41 tests across 9 test files — run `pnpm test` to validate after changes

### Demo App

- Next.js 15 with Turbopack (`apps/demo/`)
- **Fonts**: IBM Plex Sans (400/500/600/700) + IBM Plex Mono (400/500/600), exposed as `--font-outerhaven-sans` / `--font-outerhaven-mono`
- **Page transitions**: `PageTransition` primitive with `TransitionProvider` context wrapping the app
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

## Key References

- Component scaffolding skill: `.github/skills/oh-component/SKILL.md`
- Design tokens reference: `.github/skills/oh-component/references/design-tokens.md`
- Component patterns reference: `.github/skills/oh-component/references/component-patterns.md`
- Roadmap: `ROADMAP.md`
