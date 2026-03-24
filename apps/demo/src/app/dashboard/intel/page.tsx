"use client";

import { useState } from "react";
import { FileSearch, FileStack, Shield, Activity, Radar } from "lucide-react";
import {
  Badge,
  Button,
  InspectorPanel,
  Textarea,
  toneToast,
  useToast,
} from "@outerhaven/framework";

const intelItems = [
  {
    id: "intel-001",
    label: "Archive-17.tar",
    tone: "success" as const,
    eyebrow: "Payload Analysis",
    title: "Encrypted archive — verified",
    body: "Standard AES-256 encryption confirmed. No anomalous headers. Origin validated against NEST-04 fingerprint. Safe for relay forwarding.",
    meta: "Verified by automated scanner / 02:14 UTC",
  },
  {
    id: "intel-002",
    label: "blacksite-key.pem",
    tone: "danger" as const,
    eyebrow: "Security Alert",
    title: "Flagged credential file",
    body: "Private key material detected outside approved key vault. File origin traces to GHOST-07 workstation. Quarantine recommended pending manual review.",
    meta: "Flagged by signature engine / 01:58 UTC",
  },
  {
    id: "intel-003",
    label: "sensor-grid.csv",
    tone: "warning" as const,
    eyebrow: "Pending Review",
    title: "Sensor telemetry — awaiting scan",
    body: "Large dataset from FIELD-12 south relay. Contains 48h of sensor readings. Size exceeds fast-scan threshold — queued for deep analysis.",
    meta: "Queued / estimated completion 04:30 UTC",
  },
  {
    id: "intel-004",
    label: "recon-dump.zip",
    tone: "primary" as const,
    eyebrow: "Reconnaissance Data",
    title: "Field recon package",
    body: "Compressed reconnaissance imagery and metadata from southern relay perimeter sweep. Imagery resolution nominal. No embedded executables detected.",
    meta: "Intake complete / standard classification",
  },
];

export default function IntelPage() {
  const [selectedId, setSelectedId] = useState<string | null>(intelItems[0].id);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const { push } = useToast();

  const selected = intelItems.find((item) => item.id === selectedId) ?? null;

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Intel list sidebar */}
      <div className="grid gap-2 content-start">
        <p className="u-readout m-0 text-xs" style={{ color: "var(--od-color-primary)" }}>
          Intel Items
        </p>
        {intelItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="flex items-center gap-3 border bg-transparent p-3 text-left transition-all"
            style={{
              borderColor: selectedId === item.id ? "var(--od-border-accent)" : "var(--od-border-subtle)",
              background: selectedId === item.id ? "var(--od-surface-elevated)" : "transparent",
              cursor: "pointer",
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)",
            }}
          >
            <Badge tone={item.tone} size="sm">
              {item.tone === "danger" ? "!" : item.tone === "warning" ? "?" : "✓"}
            </Badge>
            <div className="grid gap-0.5 min-w-0">
              <span className="truncate text-sm font-semibold" style={{ color: "var(--od-color-foreground)" }}>
                {item.label}
              </span>
              <span className="truncate text-xs" style={{ color: "var(--od-color-muted)" }}>
                {item.eyebrow}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="grid gap-6 content-start">
        {selected ? (
          <>
            <InspectorPanel
              tone={selected.tone}
              eyebrow={selected.eyebrow}
              title={selected.title}
              icon={
                selected.tone === "danger" ? <Activity className="h-5 w-5" /> :
                selected.tone === "warning" ? <FileSearch className="h-5 w-5" /> :
                selected.tone === "success" ? <Shield className="h-5 w-5" /> :
                <Radar className="h-5 w-5" />
              }
              footer={
                <div className="flex gap-2">
                  <Button tone={selected.tone} size="sm">
                    {selected.tone === "danger" ? "Quarantine" : selected.tone === "warning" ? "Escalate" : "Approve"}
                  </Button>
                  <Button ghost tone="muted" size="sm">
                    Export
                  </Button>
                </div>
              }
            >
              <div className="grid gap-4 text-sm">
                <p className="m-0 text-muted leading-relaxed">{selected.body}</p>
                <p className="u-readout m-0 text-xs" style={{ color: "var(--od-tone-text)" }}>
                  {selected.meta}
                </p>
              </div>
            </InspectorPanel>

            <Textarea
              aria-label={`Notes for ${selected.label}`}
              insetLabel="Analyst Notes"
              prefix={<FileStack />}
              placeholder={`Write analysis notes for ${selected.label}...`}
              hint="Notes are preserved per-item during this session."
              value={notes[selected.id] ?? ""}
              onChange={(e) => setNotes((prev) => ({ ...prev, [selected.id]: e.target.value }))}
            />

            <div className="flex gap-3">
              <Button
                tone="primary"
                size="sm"
                onClick={() => {
                  push(toneToast("success", "Notes saved", `Analysis notes for ${selected.label} have been recorded.`));
                }}
              >
                Save notes
              </Button>
              <Button
                ghost
                tone="muted"
                size="sm"
                onClick={() => {
                  setNotes((prev) => ({ ...prev, [selected.id]: "" }));
                  push(toneToast("muted", "Notes cleared", `Cleared notes for ${selected.label}.`));
                }}
              >
                Clear
              </Button>
            </div>
          </>
        ) : (
          <InspectorPanel
            tone="muted"
            eyebrow="No Selection"
            title="Select an intel item"
            icon={<FileStack className="h-5 w-5" />}
          >
            <p className="m-0 text-sm text-muted">Choose an item from the list to view its analysis.</p>
          </InspectorPanel>
        )}
      </div>
    </div>
  );
}
