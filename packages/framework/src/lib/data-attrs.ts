/** Visual tone applied via `data-tone`. Maps to CSS custom properties for contextual colours. */
export type Tone = "primary" | "success" | "warning" | "danger" | "muted";

/** Component size variant applied via `data-size`. */
export type Size = "sm" | "md" | "lg";

/** Component state applied via `data-state`. Drives visual feedback and interaction states. */
export type State =
  | "default"
  | "active"
  | "open"
  | "loading"
  | "success"
  | "warning"
  | "error"
  | "disabled";

/** Spacing density applied via `data-density`. Controls internal padding and gaps. */
export type Density = "compact" | "default" | "roomy";

/**
 * Shared semantic props extended by all framework components.
 * Converted to `data-*` attributes for pure-CSS variant styling.
 */
export interface SemanticProps {
  tone?: Tone;
  size?: Size;
  state?: State;
  density?: Density;
}

/**
 * Convert {@link SemanticProps} into `data-*` HTML attributes ready to spread
 * on a DOM element. Enables pure-CSS variant styling via attribute selectors
 * such as `[data-tone="primary"]`.
 */
export function semanticDataAttributes({
  tone = "muted",
  size,
  state = "default",
  density = "default",
}: SemanticProps) {
  return {
    "data-tone": tone,
    ...(size ? { "data-size": size } : {}),
    "data-state": state,
    "data-density": density,
  };
}

