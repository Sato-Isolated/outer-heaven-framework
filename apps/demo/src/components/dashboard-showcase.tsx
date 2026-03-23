"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  FileSearch,
  FileStack,
  Filter,
  Radar,
  Shield,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import {
  ActivityFeed,
  Badge,
  Button,
  Checkbox,
  CommandHeader,
  Dialog,
  Dropzone,
  FilterStrip,
  InspectorPanel,
  Input,
  Kbd,
  MissionQueue,
  Select,
  StatGrid,
  Switch,
  Textarea,
  toneToast,
  Tooltip,
  useToast,
} from "@outerhaven/framework";

const kpis = [
  { label: "Queued payloads", value: "18", detail: "4 awaiting uplink", tone: "primary" as const, icon: <ArrowRight className="h-4 w-4" /> },
  { label: "Healthy relays", value: "99.98%", detail: "Across 6 sectors", tone: "success" as const, icon: <Shield className="h-4 w-4" /> },
  { label: "Warnings", value: "03", detail: "Two require approval", tone: "warning" as const, icon: <CircleAlert className="h-4 w-4" /> },
  { label: "Compromised", value: "01", detail: "Sandboxed node", tone: "danger" as const, icon: <Activity className="h-4 w-4" /> },
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
  {
    tone: "success" as const,
    title: "Relay sync complete",
    note: "Northern edge cache flushed 18 seconds ago.",
    meta: "Healthy relay / automatic validation",
  },
  {
    tone: "warning" as const,
    title: "Retention window near expiry",
    note: "Archive-17.tar drops below threshold at 02:40 UTC.",
    meta: "Review required / warning threshold",
  },
  {
    tone: "danger" as const,
    title: "Manual review requested",
    note: "One payload exceeded the default signature envelope.",
    meta: "Escalation lane / manual decision",
  },
];

type UploadState = "default" | "active" | "loading" | "success" | "error";

