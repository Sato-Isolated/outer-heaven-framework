"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Badge,
  Button,
  Kbd,
  MobileNav,
  MobileNavLink,
  MobileNavTrigger,
} from "@outerhaven/framework";
import { TransitionToggle } from "./transition-toggle";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/components", label: "Components" },
  { href: "/dashboard", label: "Demo Dashboard" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 items-center justify-center border border-primary/40 bg-primary/10 text-xs text-primary shadow-[0_0_30px_rgb(232_197_84_/_0.08)] sm:h-12 sm:w-12 sm:text-base">
            OH
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-foreground sm:text-lg">
              OUTER HEAVEN
            </Link>
            <p className="hidden text-xs uppercase tracking-[0.28em] text-muted sm:block">
              Framework Control Layer
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground ${pathname === link.href ? "text-foreground" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Badge tone="warning">Tactical Theme</Badge>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <TransitionToggle />
          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted lg:flex">
            Jump
            <Kbd>G</Kbd>
            <Kbd>D</Kbd>
          </div>
          <Button asChild tone="primary" size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">Open Command Deck</Link>
          </Button>

          {/* Mobile hamburger */}
          <MobileNavTrigger
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      {/* Mobile slide-in nav */}
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen}>
        {navLinks.map((link) => (
          <MobileNavLink
            key={link.href}
            href={link.href}
            active={pathname === link.href}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </MobileNavLink>
        ))}
        <div className="mt-4 px-4">
          <Badge tone="warning">Tactical Theme</Badge>
        </div>
        <div className="mt-auto px-4 pb-4 pt-6">
          <Button asChild tone="primary" size="sm" className="w-full justify-center">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              Open Command Deck
            </Link>
          </Button>
        </div>
      </MobileNav>
    </header>
  );
}
