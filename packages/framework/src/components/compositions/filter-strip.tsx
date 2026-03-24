import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Divider } from "../primitives/divider";
import { Panel } from "../primitives/panel";

/** Props for the {@link FilterStrip} composition. */
export interface FilterStripProps {
  /** Mono-label above the title. */
  eyebrow?: string;
  /** Strip heading. */
  title?: string;
  /** Brief description below the title. */
  description?: string;
  /** Quick-filter shortcut buttons. */
  shortcuts?: ReactNode;
  /** Trailing action buttons. */
  actions?: ReactNode;
  /** Filter controls (inputs, selects, etc.). */
  children: ReactNode;
  className?: string;
}

/**
 * Compact filter bar combining a header, inline controls and action
 * buttons inside a {@link Panel}.
 *
 * @example
 * ```tsx
 * <FilterStrip title="Filters">
 *   <Input placeholder="Search…" />
 *   <Select options={regions} />
 * </FilterStrip>
 * ```
 */
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
