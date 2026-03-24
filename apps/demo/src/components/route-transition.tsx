"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@outerhaven/framework";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ─── Context for transition toggle ────────────────────── */

const STORAGE_KEY = "od-page-transition";

interface TransitionCtx {
  enabled: boolean;
  toggle: () => void;
}

const TransitionContext = createContext<TransitionCtx>({
  enabled: true,
  toggle: () => {},
});

export function useTransitionToggle() {
  return useContext(TransitionContext);
}

/* ─── Provider (wraps everything that needs toggle access) ─ */

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  // Sync from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "false") setEnabled(false);
    } catch {
      // SSR or storage unavailable
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <TransitionContext.Provider value={{ enabled, toggle }}>
      {children}
    </TransitionContext.Provider>
  );
}

/* ─── Transition wrapper (wraps page content only) ─────── */

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { enabled } = useTransitionToggle();

  return (
    <PageTransition pathname={pathname} enabled={enabled}>
      {children}
    </PageTransition>
  );
}
