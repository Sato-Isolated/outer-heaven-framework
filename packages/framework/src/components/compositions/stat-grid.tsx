import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";
import { Panel } from "../primitives/panel";

/** A single metric card in a {@link StatGrid}. */
export interface StatGridItem {
  label: string;
  value: string;
  detail?: string;
  tone?: Tone;
  /** Leading icon slot. */
  icon?: ReactNode;
}

/** Props for the {@link StatGrid} composition. */
export interface StatGridProps {
  /** Metric cards to render. */
  items: StatGridItem[];
  className?: string;
}

/**
 * Responsive grid of metric cards, each rendered inside a compact
 * {@link Panel} with tone-based colouring.
 *
 * @example
 * ```tsx
 * <StatGrid items={[{ label: "Ops", value: "12" }]} />
 * ```
 */
export function StatGrid({ className, items }: StatGridProps) {
  return (
    <section className={cn("oh-stat-grid", className)}>
      {items.map((item) => (
        <Panel
          key={`${item.label}-${item.value}`}
          tone={item.tone ?? "muted"}
          density="compact"
          className="oh-stat-grid__item"
        >
          <div className="oh-stat-grid__head">
            <p className="oh-stat-grid__label">{item.label}</p>
            {item.icon ? (
              <div className="oh-stat-grid__icon oh-icon-slot">{item.icon}</div>
            ) : null}
          </div>
          <p className="oh-stat-grid__value">{item.value}</p>
          {item.detail ? <p className="oh-stat-grid__detail">{item.detail}</p> : null}
        </Panel>
      ))}
    </section>
  );
}
