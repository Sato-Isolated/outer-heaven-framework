import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
  type VisualSize,
} from "../../lib/data-attrs";

/** Props for the {@link Kbd} component. */
export interface KbdProps
  extends HTMLAttributes<HTMLElement>,
    SemanticProps<VisualSize> {}

/**
 * Keyboard shortcut indicator rendered as a `<kbd>` element.
 *
 * @example
 * ```tsx
 * <Kbd>G</Kbd>
 * <Kbd>D</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, density, size = "sm", state, tone, ...props },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cn("od-kbd", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});
