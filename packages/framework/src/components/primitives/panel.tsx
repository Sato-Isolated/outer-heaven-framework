import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type StandardSize,
} from "../../lib/data-attrs";

/** Props for the {@link Panel} component. */
export interface PanelProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps<StandardSize> {}

/**
 * Bordered surface container rendered as a `<section>`.
 * Provides the base "card" treatment with tone-driven border and glow.
 *
 * @example
 * ```tsx
 * <Panel tone="warning" density="compact">...</Panel>
 * ```
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { className, tone, size, state, density, ...props },
  ref,
) {
  const hasAccessibleName = Boolean(props["aria-label"] || props["aria-labelledby"]);
  const Tag = hasAccessibleName ? "section" : "div";

  return (
    <Tag
      ref={ref}
      className={cn("od-panel", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});
