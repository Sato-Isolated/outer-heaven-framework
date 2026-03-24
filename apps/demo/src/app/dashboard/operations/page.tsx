"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  FileSearch,
  Filter,
  Radar,
  SlidersHorizontal,
} from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  FilterStrip,
  Input,
  MissionQueue,
  Select,
  StatGrid,
  Tooltip,
  toneToast,
  useToast,
} from "@outerhaven/framework";

const missionRows = [
  { name: "Archive-17.tar", status: "Encrypted", owner: "NEST-04", sector: "north", tone: "success" as const },
  { name: "sensor-grid.csv", status: "Awaiting scan", owner: "FIELD-12", sector: "south", tone: "warning" as const },
  { name: "support-log.bin", status: "Queued", owner: "OPS-21", sector: "ghost", tone: "primary" as const },
  { name: "uplink-trace.mov", status: "Inspection", owner: "RAVEN-02", sector: "north", tone: "muted" as const },
  { name: "recon-dump.zip", status: "Verified", owner: "NEST-04", sector: "south", tone: "success" as const },
  { name: "blacksite-key.pem", status: "Flagged", owner: "GHOST-07", sector: "ghost", tone: "danger" as const },
];

export default function OperationsPage() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const { push } = useToast();

  const filteredRows = useMemo(() => {
    return missionRows.filter((row) => {
      const matchesSearch = `${row.name} ${row.owner}`.toLowerCase().includes(search.toLowerCase());
      const matchesSector = sector === "all" || row.sector === sector;
      return matchesSearch && matchesSector;
    });
  }, [search, sector]);

  return (
    <div className="grid gap-6">
      <FilterStrip
        eyebrow="Mission Filters"
        title="Scope the active queue"
        description="Search by payload name or owner tag, and filter by relay sector."
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
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payload or owner"
            insetLabel="Query"
            prefix={<FileSearch />}
            aria-label="Search missions"
          />
          <Select
            value={sector}
            onValueChange={setSector}
            insetLabel="Sector"
            prefix={<Radar />}
            aria-label="Filter sector"
            options={[
              { value: "all", label: "All sectors" },
              { value: "north", label: "North relay" },
              { value: "south", label: "South relay" },
              { value: "ghost", label: "Ghost channel" },
            ]}
          />
        </div>
      </FilterStrip>

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
            <div className="flex gap-2">
              <Tooltip tone={row.tone} content={`Inspect ${row.name}`}>
                <Button tone="muted" ghost size="sm">
                  Inspect
                </Button>
              </Tooltip>
              <Button
                tone="warning"
                size="sm"
                onClick={() => {
                  setSelectedMission(row.name);
                  setDialogOpen(true);
                }}
              >
                Authorize
              </Button>
            </div>
          ),
        }))}
      />

      <div className="flex flex-wrap gap-3">
        <Button
          tone="success"
          onClick={() =>
            push(toneToast("success", "Queue refreshed", "All payloads re-scanned against current signatures."))
          }
        >
          Refresh queue
        </Button>
        <Button
          tone="warning"
          onClick={() =>
            push(toneToast("warning", "Bulk authorize", "This action requires Level 4 clearance."))
          }
        >
          Bulk authorize
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tone="warning"
        title={`Authorize ${selectedMission ?? "payload"}`}
        description="Confirm uplink authorization for this payload. This action will route the item through the encrypted relay."
        footer={
          <>
            <Button ghost tone="muted" onClick={() => setDialogOpen(false)}>
              Abort
            </Button>
            <Button
              tone="warning"
              onClick={() => {
                setDialogOpen(false);
                push(toneToast("warning", "Uplink authorized", `${selectedMission} routed to encrypted relay.`));
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
    </div>
  );
}
