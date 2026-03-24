"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";

/* ─── MobileNav ─────────────────────────────────────────── */

/** Props for the {@link MobileNav} component. */
export interface MobileNavProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is visible. */
  open: boolean;
  /** Callback when open state changes (e.g. Escape key or backdrop click). */
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

/**
 * Full-screen mobile navigation drawer rendered via a portal.
 * Locks body scroll, traps focus, and closes on Escape.
 *
 * @example
 * ```tsx
 * <MobileNavTrigger onClick={() => setOpen(true)} />
 * <MobileNav open={open} onOpenChange={setOpen}>
 *   <MobileNavLink href="/ops">Operations</MobileNavLink>
 * </MobileNav>
 * ```
 */
export const MobileNav = forwardRef<HTMLDivElement, MobileNavProps>(
  function MobileNav({ open, onOpenChange, children, className, ...props }, ref) {
    const panelRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const close = useCallback(() => onOpenChange(false), [onOpenChange]);

    /* close on Escape */
    useEffect(() => {
      if (!open) return;

      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, close]);

    /* lock body scroll */
    useEffect(() => {
      if (!open) return;

      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    /* focus first focusable element when opened */
    useEffect(() => {
      if (!open || !panelRef.current) return;

      const focusable = panelRef.current.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }, [open]);

    if (!mounted) return null;

    return createPortal(
      <div
        ref={ref}
        className={cn("od-mobile-nav", className)}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {/* backdrop */}
        <div
          className="od-mobile-nav__overlay"
          aria-hidden="true"
          onClick={close}
        />

        {/* panel */}
        <div
          ref={panelRef}
          className="od-mobile-nav__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <button
            type="button"
            className="od-mobile-nav__close"
            onClick={close}
            aria-label="Close navigation"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <nav className="od-mobile-nav__body">
            {children}
          </nav>
        </div>
      </div>,
      document.body,
    );
  },
);

/* ─── MobileNavTrigger ──────────────────────────────────── */

/** Props for the {@link MobileNavTrigger} hamburger button. */
export type MobileNavTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Three-bar hamburger button that opens a {@link MobileNav} drawer. */
export const MobileNavTrigger = forwardRef<
  HTMLButtonElement,
  MobileNavTriggerProps
>(function MobileNavTrigger({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("od-mobile-nav-trigger", className)}
      aria-label="Open navigation"
      {...props}
    >
      <span className="od-mobile-nav-trigger__bar" />
      <span className="od-mobile-nav-trigger__bar" />
      <span className="od-mobile-nav-trigger__bar" />
    </button>
  );
});

/* ─── MobileNavLink ─────────────────────────────────────── */

/** Props for the {@link MobileNavLink} anchor. */
export interface MobileNavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Highlight as the currently active route. */
  active?: boolean;
}

/** Styled anchor link for use inside a {@link MobileNav} drawer. */
export const MobileNavLink = forwardRef<HTMLAnchorElement, MobileNavLinkProps>(
  function MobileNavLink({ href, active, className, children, ...props }, ref) {
    return (
      <a
        ref={ref}
        href={href}
        className={cn("od-mobile-nav__link", active && "is-active", className)}
        {...props}
      >
        {children}
      </a>
    );
  },
);
