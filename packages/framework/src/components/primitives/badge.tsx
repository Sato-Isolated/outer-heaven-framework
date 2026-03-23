import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    SemanticProps {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, density, size = "sm", state, tone, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn("od-badge", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});

