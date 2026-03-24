"use client";

import { Switch } from "@outerhaven/framework";
import { useTransitionToggle } from "./route-transition";

export function TransitionToggle() {
  const { enabled, toggle } = useTransitionToggle();

  return (
    <label className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted lg:flex cursor-pointer">
      <Switch checked={enabled} onCheckedChange={toggle} size="sm" tone="primary" />
      FX
    </label>
  );
}