export function DashboardShowcase() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("active");
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
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
      <CommandHeader
        badge={<Badge tone="primary">Command Dashboard / Demo</Badge>}
        eyebrow="Operational Workspace"
        title="Validate the framework against a dense, tactical working surface."
        description="This page now consumes reusable framework compositions instead of hand-assembling every section locally."
        actions={
          <>
            <Button asChild tone="muted" size="sm" ghost>
              <Link href="/components">Open component deck</Link>
            </Button>
            <Button tone="warning" size="sm" onClick={() => setDialogOpen(true)}>
              Authorize uplink
            </Button>
            <Button
              tone="success"
              size="sm"
              onClick={() =>
                push(
                  toneToast(
                    "success",
                    "Signal routed",
                    "Demo toast confirms the od-toast primitive and provider path.",
                  ),
                )
              }
            >
              Trigger toast
            </Button>
          </>
        }
        metaItems={[
          { label: "Current sector", value: sector === "all" ? "All sectors" : sector },
          { label: "Results", value: `${filteredRows.length} surfaced` },
          { label: "Monitoring", value: monitoringEnabled ? "armed" : "standby" },
        ]}
      />

      <StatGrid items={kpis} />

      <FilterStrip
        eyebrow="Filter Strip"
        title="Inputs, toggles, and boolean controls now share one reusable section pattern."
        description="The filter surface is now a composition from the framework package, not dashboard-only JSX."
        shortcuts={
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
            Quick scope
            <Kbd>F</Kbd>
            <Kbd>R</Kbd>
          </div>
        }
        actions={
          <>
            <Button tone="primary">
              <Filter className="h-4 w-4" />
              Apply
            </Button>
            <Button ghost tone="muted">
              <SlidersHorizontal className="h-4 w-4" />
              Presets
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_220px_minmax(0,0.8fr)]">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search payload or owner"
            insetLabel="Query"
            hint="Filter by payload filename or owner tag."
            prefix={<FileSearch />}
            aria-label="Search payloads"
          />
          <Select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            insetLabel="Sector"
            hint="Route the queue to a relay segment."
            prefix={<Radar />}
            aria-label="Filter sector"
          >
            <option value="all">All sectors</option>
            <option value="north">North relay</option>
            <option value="south">South relay</option>
            <option value="ghost">Ghost channel</option>
          </Select>
          <div className="grid gap-4 md:col-span-2 xl:col-span-1">
            <Switch
              label="Live relay monitoring"
              description="Framework-level boolean control."
              checked={monitoringEnabled}
              onCheckedChange={setMonitoringEnabled}
              tone="success"
            />
            <Checkbox description="Keep warning surfaces explicit during operator review." defaultChecked>
              Escalate flagged payloads
            </Checkbox>
          </div>
        </div>
      </FilterStrip>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
        <div className="grid gap-6">
          <MissionQueue
            eyebrow="Active Queue"
            title="Current payloads"
            badge={<Badge tone="primary">{filteredRows.length} surfaced</Badge>}
            items={filteredRows.map((row) => ({
              name: row.name,
              detail: `Owner ${row.owner} / Sector ${row.sector}`,
              status: row.status,
              tone: row.tone,
              action: (
                <Tooltip
                  tone={row.tone}
                  content={`Inspect ${row.name} without leaving the tactical queue context.`}
                >
                  <Button tone="muted" ghost size="sm">
                    Inspect
                  </Button>
                </Tooltip>
              ),
            }))}
          />

          <Dropzone
            tone={
              uploadState === "success"
                ? "success"
                : uploadState === "error"
                  ? "danger"
                  : uploadState === "loading"
                    ? "warning"
                    : "primary"
            }
            state={uploadState}
            className="u-scan-pass"
            eyebrow="Dropzone Simulator"
            title="Toggle real primitive states without changing the underlying styles."
            description="This example validates the structured dropzone API while the surrounding copy is now authored through reusable framework sections."
            hint="Idle, drag-over, uploading, success, and error paths should all remain readable under the same token system."
            icon={<Upload className="h-6 w-6" />}
            status={
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
            }
            actions={
              <>
                <Button size="sm" tone="muted" ghost onClick={() => setUploadState("default")}>
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
              </>
            }
          >
            <InspectorPanel
              tone="muted"
              eyebrow="Intake note"
              title="Payload staging"
              icon={<Upload className="h-4 w-4" />}
            >
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Upload className="h-4 w-4 text-primary" />
                <span>Structured body slot stays aligned with the panel contract.</span>
              </div>
            </InspectorPanel>
          </Dropzone>
        </div>

        <div className="grid gap-6">
          <ActivityFeed
            eyebrow="Signal Feed"
            title="Live operator notes"
            items={eventFeed}
          />

          <InspectorPanel
            tone="muted"
            eyebrow="Operator Toolkit"
            title="Keyboard-first details"
            icon={<Activity className="h-5 w-5" />}
          >
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
          </InspectorPanel>

          <InspectorPanel
            tone="success"
            eyebrow="Integrity Snapshot"
            title="Clean primitive usage"
            icon={<FileStack className="h-5 w-5" />}
          >
            <ul className="grid gap-3 text-sm leading-6 text-muted">
              <li>No raw framework colors in JSX.</li>
              <li>No undefined tactical class names.</li>
              <li>Landing, dashboard, and deck all consume the same exported layers.</li>
            </ul>
          </InspectorPanel>
        </div>
      </div>

      <FilterStrip
        eyebrow="Operator Notes"
        title="Long-form tactical input now has a first-class primitive."
        description="Textarea, checkbox, and switch let future admin and review screens stay in-family without page-local components."
      >
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <Textarea
            aria-label="Mission handoff"
            insetLabel="Mission handoff"
            prefix={<FileStack />}
            placeholder="Write a handoff note for the next operator shift."
            hint="Useful for documenting review context, approval notes, or relay anomalies."
            message="Keep the relay summary short enough to scan during review."
            state="warning"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <Checkbox description="Future release can route these settings to persisted preferences.">
              Require human signoff before external uplink
            </Checkbox>
            <Checkbox tone="warning" description="Keep cautionary paths visible in the same control family.">
              Extend retention window on warning
            </Checkbox>
            <div className="flex flex-wrap gap-3">
              <Button tone="muted" ghost iconOnly aria-label="Inspect relay audit trail">
                <FileSearch className="h-4 w-4" />
              </Button>
              <Button tone="warning" iconOnly aria-label="Escalate relay watchpoint">
                <CircleAlert className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </FilterStrip>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tone="warning"
        title="Authorize uplink route"
        description="This dialog validates the framework overlay, focus treatment, and action framing without introducing a second visual language."
        footer={
          <>
            <Button ghost tone="muted" onClick={() => setDialogOpen(false)}>
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
        <StatGrid
          items={[
            { label: "Relay window", value: "04:12", detail: "Transmission budget remaining", tone: "primary", icon: <Radar className="h-4 w-4" /> },
            { label: "Integrity", value: "Stable", detail: "No packet drift detected", tone: "success", icon: <CheckCircle2 className="h-4 w-4" /> },
            { label: "Review", value: "2 flags", detail: "Manual signoff required", tone: "warning", icon: <CircleAlert className="h-4 w-4" /> },
          ]}
          className="lg:grid-cols-3"
        />
      </Dialog>
    </main>
  );
}
