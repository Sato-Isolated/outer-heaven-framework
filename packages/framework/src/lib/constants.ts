/* ─── Page Transition Defaults ────────────────────────── */

export const DEFAULT_TRANSITION_COLS = 80;
export const DEFAULT_TRANSITION_ROWS = 50;
export const DEFAULT_TRANSITION_DURATION = 1800;
export const DEFAULT_TRANSITION_BASE_COLOR = "#262420";
export const DEFAULT_TRANSITION_OUTLINE_COLOR = "#4a4640";
export const DEFAULT_TRANSITION_HIGHLIGHT_COLOR = "#6a6250";
export const DEFAULT_SCATTER_RADIUS: [number, number] = [60, 240];

export const STAGGER_FACTOR = 0.7;
export const COLOR_SHADE_MULTIPLIERS = [1, 0.95, 0.88] as const;
export const ROT_X = { min: -90, range: 180, seedOffset: 2000 } as const;
export const ROT_Y = { min: -120, range: 240, seedOffset: 3000 } as const;
export const SCALE_RANGE = { min: 0.05, max: 0.1, seedOffset: 4000 } as const;

/* ─── Toast Defaults ──────────────────────────────────── */

export const DEFAULT_TOAST_DURATION = 4200;
export const TOAST_DISMISS_ANIMATION_MS = 180;

/* ─── Z-index ─────────────────────────────────────────── */

export const Z_INDEX_OVERLAY = 9999;
