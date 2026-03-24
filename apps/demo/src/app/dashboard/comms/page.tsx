"use client";

import { useState } from "react";
import { MessageSquare, Send, Shield, Lock } from "lucide-react";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  InspectorPanel,
  Panel,
  Textarea,
  toneToast,
  useToast,
} from "@outerhaven/framework";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  encrypted: boolean;
  priority: boolean;
  tone: "primary" | "success" | "warning" | "danger" | "muted";
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Northern relay handoff confirmed. All 12 payloads accepted by south edge cache.",
    sender: "NEST-04",
    timestamp: "02:14 UTC",
    encrypted: true,
    priority: false,
    tone: "success",
  },
  {
    id: 2,
    text: "Ghost channel latency exceeding threshold. Recommend rerouting non-critical traffic to north relay.",
    sender: "OPS-21",
    timestamp: "02:08 UTC",
    encrypted: false,
    priority: true,
    tone: "warning",
  },
  {
    id: 3,
    text: "Unauthorized probe deflected at sector boundary. No breach confirmed. Logging full packet trace.",
    sender: "RAVEN-02",
    timestamp: "01:52 UTC",
    encrypted: true,
    priority: true,
    tone: "danger",
  },
  {
    id: 4,
    text: "Routine maintenance window opens at 04:00 UTC. Cold storage rotation will proceed as scheduled.",
    sender: "SYS-AUTO",
    timestamp: "01:30 UTC",
    encrypted: false,
    priority: false,
    tone: "muted",
  },
];

export default function CommsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [encrypt, setEncrypt] = useState(false);
  const [priority, setPriority] = useState(false);
  const { push } = useToast();

  const handleSend = () => {
    if (!draft.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: draft.trim(),
      sender: "OPERATOR",
      timestamp: new Date().toISOString().slice(11, 16) + " UTC",
      encrypted: encrypt,
      priority,
      tone: priority ? "warning" : "primary",
    };

    setMessages((prev) => [newMessage, ...prev]);
    setDraft("");
    push(
      toneToast(
        encrypt ? "success" : "primary",
        "Message sent",
        encrypt ? "Encrypted transmission routed through secure relay." : "Message dispatched to operator channel.",
      ),
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid gap-6 content-start">
        {/* Compose */}
        <div className="grid gap-4">
          <Textarea
            aria-label="Compose message"
            insetLabel="Compose"
            prefix={<MessageSquare />}
            placeholder="Write a message to the operator channel..."
            hint="Messages are broadcast to all active operators in the current sector."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-4">
              <Checkbox
                checked={encrypt}
                onChange={(e) => setEncrypt(e.target.checked)}
                description="Route through encrypted relay"
              >
                <Lock className="inline h-3.5 w-3.5" style={{ marginRight: 4 }} />
                Encrypt
              </Checkbox>
              <Checkbox
                checked={priority}
                onChange={(e) => setPriority(e.target.checked)}
                tone="warning"
                description="Flag as high-priority"
              >
                Priority
              </Checkbox>
            </div>
            <Button tone="primary" onClick={handleSend} disabled={!draft.trim()}>
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>

        <Divider />

        {/* Message history */}
        <div className="grid gap-3">
          <p className="u-readout m-0 text-xs" style={{ color: "var(--od-color-primary)" }}>
            Message History — {messages.length} entries
          </p>
          {messages.map((msg) => (
            <Panel key={msg.id} tone={msg.tone} size="sm" density="compact">
              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="u-readout text-xs" style={{ color: "var(--od-tone-text)" }}>
                      {msg.sender}
                    </span>
                    <span className="text-xs" style={{ color: "var(--od-color-muted)" }}>
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="m-0 text-sm" style={{ color: "var(--od-color-foreground)" }}>
                    {msg.text}
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-1">
                  {msg.encrypted && <Badge tone="success" size="sm"><Lock className="h-3 w-3" /></Badge>}
                  {msg.priority && <Badge tone="warning" size="sm">!</Badge>}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="grid gap-6 content-start">
        <InspectorPanel
          tone="primary"
          eyebrow="Channel Info"
          title="Operator channel"
          icon={<MessageSquare className="h-5 w-5" />}
        >
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Active operators</span>
              <Badge tone="success" size="sm">4 online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Encryption</span>
              <Badge tone={encrypt ? "success" : "muted"} size="sm">
                {encrypt ? "Enabled" : "Optional"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Messages today</span>
              <Badge tone="primary" size="sm">{messages.length}</Badge>
            </div>
          </div>
        </InspectorPanel>

        <InspectorPanel
          tone="muted"
          eyebrow="Operator Roster"
          title="Active callsigns"
          icon={<Shield className="h-5 w-5" />}
        >
          <div className="grid gap-2 text-sm">
            {["NEST-04", "OPS-21", "RAVEN-02", "FIELD-12"].map((callsign) => (
              <div key={callsign} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--od-color-success)" }}
                />
                <span className="u-readout text-xs" style={{ color: "var(--od-color-foreground)" }}>
                  {callsign}
                </span>
              </div>
            ))}
          </div>
        </InspectorPanel>
      </div>
    </div>
  );
}
