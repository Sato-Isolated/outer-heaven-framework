import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface DropzoneProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(function Dropzone(
  { className, density, size, state, tone, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("od-dropzone", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    />
  );
});
