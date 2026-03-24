import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/** A label/value pair rendered in the header's metadata strip. */
export interface CommandHeaderMetaItem {
  label: string;
  value: string;
}

/** Props for the {@link CommandHeader} composition. */
export interface CommandHeaderProps {
  /** Optional badge node. */
  badge?: ReactNode;
  /** Mono-label above the title. */
  eyebrow?: string;
  /** Page heading. */
  title: string;
  /** Summary paragraph below the title. */
  description?: string;
  /** Action buttons slot. */
  actions?: ReactNode;
  /** Definition-list metadata below the title area. */
  metaItems?: CommandHeaderMetaItem[];
  className?: string;
}

/**
 * Top-of-page header with title, description, metadata strip and
 * action buttons. Commonly used as the hero of a dashboard view.
 *
 * @example
 * ```tsx
 * <CommandHeader eyebrow="MISSION" title="Phantom Resolve" />
 * ```
 */
export function CommandHeader({
  actions,
  badge,
  className,
  description,
  eyebrow,
  metaItems,
  title,
}: CommandHeaderProps) {
  return (
    <section className={cn("oh-command-header", className)}>
      <div className="oh-command-header__lead">
        <div className="oh-command-header__copy">
          {badge ? <div className="oh-command-header__badge">{badge}</div> : null}
          {eyebrow ? <p className="oh-command-header__eyebrow">{eyebrow}</p> : null}
          <h1 className="oh-command-header__title">{title}</h1>
          {description ? (
            <p className="oh-command-header__description">{description}</p>
          ) : null}
          {actions ? <div className="oh-command-header__actions">{actions}</div> : null}
        </div>
      </div>

      {metaItems?.length ? (
        <dl className="oh-command-header__meta">
          {metaItems.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="oh-command-header__meta-item"
            >
              <dt className="oh-command-header__meta-label">{item.label}</dt>
              <dd className="oh-command-header__meta-value">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
