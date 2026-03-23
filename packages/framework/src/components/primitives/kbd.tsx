import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface KbdProps
  extends HTMLAttributes<HTMLElement>,
    SemanticProps {}

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

