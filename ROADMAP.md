# Outer Haven Framework — Roadmap

## Product Vision

Outer Haven Framework is a tactical Tailwind-based design system for React and Next.js applications that need a command-center interface: dense, readable, and cohesive. Tailwind handles low-level layout and composition. The framework owns tokens, primitives, compositions, motion rules, accessibility conventions, and adoption documentation.

The monorepo serves three goals in parallel:

- Build a reusable, publishable package
- Validate that package visually through a credible demo application
- Document a clear adoption path so another team can use it without reverse-engineering

---

## v0.1.0 — Foundation (current)

> Establish the core design system with tokens, primitives, compositions, and a working demo.

### What's done

- **Design tokens**: OKLCh color system with 5 semantic tones (primary, success, warning, danger, muted), surface levels, border variants, shadow system, spacing scale, radius tokens, motion timing
- **Tactical theme**: Full CSS variable mapping from tokens to theme, including glow effects, clipped geometry, and tactical grid background
- **16 primitives**: Shell, Panel, Button, Input, Select, Textarea, Checkbox, Switch, Tabs, Tooltip, Badge, Dialog, Toast, Dropzone, Divider, Kbd
- **7 compositions**: CommandHero, CommandHeader, FilterStrip, StatGrid, ActivityFeed, MissionQueue, InspectorPanel
- **Motion system**: Canvas-based 3D page transitions (4000+ cubes), keyframe animations (rise, slide, fade, scan, pulse, sweep), `prefers-reduced-motion` support
- **Demo app**: Landing page, component deck, interactive dashboard — all consuming framework exports
- **Test coverage**: Public contract tests for primitives (CSS classes, data attributes, accessibility, keyboard navigation)
- **GitHub Pages**: Static export pipeline with automatic basePath handling

---

## v0.2.0 — Token Architecture & CSS Hardening

> Eliminate magic numbers, extend the token system, and make every visual value traceable to a design decision.

### New token categories

- [ ] `--od-font-size-*` tokens — currently 8+ hardcoded font sizes across components (`0.72rem`, `0.76rem`, `0.8rem`, `0.82rem`, `0.88rem`, `0.94rem`)
- [ ] `--od-line-width-*` tokens — replace magic `1px`, `1.5px`, `2px` values in borders and dividers
- [ ] `--od-gap-*` spacing tokens — replace ad-hoc gap values (`0.45rem`, `0.55rem`, `0.65rem`, `0.85rem`, `0.9rem`)
- [ ] `--od-opacity-*` tokens — replace hardcoded opacity values (`0.04`, `0.06`, `0.08`, `0.25`, etc.)
- [ ] `--od-blur-*` tokens — replace hardcoded `blur(14px)` in dialog backdrop and similar
- [ ] `--od-radius-xl` and `--od-radius-2xl` for larger rounded surfaces
- [ ] Audit `--od-color-foreground-strong` and `--od-color-foreground-soft` — defined but unused, remove or integrate
- [ ] Audit `--od-radius-xs` — defined (2px) but never referenced, remove or integrate

### Hardcoded color cleanup

- [ ] Replace all hardcoded `rgb(255 255 255 / ...)` overlay values with token references (40+ occurrences across button, fields, controls, overlays CSS)
- [ ] Replace hardcoded `rgb(236 94 82 / ...)` danger color in shadows with `--od-color-danger` references
- [ ] Replace hardcoded `rgb(244 181 72 / ...)` warning color in shadows with `--od-color-warning` references
- [ ] Consolidate the identical gradient pattern `linear-gradient(180deg, rgb(255 255 255 / 0.xx), transparent 45%)` used in 5+ places into a single utility or token

### Clip-path standardization

- [ ] Replace hardcoded `8px` in clip-path (button.css, fields.css, dropzone.css) with `--od-panel-cut` or `--od-shell-cut`
- [ ] Replace hardcoded `14px` in dialog clip-path with appropriate token
- [ ] Replace hardcoded `10px` in toast clip-path with appropriate token
- [ ] Ensure all clip-path values respond to breakpoints consistently

### Responsive consistency

- [ ] Standardize breakpoints — currently mixes `768px`/`769px` and `1279px`/`1280px`
- [ ] Align responsive scaling across form elements — Button (`3rem` to `2.85rem` to `2.75rem`), Input (`3rem` to `2.85rem` to `2.7rem`), Select use different scales
- [ ] Add responsive rules for Tooltip positioning (currently has no media queries)
- [ ] Add responsive rules for Checkbox/Switch density (currently minimal)

