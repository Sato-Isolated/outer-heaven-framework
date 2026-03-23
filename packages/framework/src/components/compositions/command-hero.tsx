import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Shell } from "../primitives/shell";

export interface CommandHeroMetaItem {
  label: string;
  value: string;
}

export interface CommandHeroRow {
  index: string;
  label: string;
  detail: string;
}

export interface CommandHeroReadout {
  value: string;
  label: string;
  detail: string;
}

export interface CommandHeroPanel {
  label: string;
  stamp?: string;
  headline: string;
  rows: CommandHeroRow[];
  readouts?: CommandHeroReadout[];
}

export interface CommandHeroProps {
  badge?: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  metaItems?: CommandHeroMetaItem[];
  panel: CommandHeroPanel;
  className?: string;
}

export function CommandHero({
  badge,
  className,
  description,
  eyebrow,
  metaItems,
  panel,
  primaryAction,
  secondaryAction,
  title,
}: CommandHeroProps) {
  return (
    <div className={cn("oh-command-hero", className)}>
      <div className="oh-command-hero__content">
        {badge ? <div className="oh-command-hero__badge">{badge}</div> : null}
        <div className="oh-command-hero__copy">
          <p className="u-mono-label text-primary">{eyebrow}</p>
          <h1 className="oh-command-hero__title">{title}</h1>
          <p className="oh-command-hero__description">{description}</p>
        </div>

        {primaryAction || secondaryAction ? (
          <div className="oh-command-hero__actions">
            {primaryAction}
            {secondaryAction}
          </div>
        ) : null}

        {metaItems?.length ? (
          <dl className="oh-command-hero__meta">
            {metaItems.map((item) => (
              <div key={`${item.label}-${item.value}`} className="oh-command-hero__meta-item">
                <dt className="oh-command-hero__meta-label">{item.label}</dt>
                <dd className="oh-command-hero__meta-value">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div className="oh-command-hero__visual">
        <Shell tone="primary" state="active" className="oh-command-hero__panel">
          <div className="oh-command-hero__panel-grid" aria-hidden="true" />
          <div className="oh-command-hero__panel-beam" aria-hidden="true" />

          <div className="oh-command-hero__panel-top">
            <p className="oh-command-hero__panel-label">{panel.label}</p>
            {panel.stamp ? (
              <p className="oh-command-hero__panel-stamp">{panel.stamp}</p>
            ) : null}
          </div>

          <div className="oh-command-hero__panel-body">
            <div className="oh-command-hero__panel-left">
              <p className="oh-command-hero__panel-kicker">Command Geometry</p>
              <h2 className="oh-command-hero__panel-headline">{panel.headline}</h2>
            </div>

            <div className="oh-command-hero__panel-right">
              <ol className="oh-command-hero__rows">
                {panel.rows.map((row, rowIdx) => (
                  <li key={rowIdx} className="oh-command-hero__row">
                    <div className="oh-command-hero__row-head">
                      <span className="oh-command-hero__row-index">{row.index}</span>
                      <p className="oh-command-hero__row-label">{row.label}</p>
                    </div>
                    <p className="oh-command-hero__row-detail">{row.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {panel.readouts?.length ? (
            <div className="oh-command-hero__panel-footer">
              {panel.readouts.map((item, index) => (
                <div key={index} className="oh-command-hero__readout">
                  <p className="oh-command-hero__readout-value">{item.value}</p>
                  <div className="oh-command-hero__readout-copy">
                    <p className="oh-command-hero__readout-label">{item.label}</p>
                    <p className="oh-command-hero__readout-detail">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Shell>
      </div>
    </div>
  );
}
