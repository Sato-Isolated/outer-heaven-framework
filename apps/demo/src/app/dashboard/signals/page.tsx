"use client";

import { useState } from "react";
import { Radio, Shield, CircleAlert, Activity } from "lucide-react";
import {
  ActivityFeed,
  Badge,
  Button,
  InspectorPanel,
  Select,
  toneToast,
  useToast,
} from "@outerhaven/framework";
import type { Tone } from "@outerhaven/framework";

const allSignals = [
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
  {
    tone: "success" as const,
    title: "Sector handoff verified",
    note: "South relay accepted 12 queued payloads from North edge.",
    meta: "Transfer complete / no anomalies",
  },
  {
    tone: "primary" as const,
    title: "New payload ingested",
    note: "blacksite-key.pem queued for signature analysis.",
    meta: "Intake pipeline / standard flow",
  },
  {
    tone: "warning" as const,
    title: "Latency spike detected",
    note: "Ghost channel round-trip exceeded 340ms threshold.",
    meta: "Performance alert / auto-recovering",
  },
  {
    tone: "danger" as const,
    title: "Unauthorized access attempt",
    note: "External probe deflected at sector boundary firewall.",
    meta: "Security event / blocked",
  },
  {
    tone: "success" as const,
    title: "Backup rotation complete",
    note: "Cold storage snapshot finalized across all sectors.",
    meta: "Maintenance / scheduled task",
  },
];

export default function SignalsPage() {
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedSignal, setSelectedSignal] = useState<number | null>(null);
  const { push } = useToast();

  const filteredSignals = severityFilter === "all"
    ? allSignals
    : allSignals.filter((s) => s.tone === severityFilter);

  const selected = selectedSignal !== null ? filteredSignals[selectedSignal] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="grid gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={severityFilter}
            onValueChange={setSeverityFilter}
            insetLabel="Severity"
            prefix={<Radio />}
            aria-label="Filter by severity"
            options={[
              { value: "all", label: "All signals" },
              { value: "success", label: "Healthy" },
              { value: "warning", label: "Warnings" },
              { value: "danger", label: "Critical" },
              { value: "primary", label: "Info" },
            ]}
          />
          <Badge tone={severityFilter === "all" ? "primary" : (severityFilter as Tone)}>
            {filteredSignals.length} signals
          </Badge>
          <Button
            tone="muted"
            ghost
            size="sm"
            onClick={() => {
              setSelectedSignal(null);
              push(toneToast("success", "Feed refreshed", "Signal feed re-synced with relay network."));
            }}
          >
            Refresh
          </Button>
        </div>

        <ActivityFeed
          eyebrow="Signal Feed"
          title="Live operator signals"
          items={filteredSignals.map((signal, i) => ({
            ...signal,
            title: (
              <button
                className="cursor-pointer border-0 bg-transparent p-0 text-left font-semibold text-[color:var(--od-color-foreground)] hover:text-[color:var(--od-color-primary)]"
                style={{ transition: "color var(--od-motion-fast) var(--od-motion-ease-standard)" }}
                onClick={() => setSelectedSignal(i)}
              >
                {signal.title}
              </button>
            ) as unknown as string,
          }))}
        />
      </div>

      <div className="grid gap-6 content-start">
        {selected ? (
          <InspectorPanel
            tone={selected.tone}
            eyebrow="Signal Detail"
            title={typeof selected.title === "string" ? selected.title : allSignals[selectedSignal!].title}
            icon={
              selected.tone === "success" ? <Shield className="h-5 w-5" /> :
              selected.tone === "warning" ? <CircleAlert className="h-5 w-5" /> :
              selected.tone === "danger" ? <Activity className="h-5 w-5" /> :
              <Radio className="h-5 w-5" />
            }
            footer={
              <div className="flex gap-2">
                <Button tone={selected.tone} size="sm">
                  Acknowledge
                </Button>
                <Button ghost tone="muted" size="sm" onClick={() => setSelectedSignal(null)}>
                  Dismiss
                </Button>
              </div>
            }
          >
            <div className="grid gap-3 text-sm">
              <p className="m-0 text-muted">{selected.note}</p>
              <p className="u-readout m-0 text-xs" style={{ color: "var(--od-tone-text)" }}>
                {selected.meta}
              </p>
            </div>
          </InspectorPanel>
        ) : (
          <InspectorPanel
            tone="muted"
            eyebrow="No Selection"
            title="Select a signal"
            icon={<Radio className="h-5 w-5" />}
          >
            <p className="m-0 text-sm text-muted">
              Click on a signal title in the feed to view its details here.
            </p>
          </InspectorPanel>
        )}

        <InspectorPanel
          tone="primary"
          eyebrow="Feed Summary"
          title="Signal breakdown"
          icon={<Radio className="h-5 w-5" />}
        >
          <div className="grid gap-2 text-sm">
            {(["success", "warning", "danger", "primary"] as const).map((tone) => {
              const count = allSignals.filter((s) => s.tone === tone).length;
              const labels = { success: "Healthy", warning: "Warnings", danger: "Critical", primary: "Info" };
              return (
                <div key={tone} className="flex items-center justify-between">
                  <span className="text-muted">{labels[tone]}</span>
                  <Badge tone={tone} size="sm">{count}</Badge>
                </div>
              );
            })}
          </div>
        </InspectorPanel>
      </div>
    </div>
  );
}
