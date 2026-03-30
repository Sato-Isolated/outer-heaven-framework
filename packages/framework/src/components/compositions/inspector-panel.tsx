import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Density, Tone } from "../../lib/data-attrs";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

/** Props for the {@link InspectorPanel} composition. */
export interface InspectorPanelProps {
  /** Mono-label above the title. */
  eyebrow?: string;
  /** Panel heading. */
  title: string;
  /** Header icon slot. */
  icon?: ReactNode;
  /** Surface tone. */
  tone?: Tone;
  /** Panel body content. */
  children: ReactNode;
  /** Footer slot (below divider). */
  footer?: ReactNode;
  /** Controls internal spacing rhythm. */
  density?: Density;
  className?: string;
}

/**
 * Detail inspector side-panel with header, body and optional footer.
 * Wraps a {@link Panel} with structured chrome.
 *
 * @example
 * ```tsx
 * <InspectorPanel title="Target" tone="primary" icon={<Eye />}>
 *   <p>Data here…</p>
 * </InspectorPanel>
 * ```
 */
export function InspectorPanel({
  children,
  className,
  density = "default",
  eyebrow,
  footer,
  icon,
  title,
  tone = "muted",
}: InspectorPanelProps) {
  const titleId = useId();

  return (
    <Panel
      tone={tone}
      density={density}
      className={cn("oh-inspector-panel", className)}
      data-density={density}
      aria-labelledby={titleId}
    >
      <div className="oh-inspector-panel__header">
        <div>
          {eyebrow ? <p className="oh-inspector-panel__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId} className="oh-inspector-panel__title">{title}</h2>
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
