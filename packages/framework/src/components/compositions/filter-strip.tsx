import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

export interface FilterStripProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  shortcuts?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FilterStrip({
  actions,
  children,
  className,
  description,
  eyebrow,
  shortcuts,
  title,
}: FilterStripProps) {
  return (
    <Panel density="compact" className={cn("oh-filter-strip", className)}>
      <div className="oh-filter-strip__header">
        <div className="oh-filter-strip__copy">
          {eyebrow ? <p className="oh-filter-strip__eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="oh-filter-strip__title">{title}</h2> : null}
          {description ? (
            <p className="oh-filter-strip__description">{description}</p>
          ) : null}
        </div>
        {shortcuts ? (
          <div className="oh-filter-strip__shortcuts">{shortcuts}</div>
        ) : null}
      </div>
      <Divider />
      <div className="oh-filter-strip__controls">{children}</div>
      {actions ? <div className="oh-filter-strip__actions">{actions}</div> : null}
    </Panel>
  );
}
