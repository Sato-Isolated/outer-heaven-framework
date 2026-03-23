import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/data-attrs";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

export interface InspectorPanelProps {
  eyebrow?: string;
  title: string;
  icon?: ReactNode;
  tone?: Tone;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function InspectorPanel({
  children,
  className,
  eyebrow,
  footer,
  icon,
  title,
  tone = "muted",
}: InspectorPanelProps) {
  return (
    <Panel tone={tone} className={cn("oh-inspector-panel", className)}>
      <div className="oh-inspector-panel__header">
        <div>
          {eyebrow ? <p className="oh-inspector-panel__eyebrow">{eyebrow}</p> : null}
          <h2 className="oh-inspector-panel__title">{title}</h2>
        </div>
        {icon ? <div className="oh-inspector-panel__icon oh-icon-slot">{icon}</div> : null}
      </div>
      <Divider tone={tone} />
      <div className="oh-inspector-panel__body">{children}</div>
      {footer ? (
        <>
          <Divider tone={tone} />
          <div className="oh-inspector-panel__footer">{footer}</div>
        </>
      ) : null}
    </Panel>
  );
}
