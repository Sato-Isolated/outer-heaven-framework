import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
  type RefObject,
} from "react";
import { cn } from "./cn";

/** Compose multiple React refs into a single callback ref. */
function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) {
        continue;
      }

      if (typeof ref === "function") {
        ref(node);
        continue;
      }

      (ref as RefObject<T | null>).current = node;
    }
  };
}

/** Merge two event handlers — child handler runs first, then parent. */
function mergeEventHandlers(
  childHandler: unknown,
  parentHandler: unknown,
) {
  if (typeof childHandler !== "function") {
    return parentHandler;
  }

  if (typeof parentHandler !== "function") {
    return childHandler;
  }

  return (...args: unknown[]) => {
    childHandler(...args);
    parentHandler(...args);
  };
}

/** Props for the {@link Slot} component. Expects a single `ReactElement` child. */
export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
}

/**
 * Radix-style polymorphic Slot component for the `asChild` pattern.
 * Merges parent props (className, event handlers, refs) onto the single child
 * element, allowing components to render as a different element without wrapper divs.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, className, ...props },
  ref,
) {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    return null;
  }

  const childProps = child.props as Record<string, unknown>;
  const propsRecord = props as Record<string, unknown>;
  const mergedProps: Record<string, unknown> = {
    ...propsRecord,
    ...childProps,
    className: cn(childProps.className as string | undefined, className),
  };

  for (const key of Object.keys(propsRecord)) {
    if (!key.startsWith("on")) {
      continue;
    }

    mergedProps[key] = mergeEventHandlers(childProps[key], propsRecord[key]);
  }

  const childRef = (child as ReactElement & { ref?: Ref<HTMLElement> }).ref;

  if (childRef || ref) {
    mergedProps.ref = composeRefs(childRef, ref);
  }

  return cloneElement(child, mergedProps);
});
