"use client";

import { usePathname } from "next/navigation";
import { PageTransition, type TransitionConfig } from "@outerhaven/framework";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ─── Context for transition toggle + config ───────────── */

const STORAGE_KEY = "od-page-transition";

interface TransitionCtx {
  /** Global on/off toggle */
  enabled: boolean;
  toggle: () => void;
  /** Visual config spread onto PageTransition */
  config: TransitionConfig;
  updateConfig: (partial: Partial<TransitionConfig>) => void;
  /** Call before a navigation to skip the next transition */
  skipNext: () => void;
  /** Route prefix patterns where intra-group navigations are skipped */
  excludePatterns: string[];
}

const TransitionContext = createContext<TransitionCtx>({
  enabled: true,
  toggle: () => {},
  config: {},
  updateConfig: () => {},
  skipNext: () => {},
  excludePatterns: [],
});

export function useTransitionToggle() {
  return useContext(TransitionContext);
}

/* ─── Provider (wraps everything that needs toggle access) ─ */

export interface TransitionProviderProps {
  children: ReactNode;
  /** Override default visual config (cols, rows, duration, colors…). */
  defaultConfig?: Partial<TransitionConfig>;
  /** Route prefixes where same-group navigations skip transition (e.g. ["/dashboard/"]). */
  excludePatterns?: string[];
}

export function TransitionProvider({
  children,
  defaultConfig,
  excludePatterns = [],
}: TransitionProviderProps) {
  const [enabled, setEnabled] = useState(true);
  const [config, setConfig] = useState<TransitionConfig>(defaultConfig ?? {});
  const skipRef = useRef(false);

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

  const updateConfig = useCallback((partial: Partial<TransitionConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const skipNext = useCallback(() => {
    skipRef.current = true;
  }, []);

  return (
    <TransitionContext.Provider
      value={{ enabled, toggle, config, updateConfig, skipNext, excludePatterns }}
    >
      {/* Expose skipRef internally via a second context to avoid re-renders */}
      <SkipRefContext.Provider value={skipRef}>
        {children}
      </SkipRefContext.Provider>
    </TransitionContext.Provider>
  );
}

/* ─── Internal ref context (avoids re-renders on skipNext) ─ */

const SkipRefContext = createContext<React.RefObject<boolean>>({ current: false });

export function useSkipRef() {
  return useContext(SkipRefContext);
}

/* ─── Transition wrapper (wraps page content only) ─────── */

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { enabled, config, excludePatterns } = useTransitionToggle();
  const skipRef = useContext(SkipRefContext);
  const prevPathRef = useRef(pathname);

  // Determine if this navigation should be skipped
  const shouldSkip = useCallback(
    (from: string, to: string) => {
      // 1. Explicit skip via skipNext()
      if (skipRef.current) {
        skipRef.current = false;
        return true;
      }
      // 2. Pattern-based: both paths share an excluded prefix
      for (const pattern of excludePatterns) {
        if (from.startsWith(pattern) && to.startsWith(pattern)) {
          return true;
        }
      }
      return false;
    },
    [excludePatterns, skipRef],
  );

  // Track whether this transition is enabled
  const [transitionEnabled, setTransitionEnabled] = useState(enabled);

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      const skip = shouldSkip(prevPathRef.current, pathname);
      setTransitionEnabled(enabled && !skip);
      prevPathRef.current = pathname;
    } else {
      setTransitionEnabled(enabled);
    }
  }, [pathname, enabled, shouldSkip]);

  return (
    <PageTransition pathname={pathname} enabled={transitionEnabled} {...config}>
      {children}
    </PageTransition>
  );
}
