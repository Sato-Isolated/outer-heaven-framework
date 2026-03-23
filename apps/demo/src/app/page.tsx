import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Orbit,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Badge, Divider, Dropzone, Kbd, Panel, Shell } from "@outerhaven/framework";

const capabilityRows = [
  {
    label: "Semantic Theme Map",
    detail: "Tailwind utilities resolve against tactical tokens instead of one-off color picks.",
  },
  {
    label: "Primitive Contract",
    detail: "Every surface is expressed through `od-*` classes and shared data attributes.",
  },
  {
    label: "Bounded Motion",
    detail: "Scan sweeps, progress cues, and overlays reduce automatically under reduced motion.",
  },
];

const supportColumns = [
  {
    title: "Command Surfaces",
    copy: "Shells and panels carry clipped geometry, controlled glow, and density variants without inline brand styling.",
    tone: "primary" as const,
  },
  {
    title: "Operational Inputs",
    copy: "Buttons, inputs, selects, badges, dividers, and keycaps share one tactical language from the same token map.",
    tone: "success" as const,
  },
  {
    title: "Overlay Signals",
    copy: "Dialog and toast states stay framed, readable, and useful instead of falling back to generic utility stacks.",
    tone: "warning" as const,
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-border/60">
        <div className="u-tactical-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgb(232_197_84_/_0.18),_transparent_56%)]" />
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-center lg:px-8 lg:py-20">
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="space-y-4">
              <Badge tone="warning">Outer Heaven Framework / Active Blueprint</Badge>
              <div className="space-y-5">
                <p className="u-mono-label text-primary">Command Interface Layer</p>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Tactical UI for systems that need discipline, not decoration.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted">
                  A reusable Tailwind framework that turns tokens, motion, and
                  primitive contracts into a command-center interface instead of
                  a generic dashboard skin.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="od-button"
                data-tone="primary"
                data-size="lg"
                data-state="default"
                data-density="default"
              >
                Enter Demo Deck
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#framework"
                className="od-button"
                data-tone="muted"
                data-size="lg"
                data-state="default"
                data-density="default"
              >
                View Primitive Contract
              </Link>
            </div>

            <Shell
              tone="primary"
              state="active"
              density="compact"
              className="grid gap-5 bg-transparent md:grid-cols-3"
            >
              <div className="space-y-2">
                <p className="u-mono-label text-primary">Framework Name</p>
                <p className="text-xl font-semibold text-foreground">Outer Heaven Framework</p>
              </div>
              <div className="space-y-2">
                <p className="u-mono-label text-primary">Public Layer</p>
                <p className="text-xl font-semibold text-foreground">`od-*` primitives</p>
              </div>
              <div className="space-y-2">
                <p className="u-mono-label text-primary">Tone Set</p>
                <p className="text-xl font-semibold text-foreground">
                  primary / success / warning / danger / muted
                </p>
              </div>
            </Shell>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-[40rem]">
              <div className="hero-radar absolute inset-[8%]">
                <div className="hero-radar-grid absolute inset-0 rounded-full" />
                <div className="hero-radar-sweep" />
                <div className="hero-dot left-[26%] top-[30%]" />
                <div className="hero-dot left-[62%] top-[52%]" />
                <div className="hero-dot left-[48%] top-[70%]" />
              </div>
              <Panel
                tone="primary"
                state="active"
                className="absolute right-0 top-12 w-[min(22rem,88%)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="u-mono-label text-primary">Mission Board</p>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">
                      Semantic control over every surface.
                    </h2>
                  </div>
                  <Orbit className="h-6 w-6 text-primary" />
                </div>
                <Divider />
                <div className="grid gap-4">
                  {capabilityRows.map((row) => (
                    <div key={row.label} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-foreground">{row.label}</p>
                        <span className="signal-bar w-16" />
                      </div>
                      <p className="text-sm leading-6 text-muted">{row.detail}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      <section id="framework" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <Shell density="roomy" className="u-scan-pass">
            <p className="u-mono-label text-primary">Implementation Shape</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">
              Foundation tokens and primitives stay reusable while the demo site
              proves the system in real screens.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              The framework package owns tokens, themes, utilities, motion, and
              wrapper components. The demo app only composes them into a landing
              page and an operational dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge tone="primary">pnpm monorepo</Badge>
              <Badge tone="success">Next.js 15</Badge>
              <Badge tone="warning">Tailwind CSS 4</Badge>
              <Badge tone="muted">React 19</Badge>
            </div>
          </Shell>

          <div className="grid gap-6 md:grid-cols-3">
            {supportColumns.map((column) => (
              <Panel key={column.title} tone={column.tone}>
                <div className="space-y-3">
                  <p className="u-mono-label" style={{ color: "var(--od-tone-text)" }}>
                    Tactical Track
                  </p>
                  <h3 className="text-xl font-semibold text-foreground">{column.title}</h3>
                  <p className="text-sm leading-6 text-muted">{column.copy}</p>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
        <Dropzone tone="primary" state="active" className="u-scan-pass">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center">
            <div className="space-y-4">
              <p className="u-mono-label text-primary">Dropzone Primitive</p>
              <h2 className="text-3xl font-semibold text-foreground">
                Upload surfaces inherit the same language as the rest of the system.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted">
                Idle, armed, upload, success, and error treatments all come from
                shared framework state instead of page-specific utility strings.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <ShieldCheck className="h-4 w-4 text-success" />
                Focus-visible states remain explicit
                <Divider orientation="vertical" />
                <Upload className="h-4 w-4 text-primary" />
                Reduced motion trims sweeps automatically
              </div>
            </div>
            <div className="space-y-4">
              <Panel tone="success" density="compact">
                <p className="u-mono-label text-success">Ready State</p>
                <p className="text-sm text-muted">
                  Secure payload staging aligned to the same token and border model.
                </p>
              </Panel>
              <div className="grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.2em] text-muted">
                <div className="border border-border/70 bg-background/60 px-3 py-3">Idle</div>
                <div className="border border-primary/40 bg-primary/10 px-3 py-3 text-primary">Armed</div>
                <div className="border border-success/40 bg-success/10 px-3 py-3 text-success">Confirm</div>
              </div>
            </div>
          </div>
        </Dropzone>

        <Shell tone="warning" density="compact">
          <p className="u-mono-label text-warning">Operator Notes</p>
          <div className="space-y-4 text-sm leading-6 text-muted">
            <p>Use semantic props and shared data attributes before adding any new visual hooks.</p>
            <p>Keep raw brand colors out of JSX and let the framework own surface identity.</p>
            <p className="flex items-center gap-2 text-foreground">
              Quick nav
              <Kbd>G</Kbd>
              <Kbd>L</Kbd>
            </p>
          </div>
        </Shell>
      </section>

      <section className="border-t border-border/60 bg-background/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="u-mono-label text-primary">Live Validation</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">
              Open the dashboard to inspect buttons, dialog, toast, filters, and
              status panels running on the same contract.
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="od-button"
            data-tone="primary"
            data-size="lg"
            data-state="default"
            data-density="default"
          >
            Launch Dashboard Demo
            <BadgeCheck className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
