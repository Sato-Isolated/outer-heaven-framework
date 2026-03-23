import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactElement,
  type Ref,
} from "react";
import { cn } from "./cn";

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

      (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

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

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
}

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
