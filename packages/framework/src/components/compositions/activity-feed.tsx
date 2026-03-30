import { useId } from "react";
import { cn } from "../../lib/cn";
import type { Density, Tone } from "../../lib/data-attrs";
import { Badge } from "../primitives/badge";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

/** A single event entry inside an {@link ActivityFeed}. */
export interface ActivityFeedItem {
  tone?: Tone;
  title: string;
  note: string;
  meta?: string;
}

/** Props for the {@link ActivityFeed} composition. */
export interface ActivityFeedProps {
  /** Mono-label above the heading. */
  eyebrow?: string;
  /** Panel heading. */
  title: string;
  /** Feed entries. */
  items: ActivityFeedItem[];
  /** Controls internal spacing rhythm. */
  density?: Density;
  className?: string;
}

/**
 * Chronological activity-feed panel.
 * Renders a list of toned events inside a {@link Panel} with
 * {@link Badge} indicators.
 *
 * @example
 * ```tsx
 * <ActivityFeed title="Recent" items={events} />
 * ```
 */
export function ActivityFeed({
  className,
  density = "default",
  eyebrow,
  items,
  title,
}: ActivityFeedProps) {
  const titleId = useId();

  return (
    <Panel
      tone="warning"
      density={density}
      className={cn("oh-activity-feed", className)}
      data-density={density}
      aria-labelledby={titleId}
    >
      <div className="oh-activity-feed__header">
        {eyebrow ? <p className="oh-activity-feed__eyebrow">{eyebrow}</p> : null}
        <h2 id={titleId} className="oh-activity-feed__title">{title}</h2>
      </div>
      <Divider tone="warning" />
      <div className="oh-activity-feed__items">
        {items.map((item) => (
          <article
            key={`${item.title}-${item.note}`}
            className="oh-activity-feed__item"
          >
            <div className="oh-activity-feed__item-head">
              <p className="oh-activity-feed__item-title">{item.title}</p>
              <Badge tone={item.tone ?? "muted"}>{item.tone ?? "muted"}</Badge>
            </div>
            <p className="oh-activity-feed__item-note">{item.note}</p>
            {item.meta ? (
              <p className="oh-activity-feed__item-meta">{item.meta}</p>
            ) : null}
          </article>
        ))}
      </div>
    </Panel>
  );
}
