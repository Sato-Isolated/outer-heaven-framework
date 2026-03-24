"use client";

import { useState } from "react";
import {
  Upload,
  CheckCircle2,
  Shield,
  CircleAlert,
  FileStack,
  Trash2,
} from "lucide-react";
import {
  Badge,
  Button,
  Dropzone,
  InspectorPanel,
  Panel,
  toneToast,
  useToast,
} from "@outerhaven/framework";

type UploadState = "default" | "active" | "loading" | "success" | "error";

interface FileEntry {
  id: number;
  name: string;
  size: string;
  status: "queued" | "uploading" | "complete" | "failed";
  tone: "primary" | "warning" | "success" | "danger";
}

const initialFiles: FileEntry[] = [
  { id: 1, name: "recon-alpha.tar.gz", size: "24.8 MB", status: "complete", tone: "success" },
  { id: 2, name: "sector-telemetry.csv", size: "3.1 MB", status: "complete", tone: "success" },
  { id: 3, name: "relay-config.yaml", size: "12 KB", status: "uploading", tone: "warning" },
  { id: 4, name: "intercept-log.bin", size: "156 MB", status: "queued", tone: "primary" },
];

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>("active");
  const [files, setFiles] = useState<FileEntry[]>(initialFiles);
  const { push } = useToast();

  const completeCount = files.filter((f) => f.status === "complete").length;
  const uploadingCount = files.filter((f) => f.status === "uploading").length;
  const queuedCount = files.filter((f) => f.status === "queued").length;
  const failedCount = files.filter((f) => f.status === "failed").length;

  const simulateUpload = () => {
    setUploadState("loading");
    const newFile: FileEntry = {
      id: Date.now(),
      name: `payload-${Math.random().toString(36).slice(2, 8)}.dat`,
      size: `${(Math.random() * 100).toFixed(1)} MB`,
      status: "uploading",
      tone: "warning",
    };
    setFiles((prev) => [newFile, ...prev]);

    setTimeout(() => {
      const success = Math.random() > 0.3;
      setUploadState(success ? "success" : "error");
      setFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id
            ? { ...f, status: success ? "complete" : "failed", tone: success ? "success" : "danger" }
            : f,
        ),
      );
      push(
        toneToast(
          success ? "success" : "danger",
          success ? "Upload complete" : "Upload failed",
          success
            ? `${newFile.name} verified and staged for relay.`
            : `${newFile.name} failed integrity check. Retry recommended.`,
        ),
      );
    }, 2000);
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    push(toneToast("muted", "File removed", "Entry cleared from the upload queue."));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid gap-6 content-start">
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
          eyebrow="Secure Upload"
          title="Drop files here or click to browse"
          description="All uploads are scanned for integrity and staged in the relay buffer before forwarding."
          hint="Supported formats: .tar, .gz, .csv, .bin, .yaml, .pem, .zip"
          icon={<Upload className="h-6 w-6" />}
          status={
            <div className="grid gap-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Automatic integrity verification
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Encrypted transfer to relay buffer
              </div>
              <div className="flex items-center gap-2">
                <CircleAlert className="h-4 w-4 text-warning" />
                Flagged files require manual approval
              </div>
            </div>
          }
          actions={
            <>
              <Button size="sm" tone="primary" onClick={simulateUpload}>
                Simulate upload
              </Button>
              <Button size="sm" tone="muted" ghost onClick={() => setUploadState("active")}>
                Reset
              </Button>
            </>
          }
        />

        {/* File list */}
        <div className="grid gap-3">
          <p className="u-readout m-0 text-xs" style={{ color: "var(--od-color-primary)" }}>
            Upload Queue — {files.length} files
          </p>
          {files.map((file) => (
            <Panel key={file.id} tone={file.tone} size="sm" density="compact">
              <div className="flex items-center justify-between gap-3">
                <div className="grid gap-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <FileStack className="h-4 w-4 flex-shrink-0" style={{ color: "var(--od-tone-text)" }} />
                    <span className="truncate text-sm font-semibold" style={{ color: "var(--od-color-foreground)" }}>
                      {file.name}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--od-color-muted)" }}>
                    {file.size}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge tone={file.tone} size="sm">
                    {file.status}
                  </Badge>
                  <Button
                    ghost
                    tone="muted"
                    iconOnly
                    size="sm"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => removeFile(file.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              {file.status === "uploading" && (
                <div
                  className="h-1 rounded-full"
                  style={{
                    background: "var(--od-surface-elevated)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "60%",
                      background: "var(--od-color-warning)",
                      transition: "width var(--od-motion-slow) var(--od-motion-ease-standard)",
                    }}
                  />
                </div>
              )}
            </Panel>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="grid gap-6 content-start">
        <InspectorPanel
          tone="primary"
          eyebrow="Upload Stats"
          title="Queue summary"
          icon={<Upload className="h-5 w-5" />}
        >
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Complete</span>
              <Badge tone="success" size="sm">{completeCount}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Uploading</span>
              <Badge tone="warning" size="sm">{uploadingCount}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Queued</span>
              <Badge tone="primary" size="sm">{queuedCount}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Failed</span>
              <Badge tone="danger" size="sm">{failedCount}</Badge>
            </div>
          </div>
        </InspectorPanel>

        <InspectorPanel
          tone="muted"
          eyebrow="Upload Protocol"
          title="Relay staging"
          icon={<Shield className="h-5 w-5" />}
        >
          <ul className="grid gap-2 text-sm text-muted m-0 p-0" style={{ listStyle: "none" }}>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success mt-0.5" />
              Files are scanned against current signatures
            </li>
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
              Encrypted in transit to relay buffer
            </li>
            <li className="flex items-start gap-2">
              <CircleAlert className="h-4 w-4 flex-shrink-0 text-warning mt-0.5" />
              Flagged items held for operator approval
            </li>
          </ul>
        </InspectorPanel>

        <div className="grid gap-2">
          <Button
            tone="success"
            className="w-full"
            onClick={() =>
              push(toneToast("success", "Queue processed", "All verified files forwarded to relay network."))
            }
          >
            Process queue
          </Button>
          <Button
            ghost
            tone="danger"
            className="w-full"
            onClick={() => {
              setFiles([]);
              push(toneToast("danger", "Queue cleared", "All entries removed from upload queue."));
            }}
          >
            Clear all
          </Button>
        </div>
      </div>
    </div>
  );
}
