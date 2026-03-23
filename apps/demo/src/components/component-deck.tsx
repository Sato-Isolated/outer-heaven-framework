"use client";

import { useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  FileSearch,
  Info,
  Shield,
  Upload,
} from "lucide-react";
import {
  Badge,
  Button,
  Checkbox,
  CommandHeader,
  FilterStrip,
  Input,
  Panel,
  Select,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  Tooltip,
} from "@outerhaven/framework";

export function ComponentDeck() {
  const [switchEnabled, setSwitchEnabled] = useState(true);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <CommandHeader
        badge={<Badge tone="primary">Component Deck</Badge>}
        eyebrow="Framework Surface Index"
        title="Inspect the v1.5 primitives as a working catalog, not as isolated snippets."
        description="This page exists to validate sizes, tones, states, and compositional fit before future releases expand the contract."
        metaItems={[
          { label: "New primitives", value: "Textarea / Checkbox / Switch / Tabs / Tooltip" },
          { label: "Stable base", value: "Button / Input / Select / Panel / Dialog / Toast" },
          { label: "Intent", value: "Catalog + test bed + adoption reference" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <FilterStrip
          eyebrow="Controls"
          title="Inputs and toggles"
          description="The same semantic props now cover single-line fields, long-form inputs, boolean toggles, and guided selection."
          shortcuts={
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
              Inspect
              <Badge tone="warning">v1.5</Badge>
            </div>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Input
              aria-label="Mission query"
              insetLabel="Query"
              prefix={<FileSearch />}
              placeholder="Search relays, payloads, operators"
              hint="Single-line tactical inputs keep the inset label model."
            />
            <Select
              aria-label="Priority lane"
              insetLabel="Lane"
              prefix={<Activity />}
              defaultValue="active"
              hint="Selection surfaces use the same chrome contract."
            >
              <option value="active">Active lane</option>
              <option value="review">Review lane</option>
              <option value="archive">Archive lane</option>
            </Select>
            <Input
              aria-label="Compromised route"
              insetLabel="Review gate"
              prefix={<Info />}
              placeholder="Awaiting operator confirmation"
              state="warning"
              message="Escalate this route before export."
            />
            <Select
              aria-label="Approval state"
              insetLabel="Approval"
              prefix={<Shield />}
              defaultValue="blocked"
              invalid
              message="A valid approval lane is required."
            >
              <option value="blocked">Blocked</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
            </Select>
            <Textarea
              aria-label="Operator note"
              insetLabel="Operator note"
              prefix={<Bell />}
              placeholder="Write an extended handoff, warning, or mission annotation."
              hint="Textarea extends the same field shell for long-form tactical copy."
              className="lg:col-span-2"
            />
            <Panel tone="muted" density="compact" className="gap-4">
              <Checkbox description="Use the same semantic tone and explicit error state.">
                Require signature validation
              </Checkbox>
              <Checkbox tone="danger" invalid description="Operator must resolve the missing approval chain.">
                Flag payload as compromised
              </Checkbox>
            </Panel>
            <Panel tone="success" density="compact" className="gap-4">
              <Switch
                label="Live relay monitoring"
                description="Controlled boolean API with explicit focus treatment."
                checked={switchEnabled}
                onCheckedChange={setSwitchEnabled}
                tone="success"
              />
              <Switch
                label="Fallback uplink"
                description="Disabled switches preserve the same visual family."
                defaultChecked
                disabled
              />
            </Panel>
          </div>
        </FilterStrip>

        <Panel tone="warning" className="gap-5">
          <p className="u-mono-label text-warning">Tone Matrix</p>
          <div className="flex flex-wrap gap-3">
            <Badge tone="primary">primary</Badge>
            <Badge tone="success">success</Badge>
            <Badge tone="warning">warning</Badge>
            <Badge tone="danger">danger</Badge>
            <Badge tone="muted">muted</Badge>
          </div>
          <div className="grid gap-3">
            <Button tone="primary">Primary action</Button>
            <Button tone="success">
              <CheckCircle2 className="h-4 w-4" />
              Success action
            </Button>
            <Button tone="warning">Warning action</Button>
            <Button tone="danger">Danger action</Button>
            <Button tone="muted" ghost>
              Ghost action
            </Button>
            <div className="flex flex-wrap gap-3">
              <Button tone="primary" iconOnly aria-label="Inspect tactical snapshot">
                <FileSearch className="h-4 w-4" />
              </Button>
              <Button tone="warning" iconOnly aria-label="Review active watchpoint">
                <Bell className="h-4 w-4" />
              </Button>
              <Button tone="muted" ghost iconOnly aria-label="Upload deck snapshot">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Panel>
      </div>

      <Panel className="gap-6">
        <div className="grid gap-2">
          <p className="u-mono-label text-primary">Field Matrix</p>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            Input, Select, and Textarea should now read as one field family. This matrix
            keeps their label lane, prefix lane, and hint or message rhythm visible in one place.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Panel tone="primary" density="compact" className="gap-4">
            <p className="u-mono-label text-primary">Input</p>
            <Input
              aria-label="Input baseline"
              insetLabel="Query"
              placeholder="Search relay, payload, operator"
            />
            <Input
              aria-label="Input with prefix"
              insetLabel="Prefix lane"
              prefix={<FileSearch />}
              placeholder="Prefix and text should share one lane"
              hint="Framework-owned icon sizing, no local h-4 w-4 override."
            />
            <Input
              aria-label="Input watchpoint"
              insetLabel="Watchpoint"
              prefix={<Info />}
              state="warning"
              placeholder="Review before routing"
              message="Warning state keeps copy and chrome aligned."
            />
          </Panel>

          <Panel tone="warning" density="compact" className="gap-4">
            <p className="u-mono-label text-warning">Select</p>
            <Select aria-label="Select baseline" insetLabel="Sector" defaultValue="all">
              <option value="all">All sectors</option>
              <option value="north">North relay</option>
              <option value="south">South relay</option>
            </Select>
            <Select
              aria-label="Select with prefix"
              insetLabel="Lane"
              prefix={<Activity />}
              defaultValue="active"
              hint="Chevron and prefix should sit on the same optical line as the value."
            >
              <option value="active">Active lane</option>
              <option value="review">Review lane</option>
              <option value="archive">Archive lane</option>
            </Select>
            <Select
              aria-label="Select approval"
              insetLabel="Approval"
              prefix={<Shield />}
              defaultValue="blocked"
              invalid
              message="Approval lane must be resolved before export."
            >
              <option value="blocked">Blocked</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
            </Select>
          </Panel>

          <Panel tone="success" density="compact" className="gap-4">
            <p className="u-mono-label text-success">Textarea</p>
            <Textarea
              aria-label="Textarea baseline"
              insetLabel="Mission note"
              placeholder="Long-form notes keep the same shell while using a different text rhythm."
            />
            <Textarea
              aria-label="Textarea with prefix"
              insetLabel="Operator handoff"
              prefix={<Bell />}
              placeholder="Prefix should align to the first reading lane, not the vertical center of the whole box."
              hint="Textarea stays in-family without forcing single-line optics."
            />
          </Panel>
        </div>
      </Panel>

      <Tabs defaultValue="tabs" tone="primary">
        <TabsList>
          <TabsTrigger value="tabs">Tabs</TabsTrigger>
          <TabsTrigger value="tooltips">Tooltips</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
        </TabsList>

        <TabsPanel value="tabs">
          <div className="grid gap-6 lg:grid-cols-3">
            <Panel tone="primary" density="compact">
              <p className="u-mono-label text-primary">Trigger contract</p>
              <p className="text-sm leading-6 text-muted">
                Tabs now expose a lightweight segmented command surface with shared semantic metadata.
              </p>
            </Panel>
            <Panel tone="success" density="compact">
              <p className="u-mono-label text-success">Panel contract</p>
              <p className="text-sm leading-6 text-muted">
                Panels render only the active content by default and can later grow toward a richer content switcher.
              </p>
            </Panel>
            <Panel tone="warning" density="compact">
              <p className="u-mono-label text-warning">Roadmap fit</p>
              <p className="text-sm leading-6 text-muted">
                This is intentionally a narrow API so future releases can stay compatible while adding richer navigation patterns.
              </p>
            </Panel>
          </div>
        </TabsPanel>

        <TabsPanel value="tooltips">
          <Panel density="compact" className="gap-5">
            <p className="u-mono-label text-primary">Overlay hints</p>
            <div className="flex flex-wrap gap-4">
              <Tooltip
                tone="primary"
                content="Tooltips remain non-modal and close on blur, mouse leave, or Escape."
              >
                <Button tone="primary" size="sm">
                  Hover signal
                </Button>
              </Tooltip>
              <Tooltip
                tone="warning"
                side="bottom"
                content="Use tooltips for compact guidance, never for critical state that should already be visible."
              >
                <Button tone="warning" size="sm">
                  Focus guidance
                </Button>
              </Tooltip>
            </div>
          </Panel>
        </TabsPanel>

        <TabsPanel value="states">
          <div className="grid gap-6 lg:grid-cols-3">
            <Panel tone="success" density="compact">
              <p className="u-mono-label text-success">Healthy</p>
              <div className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Explicit success states remain readable without relying on color alone.
              </div>
            </Panel>
            <Panel tone="warning" density="compact">
              <p className="u-mono-label text-warning">Watchpoint</p>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Info className="h-4 w-4 text-warning" />
                Warnings can pair copy, tone, and iconography inside the same primitive family.
              </div>
            </Panel>
            <Panel tone="danger" density="compact">
              <p className="u-mono-label text-danger">Compromised</p>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Shield className="h-4 w-4 text-danger" />
                The contract leaves enough room for future destructive flows and review gates.
              </div>
            </Panel>
          </div>
        </TabsPanel>
      </Tabs>

      <Panel className="gap-5">
        <p className="u-mono-label text-primary">Adoption note</p>
        <p className="max-w-3xl text-sm leading-7 text-muted">
          The component deck is intentionally product-like. It doubles as a regression
          surface for future framework work and as a documentation page that downstream
          teams can scan without reverse-engineering the dashboard example.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button tone="primary">
            <Upload className="h-4 w-4" />
            Export deck snapshot
          </Button>
          <Button tone="muted" ghost>
            Compare release notes
          </Button>
        </div>
      </Panel>
    </main>
  );
}
