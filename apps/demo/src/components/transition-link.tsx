"use client";

import Link from "next/link";
import { useTransitionToggle } from "./route-transition";
import { type ComponentProps, type MouseEvent, useCallback } from "react";

type LinkProps = ComponentProps<typeof Link>;

export interface TransitionLinkProps extends LinkProps {
  /** Set to `false` to skip the page transition on this navigation. Default `true`. */
  transition?: boolean;
}

export function TransitionLink({
  transition = true,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { skipNext } = useTransitionToggle();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!transition) {
        skipNext();
      }
      onClick?.(e);
    },
    [transition, skipNext, onClick],
  );

  return <Link {...rest} onClick={handleClick} />;
}
