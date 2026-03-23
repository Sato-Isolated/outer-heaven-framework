"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  FileStack,
  Filter,
  Radar,
  Shield,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  Divider,
  Dropzone,
  Input,
  Kbd,
  Panel,
  Select,
  Shell,
  toneToast,
  useToast,
} from "@outerhaven/framework";

const kpis = [
  { label: "Queued payloads", value: "18", detail: "4 awaiting uplink", tone: "primary" as const },
  { label: "Healthy relays", value: "99.98%", detail: "Across 6 sectors", tone: "success" as const },
  { label: "Warnings", value: "03", detail: "Two require approval", tone: "warning" as const },
  { label: "Compromised", value: "01", detail: "Sandboxed node", tone: "danger" as const },
];

const missionRows = [
  {
    name: "Archive-17.tar",
    status: "Encrypted",
    owner: "NEST-04",
    sector: "north",
    tone: "success" as const,
  },
  {
    name: "sensor-grid.csv",
    status: "Awaiting scan",
    owner: "FIELD-12",
    sector: "south",
    tone: "warning" as const,
  },
  {
    name: "support-log.bin",
    status: "Queued",
    owner: "OPS-21",
    sector: "ghost",
    tone: "primary" as const,
  },
  {
    name: "uplink-trace.mov",
    status: "Inspection",
    owner: "RAVEN-02",
    sector: "north",
    tone: "muted" as const,
  },
];

const eventFeed = [
  { tone: "success" as const, title: "Relay sync complete", note: "Northern edge cache flushed 18 seconds ago." },
  { tone: "warning" as const, title: "Retention window near expiry", note: "Archive-17.tar drops below threshold at 02:40 UTC." },
  { tone: "danger" as const, title: "Manual review requested", note: "One payload exceeded the default signature envelope." },
];

type UploadState = "default" | "active" | "loading" | "success" | "error";

