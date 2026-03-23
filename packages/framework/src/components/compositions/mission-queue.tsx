import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";
import { Badge } from "../primitives/badge";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

export interface MissionQueueItem {
  name: string;
  detail?: string;
  status: string;
  tone?: Tone;
  action?: ReactNode;
}

export interface MissionQueueProps {
  eyebrow?: string;
  title: string;
  badge?: ReactNode;
  items: MissionQueueItem[];
  className?: string;
}

export function MissionQueue({
  badge,
  className,
  eyebrow,
  items,
  title,
}: MissionQueueProps) {
  return (
    <Panel className={cn("oh-mission-queue", className)}>
      <div className="oh-mission-queue__header">
        <div>
          {eyebrow ? <p className="oh-mission-queue__eyebrow">{eyebrow}</p> : null}
          <h2 className="oh-mission-queue__title">{title}</h2>
        </div>
        {badge ? <div className="oh-mission-queue__badge">{badge}</div> : null}
      </div>
      <Divider />
      <div className="oh-mission-queue__items">
        {items.map((item) => (
          <article key={item.name} className="oh-mission-queue__item">
            <div className="oh-mission-queue__item-copy">
              <p className="oh-mission-queue__item-name">{item.name}</p>
              {item.detail ? (
                <p className="oh-mission-queue__item-detail">{item.detail}</p>
              ) : null}
            </div>
            <Badge tone={item.tone ?? "muted"}>{item.status}</Badge>
            {item.action ? (
              <div className="oh-mission-queue__item-action">{item.action}</div>
            ) : null}
          </article>
        ))}
      </div>
    </Panel>
  );
}
