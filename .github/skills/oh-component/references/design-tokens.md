# Design Tokens Reference

Complete reference of Outer Haven CSS custom properties. **Always use these tokens — never hardcode values.**

## Colors (OKLCh)

| Token | Value | Usage |
|-------|-------|-------|
| `--od-color-primary` | `oklch(0.82 0.16 88)` | Gold/yellow accent |
| `--od-color-primary-foreground` | `oklch(0.18 0.015 95)` | Text on primary solid |
| `--od-color-success` | `oklch(0.76 0.14 154)` | Teal/green positive |
| `--od-color-success-foreground` | `oklch(0.18 0.02 155)` | Text on success solid |
| `--od-color-warning` | `oklch(0.78 0.16 69)` | Orange caution |
| `--od-color-warning-foreground` | `oklch(0.18 0.015 70)` | Text on warning solid |
| `--od-color-danger` | `oklch(0.67 0.19 28)` | Red critical |
| `--od-color-danger-foreground` | `oklch(0.97 0.01 28)` | Text on danger solid |
| `--od-color-muted` | `oklch(0.63 0.02 92)` | Neutral gray |
| `--od-color-foreground` | `oklch(0.94 0.01 96)` | Default text |
| `--od-color-foreground-strong` | `oklch(0.98 0.004 99)` | Emphasized text |
| `--od-color-foreground-soft` | `oklch(0.8 0.02 95)` | De-emphasized text |

## Surfaces

| Token | Value | Usage |
|-------|-------|-------|
| `--od-surface-base` | `oklch(0.17 0.009 95)` | Root/body background |
| `--od-surface-elevated` | `oklch(0.21 0.011 95)` | Inputs, elevated layer |
| `--od-surface-panel` | `oklch(0.25 0.013 95)` | Panels, cards |
| `--od-surface-overlay` | `color-mix(in srgb, black 74%, transparent)` | Modal overlays |
| `--od-surface-glass` | `color-mix(in oklab, var(--od-surface-panel) 78%, transparent)` | Glass effect |

## Borders

| Token | Usage |
|-------|-------|
| `--od-border-subtle` | Default low-contrast borders |
| `--od-border-strong` | Higher contrast separators |
| `--od-border-accent` | Focused/active accent border |

## Dynamic Tone Variables

**Set automatically by `data-tone` attribute on the element.** Use these inside component CSS:

| Token | Purpose |
|-------|---------|
| `--od-tone-text` | Text color for current tone |
| `--od-tone-border` | Border color for current tone |
| `--od-tone-bg` | Subtle background for current tone |
| `--od-tone-solid` | Fully saturated color |
| `--od-tone-ink` | Foreground text on solid backgrounds |
| `--od-tone-glow` | Shadow glow effect |

## Spacing (4px base)

| Token | Value |
|-------|-------|
| `--od-space-1` | `4px` |
| `--od-space-2` | `8px` |
| `--od-space-3` | `12px` |
| `--od-space-4` | `16px` |
| `--od-space-5` | `24px` |
| `--od-space-6` | `32px` |
| `--od-space-7` | `48px` |
| `--od-space-8` | `64px` |

## Radii

| Token | Value |
|-------|-------|
| `--od-radius-xs` | `2px` |
| `--od-radius-sm` | `4px` |
| `--od-radius-md` | `8px` |
| `--od-radius-lg` | `14px` |

## Shadows

| Token | Usage |
|-------|-------|
| `--od-shadow-panel` | Depth shadow for elevated surfaces |
| `--od-shadow-inset` | Subtle inset highlight (top edge) |
| `--od-shadow-glow-primary` | Primary glow ring |
| `--od-shadow-glow-success` | Success glow ring |
| `--od-shadow-glow-warning` | Warning glow ring |
| `--od-shadow-glow-danger` | Danger glow ring |

## Motion

| Token | Value | When |
|-------|-------|------|
| `--od-motion-fast` | `140ms` | Micro-interactions (hover, toggle) |
| `--od-motion-base` | `220ms` | Standard transitions |
| `--od-motion-slow` | `420ms` | Page/modal transitions |
| `--od-motion-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |
| `--od-motion-ease-emphasis` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Expressive/dramatic easing |

## Typography

| Token | Value |
|-------|-------|
| `--od-font-sans` | IBM Plex Sans (fallback: Segoe UI) |
| `--od-font-display` | IBM Plex Sans (display weight) |
| `--od-font-mono` | IBM Plex Mono (fallback: Consolas) |

## Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--od-grid-size` | `28px` (responsive) | Background grid pattern |
| `--od-shell-cut` | `14px` (responsive) | Shell clip-path corner |
| `--od-panel-cut` | `10px` (responsive) | Panel clip-path corner |
| `--od-focus-ring` | `0 0 0 2px color-mix(...)` | Focus outline shadow |