export function DashboardShowcase() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("active");
  const { push } = useToast();

  const filteredRows = useMemo(() => {
    return missionRows.filter((row) => {
      const matchesSearch = `${row.name} ${row.owner}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSector = sector === "all" || row.sector === sector;

      return matchesSearch && matchesSector;
    });
  }, [search, sector]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <Shell tone="primary" state="active" className="overflow-hidden">
        <div className="u-tactical-grid absolute inset-0 opacity-20" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-end">
          <div className="space-y-5">
            <Badge tone="primary">Command Dashboard / Demo</Badge>
            <div className="space-y-3">
              <p className="u-mono-label text-primary">Operational Workspace</p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Validate the framework against a dense, tactical working surface.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted">
                This page uses the same package exports as the landing page, but
                shifts the tone toward operating, filtering, and deciding.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Link
              href="/"
              className="od-button"
              data-tone="muted"
              data-size="sm"
              data-state="default"
              data-density="default"
            >
              Return to Overview
            </Link>
            <Button
              tone="warning"
              size="sm"
              onClick={() => setDialogOpen(true)}
            >
              Authorize Uplink
            </Button>
            <Button
              tone="success"
              size="sm"
              onClick={() =>
                push(
                  toneToast(
                    "success",
                    "Signal routed",
                    "Demo toast confirms the `od-toast` primitive and provider path.",
                  ),
                )
              }
            >
              Trigger Toast
            </Button>
          </div>
        </div>
      </Shell>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <Panel key={item.label} tone={item.tone} density="compact">
            <div className="flex items-center justify-between">
              <p className="u-mono-label" style={{ color: "var(--od-tone-text)" }}>
                {item.label}
              </p>
              <ArrowUpRight className="h-4 w-4" style={{ color: "var(--od-tone-text)" }} />
            </div>
            <p className="text-4xl font-semibold text-foreground">{item.value}</p>
            <p className="text-sm text-muted">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel density="compact" className="gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="u-mono-label text-primary">Filter Strip</p>
            <p className="mt-2 text-sm text-muted">
              Inputs, selects, badges, and command buttons share the same tactical base.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
            Quick scope
            <Kbd>F</Kbd>
            <Kbd>R</Kbd>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_220px_auto_auto]">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search payload or owner"
            aria-label="Search payloads"
          />
          <Select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            aria-label="Filter sector"
          >
            <option value="all">All sectors</option>
            <option value="north">North relay</option>
            <option value="south">South relay</option>
            <option value="ghost">Ghost channel</option>
          </Select>
          <Button tone="primary">
            <Filter className="h-4 w-4" />
            Apply
          </Button>
          <Button variant="ghost" tone="muted">
            <SlidersHorizontal className="h-4 w-4" />
            Presets
          </Button>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px]">
        <div className="grid gap-6">
          <Panel className="gap-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="u-mono-label text-primary">Active Queue</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">
                  Current payloads
                </h2>
              </div>
              <Badge tone="primary">{filteredRows.length} surfaced</Badge>
            </div>
            <Divider />
            <div className="grid gap-4">
              {filteredRows.map((row) => (
                <div
                  key={row.name}
                  className="grid gap-3 border border-border/70 bg-background/35 px-4 py-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center"
                >
                  <div className="space-y-1">
                    <p className="text-base font-medium text-foreground">{row.name}</p>
                    <p className="text-sm text-muted">Owner {row.owner}</p>
                  </div>
                  <Badge tone={row.tone}>{row.status}</Badge>
                  <Button tone="muted" variant="ghost" size="sm">
                    Inspect
                  </Button>
                </div>
              ))}
            </div>
          </Panel>

          <Dropzone tone="primary" state={uploadState} className="u-scan-pass">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="space-y-4">
                <p className="u-mono-label text-primary">Dropzone Simulator</p>
                <h2 className="text-2xl font-semibold text-foreground">
                  Toggle real primitive states without changing the underlying styles.
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted">
                  Use the controls to switch between idle, active, upload, and
                  success treatments. The visual contract lives in the framework,
                  not in this page.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" tone="muted" variant="ghost" onClick={() => setUploadState("default")}>
                    Idle
                  </Button>
                  <Button size="sm" tone="primary" onClick={() => setUploadState("active")}>
                    Armed
                  </Button>
                  <Button size="sm" tone="warning" onClick={() => setUploadState("loading")}>
                    Uploading
                  </Button>
                  <Button size="sm" tone="success" onClick={() => setUploadState("success")}>
                    Success
                  </Button>
                  <Button size="sm" tone="danger" onClick={() => setUploadState("error")}>
                    Error
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <Upload className="h-5 w-5 text-primary" />
                  <span>Payload intake channel</span>
                </div>
                <div className="grid gap-2 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Reduced-motion friendly progress sweep
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Bordered overlay surface remains readable
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleAlert className="h-4 w-4 text-warning" />
                    Same tone system as badges, buttons, and toasts
                  </div>
                </div>
              </div>
            </div>
          </Dropzone>
        </div>

        <div className="grid gap-6">
          <Panel tone="warning">
            <div className="flex items-center justify-between">
              <div>
                <p className="u-mono-label text-warning">Signal Feed</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Live operator notes
                </h2>
              </div>
              <Radar className="h-5 w-5 text-warning" />
            </div>
            <Divider tone="warning" />
            <div className="grid gap-4">
              {eventFeed.map((event) => (
                <div key={event.title} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <Badge tone={event.tone}>{event.tone}</Badge>
                  </div>
                  <p className="text-sm leading-6 text-muted">{event.note}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel tone="muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="u-mono-label text-primary">Operator Toolkit</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Keyboard-first details
                </h2>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <Divider />
            <div className="grid gap-3 text-sm text-muted">
              <div className="flex items-center justify-between gap-4">
                <span>Search queue</span>
                <div className="flex items-center gap-2">
                  <Kbd>/</Kbd>
                  <Kbd>Enter</Kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Open filter presets</span>
                <div className="flex items-center gap-2">
                  <Kbd>Shift</Kbd>
                  <Kbd>P</Kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Route approval</span>
                <div className="flex items-center gap-2">
                  <Kbd>Ctrl</Kbd>
                  <Kbd>U</Kbd>
                </div>
              </div>
            </div>
          </Panel>

          <Panel tone="success">
            <div className="flex items-center justify-between">
              <div>
                <p className="u-mono-label text-success">Integrity Snapshot</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Clean primitive usage
                </h2>
              </div>
              <FileStack className="h-5 w-5 text-success" />
            </div>
            <Divider tone="success" />
            <ul className="grid gap-3 text-sm leading-6 text-muted">
              <li>No raw brand colors in JSX.</li>
              <li>No undefined tactical class names.</li>
              <li>Tailwind semantic utilities stay aligned to framework tokens.</li>
            </ul>
          </Panel>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tone="warning"
        title="Authorize uplink route"
        description="This dialog validates the framework overlay, focus treatment, and action framing without introducing a second visual language."
        footer={
          <>
            <Button variant="ghost" tone="muted" onClick={() => setDialogOpen(false)}>
              Abort
            </Button>
            <Button
              tone="warning"
              onClick={() => {
                setDialogOpen(false);
                push(
                  toneToast(
                    "warning",
                    "Uplink authorized",
                    "The command overlay closed cleanly and pushed a matching tactical toast.",
                  ),
                );
              }}
            >
              Confirm uplink
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Panel tone="primary" density="compact">
            <p className="u-mono-label text-primary">Relay window</p>
            <p className="text-2xl font-semibold text-foreground">04:12</p>
            <p className="text-sm text-muted">Transmission budget remaining</p>
          </Panel>
          <Panel tone="success" density="compact">
            <p className="u-mono-label text-success">Integrity</p>
            <p className="text-2xl font-semibold text-foreground">Stable</p>
            <p className="text-sm text-muted">No packet drift detected</p>
          </Panel>
          <Panel tone="warning" density="compact">
            <p className="u-mono-label text-warning">Review</p>
            <p className="text-2xl font-semibold text-foreground">2 flags</p>
            <p className="text-sm text-muted">Manual signoff required</p>
          </Panel>
        </div>
      </Dialog>
    </main>
  );
}
