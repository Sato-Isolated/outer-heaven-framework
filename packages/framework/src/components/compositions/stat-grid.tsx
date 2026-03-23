import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";
import { Panel } from "../primitives/panel";

export interface StatGridItem {
  label: string;
  value: string;
  detail?: string;
  tone?: Tone;
  icon?: ReactNode;
}

export interface StatGridProps {
  items: StatGridItem[];
  className?: string;
}

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
