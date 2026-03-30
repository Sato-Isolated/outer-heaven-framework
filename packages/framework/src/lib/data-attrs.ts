/** Visual tone applied via `data-tone`. Maps to CSS custom properties for contextual colours. */
export type Tone = "primary" | "success" | "warning" | "danger" | "muted";

/** Full low-level size token union applied via `data-size`. */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/** Default size contract used by components that keep the original ladder. */
export type StandardSize = "sm" | "md" | "lg";

/** Size contract for {@link Button}. */
export type ButtonSize = Size;

/** Size contract for {@link Badge}. */
export type BadgeSize = "xs" | "sm" | "md" | "lg";

/** Size contract shared by field primitives. */
export type FieldSize = Size;

/** Shared size contract for secondary visible components. */
export type VisualSize = Size;

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
export interface SemanticProps<TSize extends Size = never> {
  tone?: Tone;
  size?: TSize;
  state?: State;
  density?: Density;
}

/**
 * Convert {@link SemanticProps} into `data-*` HTML attributes ready to spread
 * on a DOM element. Enables pure-CSS variant styling via attribute selectors
 * such as `[data-tone="primary"]`.
 */
export function semanticDataAttributes<TSize extends Size = never>({
  tone = "muted",
  size,
  state = "default",
  density = "default",
}: SemanticProps<TSize>) {
  return {
    "data-tone": tone,
    ...(size ? { "data-size": size } : {}),
    "data-state": state,
    "data-density": density,
  };
}