### CSS quality

- [ ] Button spinner animation (`800ms linear`) should use `--od-motion-base` and `--od-motion-ease-standard`
- [ ] Remove or replace `-webkit-overflow-scrolling: touch` in Tabs (deprecated WebKit property)
- [ ] Replace `gap: 5px` magic number in MobileNav with spacing token
- [ ] Replace `height: 2px` magic number in MobileNav with line-width token

---

## v0.3.0 — Accessibility & Motion Audit

> Bring every component to WCAG 2.1 AA compliance and ensure all animations respect user preferences at the component level.

### Component-level `prefers-reduced-motion`

The global blanket rule in `motion.css` disables ALL animations, but some transitions are UX-essential (focus rings, state changes). Each component needs granular control:

- [ ] Button — spinner animation should stop or show static indicator
- [ ] Switch — toggle transition should be instant, not animated
- [ ] Select — listbox open animation should be instant
- [ ] Toast — progress bar should still show but not animate; enter/exit should be instant
- [ ] Tooltip — fade-in should be instant
- [ ] MobileNav — slide transition should be instant or replaced with simple show/hide
- [ ] Refactor the global `prefers-reduced-motion` rule to only target non-essential decorative animations, not all transitions

### ARIA gaps

- [ ] **Input/Textarea**: Add `aria-required` support for required fields
- [ ] **Input/Textarea**: Bind `aria-describedby` to `hint` and `message` elements so screen readers announce validation feedback
- [ ] **Checkbox**: Add `aria-label` fallback when no children are provided
- [ ] **Button**: Strengthen `iconOnly` accessible name enforcement — consider throwing in development if no `aria-label`, `aria-labelledby`, or `title` is present
- [ ] **Badge**: Add `role="status"` for notification badges, keep presentational for decorative badges
- [ ] **Panel**: Add `aria-label` or `aria-labelledby` support for semantic sections
- [ ] **MobileNav**: Implement proper focus trap (currently focus management exists but is not trapped)
- [ ] **Tooltip**: Ensure tooltip content is announced via `aria-describedby` when the trigger is focused (verify portal-based rendering doesn't break the association)

### Keyboard navigation audit

- [ ] Verify Dialog focus trap with nested dialogs and dynamic content insertion
- [ ] Verify Select keyboard navigation: Home/End jump to first/last option, type-ahead search
- [ ] Verify Tabs arrow navigation wraps correctly at boundaries
- [ ] Test all keyboard paths with screen reader (NVDA/VoiceOver) to confirm announcements
- [ ] Document keyboard shortcuts for each interactive component

### Color contrast

- [ ] Validate contrast ratios for all 5 tones x 4 surface levels (base, elevated, panel, overlay)
- [ ] Verify warning and error states use text/border/icon indicators, never color alone
- [ ] Test all tone x state combinations in the component deck for visual clarity

---

## v0.4.0 — Variant Completion & Test Coverage

> Fill in every missing size, density, and state variant. Bring test coverage to 90%+.

### Missing size variants

- [ ] Button: add `xs` (micro-interactions) and `xl` (hero CTAs)
- [ ] Badge: add `lg` and `xs` variants
- [ ] Input/Select/Textarea: add `xs` variant for compact forms
- [ ] Align Textarea base height with Input/Select scaling logic

### Missing density variants

- [ ] Implement `data-density="roomy"` CSS rules — currently only `compact` has styles, `roomy` is typed but not styled
- [ ] Add density variants to all form primitives (Input, Select, Textarea, Checkbox, Switch)
- [ ] Add density variants to all compositions (CommandHeader, FilterStrip, StatGrid, etc.)
- [ ] Demonstrate density variants in the component deck

### Missing state coverage

- [ ] Verify all interactive primitives handle `disabled`, `loading`, and `error` states consistently
- [ ] Test all form primitives in both controlled and uncontrolled modes
- [ ] Ensure `Button` with `asChild` correctly forwards refs and merges all props
- [ ] Add visual disabled state cascade (disabled fieldset disabling all children)

### Untested components

- [ ] Add tests for `Badge` — tone rendering, size variants, content display
- [ ] Add tests for `Divider` — orientation, CSS class presence, semantic role
- [ ] Add tests for `Kbd` — rendering, styling, keyboard shortcut composition
- [ ] Add tests for `Panel` — tone propagation, density variants, data attributes
- [ ] Add tests for `Shell` — clipped geometry class, state attributes, glow behavior

### Test expansion for existing components

- [ ] Add size variant tests (`data-size="sm"`, `data-size="lg"`) across all components
- [ ] Add tone variant tests (all 5 tones) for every tone-supporting component
- [ ] Add density variant tests (`compact`, `default`, `roomy`) once CSS exists
- [ ] Add `prefers-reduced-motion` test variants for motion-sensitive components
- [ ] Add edge case tests: empty states, overflow content, very long strings, RTL text
- [ ] Add browser API tests: `document.body.overflow` for Dialog, portal mounting for Toast
- [ ] Target 90%+ line coverage on all exported components

---

## v0.5.0 — Composition Expansion

> Grow the composition library and add new primitives based on patterns validated in the demo.

### New primitives

- [ ] `RadioGroup` — grouped radio selection with tone and full keyboard support (arrow keys, Home/End)
- [ ] `Progress` — determinate and indeterminate progress indicator with tone mapping and `prefers-reduced-motion`
- [ ] `CommandMenu` — keyboard-first command palette with search, category filtering, action execution
- [ ] `EmptyState` — standardized zero-state surface with icon, title, description, and action slot

### Composition improvements

- [ ] `FilterStrip`: async filter options, loading states, clear-all action, filter count badge
- [ ] `StatGrid`: trend indicators (up/down arrows, percentage deltas), sparkline slot, click-to-drill-down
- [ ] `MissionQueue`: drag-to-reorder, bulk selection with checkbox column, pagination controls, empty state
- [ ] `ActivityFeed`: infinite scroll or "load more", grouping by date, expandable detail per entry, relative timestamps
- [ ] `InspectorPanel`: tabs within panel, resize handle, collapse/expand toggle, sticky header
- [ ] `CommandHeader`: breadcrumb slot, back navigation, responsive title truncation

### New compositions

- [ ] `DataTable` — dense, sortable, filterable table with column resizing, row selection, pagination, and keyboard navigation
- [ ] `FormSection` — grouped form fields with section heading, validation summary, section-level error display
- [ ] `SectionHeading` — reusable section header with eyebrow, title, description, and trailing action slot
- [ ] `Toolbar` — horizontal action bar with grouped buttons, separators, overflow menu
- [ ] `Sidebar` — collapsible navigation panel with sections, active state, and keyboard shortcuts

### Demo validation

- [ ] Build a new demo page that stress-tests every new primitive and composition
- [ ] Add at least 3 real-world layout patterns (admin panel, monitoring dashboard, form-heavy settings page)
- [ ] Verify all new components work inside Shell/Panel containers with all tone x density combinations

---

## v0.6.0 — Theming & Customization

> Make the design system adaptable beyond the default tactical dark theme.

### Multi-theme architecture

- [ ] Refactor `theme-tactical.css` to be one of multiple pluggable themes
- [ ] Define a theme contract: which CSS custom properties a theme MUST provide
- [ ] Create `theme-light.css` — light mode variant of the tactical theme
- [ ] Create `theme-neutral.css` — minimal, corporate-friendly preset for non-tactical use cases
- [ ] Implement theme switching via a `data-theme` attribute on a root element

### Dark/light mode

- [ ] Add `prefers-color-scheme` media query support as default behavior
- [ ] Implement a `ThemeProvider` React component for programmatic control
- [ ] Ensure all 5 tones have correct contrast ratios in both light and dark modes
- [ ] Update all glow effects and shadows for light backgrounds
- [ ] Test all compositions in light mode — verify readability and visual hierarchy

### Token extension API

- [ ] Document how consumers can override specific tokens without forking the stylesheet
- [ ] Support partial theme overrides (change primary tone without redefining everything)
- [ ] Add CSS layer ordering (`@layer base, tokens, theme, components, utilities`) for clean override precedence
- [ ] Test consumer token override in a fresh Next.js project

### Custom tone creation

- [ ] Document how to add a 6th semantic tone (e.g., `info`) by extending the token map
- [ ] Ensure the tone system is open for extension without modifying framework source
- [ ] Add a tone builder utility or recipe in documentation

---

## v0.7.0 — Documentation & Adoption

> Make the framework easy to adopt without reading source code.

### Getting started guide

- [ ] Write a step-by-step "Your first Outer Haven page" tutorial (from `pnpm add` to rendered page)
- [ ] Document the CSS import strategy and Tailwind integration requirements
- [ ] Explain the data-attribute contract with visual before/after examples
- [ ] Document tone, size, state, and density options with rendered previews
- [ ] Add a troubleshooting section (common issues: CSS import order, Tailwind config conflicts, SSR hydration)

### Component API reference

- [ ] Add prop tables for every primitive with types, defaults, and descriptions
- [ ] Add usage examples for each primitive showing 2-3 common patterns
- [ ] Document composition slot APIs with code examples and rendered output
- [ ] Add "when to use" guidance: composition vs. primitive, which tone for which context
- [ ] Document the `asChild` pattern and Slot component usage
- [ ] Document all exported TypeScript types and interfaces

### Component deck upgrade

- [ ] Turn the component deck into a proper interactive reference (not just a visual test)
- [ ] Add a prop playground for each primitive (toggle tones, sizes, states, density live)
- [ ] Add copy-to-clipboard for usage snippets
- [ ] Add search and filtering to the component deck
- [ ] Add all density variants to the deck (currently missing `roomy`)
- [ ] Add all state combinations (disabled, loading, error, warning) to the deck
- [ ] Add Divider, Kbd, and Shell demonstrations (currently absent from deck)
- [ ] Add Dialog and Toast interactive demos in the deck (currently only in dashboard)

### Design token reference

- [ ] Document the full token map: colors, surfaces, borders, shadows, radius, spacing, motion, opacity, blur, line-width, font-size, gap
- [ ] Explain how to extend or override tokens in a consumer project
- [ ] Add a visual token reference page to the demo with live swatches
- [ ] Document the OKLCh color space decision and how tones are constructed

### Migration and recipes

- [ ] Write a "Migrate from plain Tailwind dashboard" guide
- [ ] Write a "Build a monitoring dashboard" recipe using compositions
- [ ] Write a "Build a settings page" recipe using form primitives
- [ ] Write a "Build a landing page" recipe using CommandHero and StatGrid

---

## v0.8.0 — TypeScript & DX

> Tighten type safety, improve developer experience, and add build tooling.

### Type safety

- [ ] Export all component prop types from `index.ts` (currently missing: ButtonProps, InputProps, SelectProps, TextareaProps, DialogProps, ToastProps, TooltipProps, etc.)
- [ ] Add explicit return type annotations on all `forwardRef` callbacks
- [ ] Fix Select generic return type (currently `HTMLButtonElement` but renders portal div/listbox)
- [ ] Add JSDoc comments for all required props (especially Dialog `title`, Toast `push` API)
- [ ] Mark internal-only types as non-exported (Toast `closing`, `id` internal props)

### Build configuration

- [ ] Add explicit `tsup.config.ts` with ESM output, TypeScript declarations, CSS sideEffects
- [ ] Enable strict TypeScript in `packages/framework/tsconfig.json`: `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- [ ] Add explicit `vitest.config.ts` in the framework package
- [ ] Configure ESLint with explicit rules for the framework package

### Developer experience

- [ ] Add `pnpm typecheck` script for standalone type checking
- [ ] Add a `pnpm dev:framework` watch mode that rebuilds on file changes
- [ ] Add a pre-commit hook that runs `lint + typecheck + test`
- [ ] Set up CI pipeline (GitHub Actions): lint, typecheck, test, build on every PR
- [ ] Add bundle size tracking to CI (fail if bundle exceeds budget)

### Code quality

- [ ] Clean up unused keyframe animations: `od-emphasis-scan` and `od-status-pulse` are defined but never used — either integrate them or remove
- [ ] Remove or document all experimental/unused code paths
- [ ] Add consistent error boundaries for composition components

---

## v0.9.0 — Distribution Prep

> Prepare the package for public npm release.

### Package readiness

- [ ] Validate `tsup` build output: ESM bundle, TypeScript declarations, CSS sideEffects
- [ ] Test the package in a fresh Next.js 15 project (pnpm, npm, yarn)
- [ ] Test the package in a Vite + React project
- [ ] Test the package in a Remix project
- [ ] Verify tree-shaking: unused components should not appear in consumer bundles
- [ ] Confirm peer dependency ranges are correct (React 19, react-dom 19)
- [ ] Measure and document bundle size for the full package and per-component

### Semver policy

- [ ] Define what constitutes a breaking change: `od-*` class names, React prop signatures, data-attribute contracts, CSS custom properties, theme contract
- [ ] Document the stability commitment for each exported symbol
- [ ] Write a `BREAKING_CHANGES.md` template for future releases
- [ ] Define deprecation policy: how long deprecated APIs stay before removal

### Release infrastructure

- [ ] Set up automated changelog generation from conventional commits
- [ ] Configure npm publish workflow (manual trigger via GitHub Actions)
- [ ] Add package provenance metadata for supply chain security
- [ ] Create a release checklist (build, test, lint, typecheck, changelog, tag, publish)
- [ ] Set up npm package README (separate from monorepo README, focused on consumer usage)

### Consumer testing

- [ ] Build a minimal consumer app that imports every exported component
- [ ] Verify SSR compatibility (Next.js App Router, server components boundary)
- [ ] Test with strict CSP headers (no inline styles)
- [ ] Verify the single CSS import does not conflict with consumer Tailwind configs
- [ ] Test with `turbopack` and `webpack` bundlers
- [ ] Test with React strict mode enabled

---

## v1.0.0 — First Stable Release

> Public API freeze. Production-ready for external consumers.

### API freeze

- [ ] Lock the public API surface: all `od-*` classes, React props, data attributes, CSS custom properties
- [ ] Remove any deprecated or experimental exports
- [ ] Ensure all public types are exported from the package entry point
- [ ] Final review of component naming conventions
- [ ] Document the full public contract in a `PUBLIC_API.md` reference

### Production readiness

- [ ] Full accessibility audit (WCAG 2.1 AA compliance) with automated and manual testing
- [ ] Performance audit: bundle size budget, CSS specificity check, render performance, memory profiling
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge (latest 2 versions)
- [ ] Mobile testing: iOS Safari, Android Chrome, Samsung Internet
- [ ] 95%+ test coverage on all public APIs
- [ ] Load testing: verify compositions render efficiently with 100+ items (ActivityFeed, MissionQueue, DataTable)

### Security

- [ ] Audit for XSS vectors in components that render user-provided content
- [ ] Ensure no unsafe HTML injection patterns exist in any primitive or composition
- [ ] Verify CSP compatibility (no inline styles, no eval)
- [ ] Run `npm audit` and resolve all vulnerabilities in dependencies

### Launch

- [ ] Publish v1.0.0 to npm
- [ ] Write release announcement with feature highlights
- [ ] Write migration guide from 0.x to 1.0 (if any breaking changes occurred)
- [ ] Update README badges to reflect stable version
- [ ] Tag the release on GitHub with full changelog
- [ ] Deploy updated demo to GitHub Pages as the reference implementation

---

## Post-1.0 — Future Candidates

These are ideas under consideration, not commitments. Each must be validated by real demand before implementation.

### Theme ecosystem

- [ ] Animation preset system (enter/exit/emphasis profiles per theme)
- [ ] High-contrast theme for accessibility-first environments
- [ ] Theme preview tool in the component deck

### Design tooling

- [ ] Figma design kit synchronized with token values
- [ ] Figma plugin for token export/import
- [ ] Design token JSON export for cross-platform consumption (iOS, Android)

### Framework integrations

- [ ] Storybook integration as alternative documentation surface
- [ ] Chromatic visual regression testing integration
- [ ] Playwright component testing setup

### Internationalization

- [ ] RTL (right-to-left) layout support for all primitives and compositions
- [ ] Logical properties migration (`margin-inline-start` vs `margin-left`)
- [ ] Number formatting support in StatGrid and Badge

### Advanced components

- [ ] `DatePicker` — calendar-based date selection with range support
- [ ] `ColorPicker` — tone-aware color selection aligned with OKLCh system
- [ ] `Chart` — lightweight tactical chart primitives (sparkline, bar, gauge)
- [ ] `Timeline` — vertical/horizontal timeline for operational history
- [ ] `Kanban` — drag-and-drop board composition for workflow management

---

## Selection Criteria

Before adding any new primitive or composition:

- **Primitive**: the pattern must be cross-cutting, stable, and hard to express cleanly with existing building blocks
- **Composition**: multiple screens must already repeat the same layout arrangement
- **Both**: must work within the existing token system without requiring new token categories
- **Both**: must ship with tests, accessibility support, and a demo page entry
