import Link from "next/link";
import { Divider, Kbd } from "@outerhaven/framework";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">
              Outer Heaven Framework
            </p>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Built as a semantic `od-*` layer over Tailwind so layout stays fast
              while tactical identity, motion, and accessibility stay consistent.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>Operate</span>
            <Kbd>Shift</Kbd>
            <Kbd>Tab</Kbd>
            <span>through every control</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>Single tactical theme. Shared primitives. Reduced-motion aware by default.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-colors hover:text-foreground">
              Landing
            </Link>
            <Link href="/components" className="transition-colors hover:text-foreground">
              Components
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
