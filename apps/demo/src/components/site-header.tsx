import Link from "next/link";
import { Badge, Button, Kbd } from "@outerhaven/framework";
import { TransitionToggle } from "./transition-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-primary/40 bg-primary/10 text-primary shadow-[0_0_30px_rgb(232_197_84_/_0.08)]">
            OH
          </div>
          <div className="space-y-1">
            <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-foreground">
              OUTER HEAVEN
            </Link>
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              Framework Control Layer
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="/" className="transition-colors hover:text-foreground">
            Overview
          </Link>
          <Link href="/components" className="transition-colors hover:text-foreground">
            Components
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Demo Dashboard
          </Link>
          <Badge tone="warning">V1 Tactical Theme</Badge>
        </nav>

        <div className="flex items-center gap-3">
          <TransitionToggle />
          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted lg:flex">
            Jump
            <Kbd>G</Kbd>
            <Kbd>D</Kbd>
          </div>
          <Button asChild tone="primary" size="sm">
            <Link href="/dashboard">Open Command Deck</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
