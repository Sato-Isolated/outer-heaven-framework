import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Upload,
} from "lucide-react";
import {
  Badge,
  Button,
  CommandHero,
  Divider,
  Dropzone,
  Kbd,
  Panel,
  Shell,
} from "@outerhaven/framework";

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

const heroReadouts = [
  {
    value: "11",
    label: "Primitives",
    detail: "One contract across surfaces, inputs, overlays, and signals.",
  },
  {
    value: "5",
    label: "Semantic Tones",
    detail: "Primary, success, warning, danger, and muted map directly into Tailwind.",
  },
  {
    value: "1",
    label: "Stylesheet Entry",
    detail: "One import brings tokens, theme mapping, motion, and primitive contracts online.",
  },
];

const heroMetaItems = [
  {
    label: "Framework Name",
    value: "Outer Heaven Framework",
  },
  {
    label: "Public Layer",
    value: "`od-*` primitives",
  },
  {
    label: "Tone Set",
    value: "primary / success / warning / danger / muted",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-border/60">
        <div className="u-tactical-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgb(232_197_84_/_0.18),_transparent_56%)]" />
        <div className="mx-auto w-full px-4 py-16 sm:px-6 md:py-18 lg:min-h-[calc(100svh-5rem)] lg:px-8 lg:py-20 xl:px-[clamp(2rem,5vw,10rem)]">
          <CommandHero
            badge={<Badge tone="warning">Outer Heaven Framework / Active Blueprint</Badge>}
            eyebrow="Command Interface Layer"
            title="Tactical UI for systems that need discipline, not decoration."
            description="A reusable Tailwind framework that turns tokens, motion, and primitive contracts into a command-center interface instead of a generic dashboard skin."
            primaryAction={(
              <Button asChild tone="primary" size="lg">
                <Link href="/dashboard">
                  Enter Demo Deck
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            secondaryAction={(
              <Button asChild tone="muted" size="lg" ghost>
                <Link href="#framework">View Primitive Contract</Link>
              </Button>
            )}
            metaItems={heroMetaItems}
            panel={{
              label: "Tactical Display 01",
              stamp: "Live Contract",
              headline: "One visual language from shell to toast.",
              rows: capabilityRows.map((row, index) => ({
                index: `0${index + 1}`,
                label: row.label,
                detail: row.detail,
              })),
              readouts: heroReadouts,
            }}
          />
        </div>
      </section>

      <section id="framework" className="mx-auto w-full max-w-[80rem] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] xl:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="mx-auto grid w-full max-w-[80rem] gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
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
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="u-mono-label text-primary">Live Validation</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">
              Open the dashboard to inspect buttons, dialog, toast, filters, and
              status panels running on the same contract.
            </h2>
          </div>
          <Button asChild tone="primary" size="lg">
            <Link href="/dashboard">
              Launch Dashboard Demo
              <BadgeCheck className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
