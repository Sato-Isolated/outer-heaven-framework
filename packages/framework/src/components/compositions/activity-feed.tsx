import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";
import { Badge } from "../primitives/badge";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

export interface ActivityFeedItem {
  tone?: Tone;
  title: string;
  note: string;
  meta?: string;
}

export interface ActivityFeedProps {
  eyebrow?: string;
  title: string;
  items: ActivityFeedItem[];
  className?: string;
}

export function ActivityFeed({
  className,
  eyebrow,
  items,
  title,
}: ActivityFeedProps) {
  return (
    <Panel tone="warning" className={cn("oh-activity-feed", className)}>
      <div className="oh-activity-feed__header">
        {eyebrow ? <p className="oh-activity-feed__eyebrow">{eyebrow}</p> : null}
        <h2 className="oh-activity-feed__title">{title}</h2>
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
