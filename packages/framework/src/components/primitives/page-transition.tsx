"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/* ─── Types ────────────────────────────────────────────── */

/** All visual customisation knobs for the transition effect. */
export interface TransitionConfig {
  /** Grid columns (default 80) */
  cols?: number;
  /** Grid rows (default 50) */
  rows?: number;
  /** Total animation duration per phase in ms (default 1800) */
  duration?: number;
  /** Cube fill colour (default "#262420") */
  baseColor?: string;
  /** Cube outline stroke colour (default "#4a4640") */
  outlineColor?: string;
  /** Edge highlight colour for 3D effect (default "#6a6250") */
  highlightColor?: string;
  /** [min, max] scatter distance in px (default [60, 240]) */
  scatterRadius?: [number, number];
  /** Custom easing function `(t: number) => number` (default easeEmphasis) */
  easing?: (t: number) => number;
}

export interface PageTransitionProps extends TransitionConfig {
  children: ReactNode;
  /** Current route pathname — drives the transition on change. */
  pathname: string;
  /** Set to false to disable the transition effect */
  enabled?: boolean;
  className?: string;
}

type Phase = "idle" | "exiting";

/* ─── Helpers ──────────────────────────────────────────── */

/** Seed-stable pseudo-random (visual only — no crypto needed). */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/** Emphasis easing: cubic-bezier(0.2, 0.8, 0.2, 1) approximated as a curve. */
export function easeEmphasis(t: number) {
  // Attempt to approximate the emphasis curve — fast start, gentle end
  const t2 = t * t;
  return t2 * t * -1.4 + t2 * 2.8 + t * 0.6 > 1
    ? 1
    : t2 * t * -1.4 + t2 * 2.8 + t * 0.6;
}

interface CubeData {
  col: number;
  row: number;
  delay: number;
  tx: number;
  ty: number;
  rx: number;
  ry: number;
  scale0: number; // random minimum scale at end
}

function buildCubeData(
  cols: number,
  rows: number,
  duration: number,
  scatterRadius: [number, number],
): CubeData[] {
  const total = cols * rows;
  const maxDist = Math.sqrt((cols - 1) ** 2 + (rows - 1) ** 2);
  const maxStagger = duration * 0.7;
  const cubes: CubeData[] = new Array(total);
  const [scatterMin, scatterMax] = scatterRadius;

  for (let i = 0; i < total; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const dist = Math.sqrt(col ** 2 + row ** 2);
    const delay = (dist / maxDist) * maxStagger;

    const rand = seededRandom(i);
    const angle = rand * Math.PI * 2;
    const radius = scatterMin + rand * (scatterMax - scatterMin);

    cubes[i] = {
      col,
      row,
      delay,
      tx: Math.cos(angle) * radius,
      ty: Math.sin(angle) * radius,
      rx: -90 + seededRandom(i + 2000) * 180,
      ry: -120 + seededRandom(i + 3000) * 240,
      scale0: 0.05 + seededRandom(i + 4000) * 0.1,
    };
  }

  return cubes;
}

/* ─── Component ────────────────────────────────────────── */

export function PageTransition({
  children,
  pathname,
  cols = 80,
  rows = 50,
  duration = 1800,
  enabled = true,
  baseColor = "#262420",
  outlineColor = "#4a4640",
  highlightColor = "#6a6250",
  scatterRadius = [60, 240],
  easing = easeEmphasis,
  className,
}: PageTransitionProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const prevPathRef = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const cubesRef = useRef<CubeData[]>([]);
  const startRef = useRef(0);

  // Stable refs for values used inside the animation loop
  const easingRef = useRef(easing);
  const baseColorRef = useRef(baseColor);
  const outlineColorRef = useRef(outlineColor);
  const highlightColorRef = useRef(highlightColor);
  useEffect(() => {
    easingRef.current = easing;
    baseColorRef.current = baseColor;
    outlineColorRef.current = outlineColor;
    highlightColorRef.current = highlightColor;
  }, [easing, baseColor, outlineColor, highlightColor]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  // Build cube data once (reacts to grid / scatter changes)
  useEffect(() => {
    cubesRef.current = buildCubeData(cols, rows, duration, scatterRadius);
  }, [cols, rows, duration, scatterRadius]);

  // Canvas animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const easeFn = easingRef.current;
    const baseFill = baseColorRef.current;
    const outlineStroke = outlineColorRef.current;
    const highlight = highlightColorRef.current;

    const now = performance.now();
    const elapsed = now - startRef.current;
    const w = canvas.width;
    const h = canvas.height;
    const cellW = w / cols;
    const cellH = h / rows;
    const cubes = cubesRef.current;
    const totalTime = duration + duration * 0.7;

    ctx.clearRect(0, 0, w, h);

    let anyActive = false;

    for (let i = 0, len = cubes.length; i < len; i++) {
      const cube = cubes[i];
      const localTime = elapsed - cube.delay;

      if (localTime < 0) {
        // Not started yet — draw solid
        ctx.globalAlpha = 1;
        ctx.fillStyle = baseFill;
        ctx.fillRect(cube.col * cellW, cube.row * cellH, cellW - 0.5, cellH - 0.5);
        // Subtle outline
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = outlineStroke;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(cube.col * cellW, cube.row * cellH, cellW - 0.5, cellH - 0.5);
        anyActive = true;
        continue;
      }

      const progress = Math.min(localTime / duration, 1);
      if (progress >= 1) continue; // fully scattered — skip

      anyActive = true;
      const ease = easeFn(progress);

      const opacity = 1 - ease;
      const scale = 1 - ease * (1 - cube.scale0);
      const offsetX = cube.tx * ease;
      const offsetY = cube.ty * ease;

      const cx = cube.col * cellW + cellW / 2 + offsetX;
      const cy = cube.row * cellH + cellH / 2 + offsetY;
      const sw = cellW * scale;
      const sh = cellH * scale;

      ctx.globalAlpha = opacity;

      // Simulate 3D rotation darkening
      const rotFactor = 1 - Math.abs(Math.sin(ease * cube.rx * 0.02)) * 0.4;
      const shade = Math.round(38 * rotFactor);
      ctx.fillStyle = `rgb(${shade} ${Math.round(shade * 0.95)} ${Math.round(shade * 0.88)})`;
      ctx.fillRect(cx - sw / 2, cy - sh / 2, sw, sh);

      // Edge highlight for 3D feel
      if (scale > 0.3) {
        ctx.globalAlpha = opacity * 0.25;
        ctx.strokeStyle = highlight;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(cx - sw / 2, cy - sh / 2, sw, sh);
      }
    }

    ctx.globalAlpha = 1;

    if (anyActive && elapsed < totalTime) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [cols, rows, duration]);

  // Resize canvas to match screen
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2 for perf
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    if (!enabled) return;

    clearTimer();
    setPhase("exiting");
    startRef.current = performance.now();

    // Start animation on next frame
    requestAnimationFrame(() => {
      setupCanvas();
      rafRef.current = requestAnimationFrame(animate);
    });

    timerRef.current = setTimeout(() => {
      setPhase("idle");
    }, duration + duration * 0.7);

    return clearTimer;
  }, [pathname, enabled, duration, clearTimer, animate, setupCanvas]);

  return (
    <div className={cn("od-page-transition", className)}>
      {children}

      {phase === "exiting" && (
        <canvas
          ref={canvasRef}
          className="od-page-transition__canvas"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
