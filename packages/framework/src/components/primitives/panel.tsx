import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

/** Props for the {@link Panel} component. */
export interface PanelProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {}

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
  return (
    <section
      ref={ref}
      className={cn("od-panel", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});

