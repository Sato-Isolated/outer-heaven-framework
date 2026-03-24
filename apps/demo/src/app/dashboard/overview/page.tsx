"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  CircleAlert,
  FileSearch,
  Filter,
  Radar,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import {
  Badge,
  Button,
  Checkbox,
  FilterStrip,
  Input,
  Kbd,
  Select,
  StatGrid,
  Switch,
} from "@outerhaven/framework";

const kpis = [
  { label: "Queued payloads", value: "18", detail: "4 awaiting uplink", tone: "primary" as const, icon: <ArrowRight className="h-4 w-4" /> },
  { label: "Healthy relays", value: "99.98%", detail: "Across 6 sectors", tone: "success" as const, icon: <Shield className="h-4 w-4" /> },
  { label: "Warnings", value: "03", detail: "Two require approval", tone: "warning" as const, icon: <CircleAlert className="h-4 w-4" /> },
  { label: "Compromised", value: "01", detail: "Sandboxed node", tone: "danger" as const, icon: <Activity className="h-4 w-4" /> },
];

export default function OverviewPage() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);

  return (
    <div className="grid gap-6">
      <StatGrid items={kpis} />

      <FilterStrip
        eyebrow="Quick Filters"
        title="Operational overview controls"
        description="Scope the dashboard to a specific sector, toggle live monitoring, or search across all relays."
        shortcuts={
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
            Quick scope <Kbd>F</Kbd> <Kbd>R</Kbd>
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payload or owner"
            insetLabel="Query"
            hint="Filter by payload filename or owner tag."
            prefix={<FileSearch />}
            aria-label="Search payloads"
          />
          <Select
            value={sector}
            onValueChange={setSector}
            insetLabel="Sector"
            hint="Route the queue to a relay segment."
            prefix={<Radar />}
            aria-label="Filter sector"
            options={[
              { value: "all", label: "All sectors" },
              { value: "north", label: "North relay" },
              { value: "south", label: "South relay" },
              { value: "ghost", label: "Ghost channel" },
            ]}
          />
          <div className="grid gap-4 md:col-span-2 xl:col-span-1">
            <Switch
              label="Live relay monitoring"
              description="Enable real-time relay health tracking."
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

      <div className="grid gap-4 md:grid-cols-3">
        <div className="od-panel flex flex-col gap-3 p-5" data-tone="primary" data-size="sm">
          <p className="u-readout text-xs" style={{ color: "var(--od-tone-text)" }}>Sector Status</p>
          <p className="text-sm text-muted">
            {sector === "all" ? "All sectors online" : `Viewing ${sector} relay`}
          </p>
          <Badge tone="success" size="sm">Nominal</Badge>
        </div>
        <div className="od-panel flex flex-col gap-3 p-5" data-tone="success" data-size="sm">
          <p className="u-readout text-xs" style={{ color: "var(--od-tone-text)" }}>Monitoring</p>
          <p className="text-sm text-muted">
            {monitoringEnabled ? "Active — live telemetry enabled" : "Standby — manual refresh only"}
          </p>
          <Badge tone={monitoringEnabled ? "success" : "muted"} size="sm">
            {monitoringEnabled ? "Armed" : "Standby"}
          </Badge>
        </div>
        <div className="od-panel flex flex-col gap-3 p-5" data-tone="warning" data-size="sm">
          <p className="u-readout text-xs" style={{ color: "var(--od-tone-text)" }}>Search</p>
          <p className="text-sm text-muted">
            {search ? `Filtering: "${search}"` : "No active query — showing all results"}
          </p>
          <Badge tone={search ? "warning" : "muted"} size="sm">
            {search ? "Filtered" : "Idle"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
