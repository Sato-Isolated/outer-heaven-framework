export type Tone = "primary" | "success" | "warning" | "danger" | "muted";
export type Size = "sm" | "md" | "lg";
export type State =
  | "default"
  | "active"
  | "open"
  | "loading"
  | "success"
  | "warning"
  | "error"
  | "disabled";
export type Density = "compact" | "default" | "roomy";

export interface SemanticProps {
  tone?: Tone;
  size?: Size;
  state?: State;
  density?: Density;
}

export function semanticDataAttributes({
  tone = "muted",
  size = "md",
  state = "default",
  density = "default",
}: SemanticProps) {
  return {
    "data-tone": tone,
    "data-size": size,
    "data-state": state,
    "data-density": density,
  };
}

