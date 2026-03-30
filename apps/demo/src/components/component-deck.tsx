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
  ActivityFeed,
  Badge,
  Button,
  Checkbox,
  CommandHeader,
  Dialog,
  Divider,
  FilterStrip,
  Input,
  InspectorPanel,
  Kbd,
  MissionQueue,
  Panel,
  RadioGroup,
  RadioGroupItem,
  Select,
  Shell,
  StatGrid,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  Toast,
  Tooltip,
  Dropzone,
} from "@outerhaven/framework";

export function ComponentDeck() {
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [dialogSize, setDialogSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | null>(null);
  const visualSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const fieldSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const badgeSizes = ["xs", "sm", "md", "lg"] as const;
  const densityModes = ["compact", "default", "roomy"] as const;
  const fieldOptions = [
    { value: "active", label: "Active lane" },
    { value: "review", label: "Review lane" },
    { value: "archive", label: "Archive lane" },
  ];
  const densityStatItems = [
    {
      label: "Queued",
      value: "18",
      detail: "Card padding should step visibly across densities.",
      tone: "primary" as const,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "Review",
      value: "07",
      detail: "Item rhythm should open up without changing hierarchy.",
      tone: "warning" as const,
      icon: <Info className="h-4 w-4" />,
    },
    {
      label: "Cleared",
      value: "26",
      detail: "Roomy should feel broader, not just slightly taller.",
      tone: "success" as const,
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  ];
  const densityFeedItems = [
    {
      title: "Relay sweep complete",
      note: "Item rhythm should separate updates into readable slices.",
      tone: "success" as const,
      meta: "02m ago",
    },
    {
      title: "Manual review required",
      note: "Header spacing and item spacing should both grow with density.",
      tone: "warning" as const,
      meta: "11m ago",
    },
  ];
  const densityQueueItems = [
    {
      name: "Archive-17.tar",
      detail: "Owner NEST-04 / card padding reference",
      status: "Ready",
      tone: "success" as const,
      action: <Button size="sm">Inspect</Button>,
    },
    {
      name: "relay-index.csv",
      detail: "Owner FIELD-12 / action gap reference",
      status: "Review",
      tone: "warning" as const,
      action: <Button size="sm" tone="muted" ghost>Queue</Button>,
    },
  ];
  const densityLabelCopy = {
    compact: "Tightest rhythm",
    default: "Balanced baseline",
    roomy: "Most open rhythm",
  } as const;

  return (
    <main className="flex w-full flex-col gap-8 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <CommandHeader
        badge={<Badge tone="primary">Component Deck</Badge>}
        eyebrow="Framework Surface Index"
        title="Inspect the primitives as a working catalog, not as isolated snippets."
        description="This page exists to validate sizes, tones, states, and compositional fit before future releases expand the contract."
        metaItems={[
          { label: "New primitives", value: "Textarea / Checkbox / Switch / Tabs / Tooltip" },
          { label: "Stable base", value: "Button / Input / Select / Panel / Dialog / Toast" },
          { label: "Intent", value: "Catalog + test bed + adoption reference" },
        ]}
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <FilterStrip
          eyebrow="Controls"
          title="Inputs and toggles"
          description="The same semantic props now cover single-line fields, long-form inputs, boolean toggles, and guided selection."
          shortcuts={
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
              Inspect
              <Badge tone="warning">0.1.0</Badge>
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
              options={[
                { value: "active", label: "Active lane" },
                { value: "review", label: "Review lane" },
                { value: "archive", label: "Archive lane" },
              ]}
            />
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
              options={[
                { value: "blocked", label: "Blocked" },
                { value: "review", label: "Review" },
                { value: "approved", label: "Approved" },
              ]}
            />
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
            <Panel tone="primary" density="compact" className="gap-4 lg:col-span-2">
              <p className="u-mono-label text-primary">RadioGroup</p>
              <div className="grid gap-6 lg:grid-cols-2">
                <RadioGroup name="relay-mode" defaultValue="standard" tone="primary">
                  <RadioGroupItem value="standard" description="Default operational routing.">
                    Standard relay
                  </RadioGroupItem>
                  <RadioGroupItem value="stealth" description="Low-signature packet routing.">
                    Stealth relay
                  </RadioGroupItem>
                  <RadioGroupItem value="burst" description="High-bandwidth burst transmission.">
                    Burst relay
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup
                  name="approval"
                  defaultValue="review"
                  tone="danger"
                  orientation="vertical"
                >
                  <RadioGroupItem value="blocked" disabled description="Approval chain incomplete.">
                    Blocked
                  </RadioGroupItem>
                  <RadioGroupItem value="review">Under review</RadioGroupItem>
                  <RadioGroupItem value="approved" disabled>
                    Approved
                  </RadioGroupItem>
                </RadioGroup>
              </div>
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
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="grid gap-2">
            <p className="u-mono-label text-primary">Field Size Lab</p>
            <p className="max-w-3xl text-sm leading-7 text-muted">
              Input, Select, and Textarea now share a full `xs` to `xl` ladder.
              This lab keeps content constant so the size changes stay visible in both native and wrapped modes.
            </p>
          </div>
          <Badge tone="primary">FieldSize xs-sm-md-lg-xl</Badge>
        </div>

        <Panel tone="primary" className="gap-5">
          <div className="grid gap-2">
            <p className="u-mono-label text-primary">Bare fields</p>
            <p className="text-sm leading-6 text-muted">
              Native field chrome only. Same copy, same options, same placeholder, different scale.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <Panel tone="muted" density="compact" className="gap-4">
              <p className="u-mono-label text-primary">Input</p>
              {fieldSizes.map((size) => (
                <div key={`bare-input-${size}`} className="grid gap-2">
                  <p className="u-mono-label text-muted">{size}</p>
                  <Input
                    aria-label={`Bare input ${size}`}
                    size={size}
                    placeholder="Track relay or operator"
                  />
                </div>
              ))}
            </Panel>

            <Panel tone="muted" density="compact" className="gap-4">
              <p className="u-mono-label text-warning">Select</p>
              {fieldSizes.map((size) => (
                <div key={`bare-select-${size}`} className="grid gap-2">
                  <p className="u-mono-label text-muted">{size}</p>
                  <Select
                    aria-label={`Bare select ${size}`}
                    size={size}
                    defaultValue="active"
                    options={fieldOptions}
                  />
                </div>
              ))}
            </Panel>

            <Panel tone="muted" density="compact" className="gap-4">
              <p className="u-mono-label text-success">Textarea</p>
              {fieldSizes.map((size) => (
                <div key={`bare-textarea-${size}`} className="grid gap-2">
                  <p className="u-mono-label text-muted">{size}</p>
                  <Textarea
                    aria-label={`Bare textarea ${size}`}
                    size={size}
                    placeholder="Extended operator note"
                  />
                </div>
              ))}
            </Panel>
          </div>
        </Panel>

        <Panel tone="warning" className="gap-5">
          <div className="grid gap-2">
            <p className="u-mono-label text-warning">Wrapped fields</p>
            <p className="text-sm leading-6 text-muted">
              Same ladder, but through the actual product shell: inset label, prefix, helper copy, and textarea rhythm.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <Panel tone="muted" density="compact" className="gap-4">
              <p className="u-mono-label text-primary">Input shell</p>
              {fieldSizes.map((size) => (
                <div key={`wrapped-input-${size}`} className="grid gap-2">
                  <p className="u-mono-label text-muted">{size}</p>
                  <Input
                    aria-label={`Wrapped input ${size}`}
                    size={size}
                    insetLabel="Query"
                    prefix={<FileSearch />}
                    placeholder="Track relay or operator"
                    hint="Shared hint copy for shell comparison."
                  />
                </div>
              ))}
            </Panel>

            <Panel tone="muted" density="compact" className="gap-4">
              <p className="u-mono-label text-warning">Select shell</p>
              {fieldSizes.map((size) => (
                <div key={`wrapped-select-${size}`} className="grid gap-2">
                  <p className="u-mono-label text-muted">{size}</p>
                  <Select
                    aria-label={`Wrapped select ${size}`}
                    size={size}
                    insetLabel="Lane"
                    prefix={<Activity />}
                    defaultValue="active"
                    hint="Chevron, prefix, and text should keep one optical line."
                    options={fieldOptions}
                  />
                </div>
              ))}
            </Panel>

            <Panel tone="muted" density="compact" className="gap-4">
              <p className="u-mono-label text-success">Textarea shell</p>
              {fieldSizes.map((size) => (
                <div key={`wrapped-textarea-${size}`} className="grid gap-2">
                  <p className="u-mono-label text-muted">{size}</p>
                  <Textarea
                    aria-label={`Wrapped textarea ${size}`}
                    size={size}
                    insetLabel="Operator note"
                    prefix={<Bell />}
                    placeholder="Extended operator note"
                    hint="Same copy, different shell rhythm."
                  />
                </div>
              ))}
            </Panel>
          </div>
        </Panel>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel tone="success" density="compact" className="gap-5">
            <div className="grid gap-2">
              <p className="u-mono-label text-success">State and density</p>
              <p className="text-sm leading-6 text-muted">
                Density should adjust rhythm, not erase the scale. Warning, error, and disabled states should remain legible at larger sizes.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="grid gap-4">
                <p className="u-mono-label text-primary">Density sweep</p>
                {densityModes.map((density) => (
                  <Input
                    key={`density-field-${density}`}
                    aria-label={`Density ${density} input`}
                    size="lg"
                    density={density}
                    insetLabel={density.toUpperCase()}
                    prefix={<FileSearch />}
                    placeholder="Search relay"
                    hint="Compare spacing without changing scale."
                  />
                ))}
              </div>

              <div className="grid gap-4">
                <p className="u-mono-label text-warning">State sweep</p>
                <Input
                  aria-label="State warning input"
                  size="xl"
                  insetLabel="Warning"
                  prefix={<Info />}
                  state="warning"
                  placeholder="Review before routing"
                  message="Warning should stay visible at xl."
                />
                <Select
                  aria-label="State error select"
                  size="xl"
                  insetLabel="Approval"
                  prefix={<Shield />}
                  invalid
                  message="Error state should keep the same field shell geometry."
                  defaultValue="review"
                  options={fieldOptions}
                />
                <Textarea
                  aria-label="State disabled textarea"
                  size="lg"
                  insetLabel="Disabled"
                  disabled
                  defaultValue="Awaiting upstream confirmation."
                />
              </div>
            </div>
          </Panel>

          <Panel tone="muted" density="compact" className="gap-5">
            <div className="grid gap-2">
              <p className="u-mono-label text-primary">Contract note</p>
              <p className="text-sm leading-6 text-muted">
                The field family now has one explicit public ladder: `xs`, `sm`, `md`, `lg`, `xl`.
                The demo keeps placeholder, label, prefix, and helper copy stable so visual differences can be judged at a glance.
              </p>
            </div>

            <div className="grid gap-4">
              <Input
                aria-label="Contract reference input"
                size="md"
                insetLabel="Reference"
                prefix={<FileSearch />}
                placeholder="Use md as the baseline reading size."
                hint="All other field sizes should read as a clear step away from this baseline."
              />
              <div className="flex flex-wrap gap-3">
                {fieldSizes.map((size) => (
                  <Badge key={`field-contract-${size}`} tone="primary">
                    {size}
                  </Badge>
                ))}
              </div>
            </div>
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

      <Panel className="gap-6">
        <div className="grid gap-2">
          <p className="u-mono-label text-primary">Panel Size Matrix</p>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            Panels accept a size prop that controls geometry, corner cut, and minimum height.
            When empty, they switch to a dashed placeholder treatment automatically.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <Panel tone="primary" size="sm">
            <p className="u-mono-label text-primary">Small</p>
            <p className="text-sm leading-6 text-muted">
              Compact footprint for secondary panels, sidebar cards, or metadata slots.
            </p>
          </Panel>
          <Panel tone="success" size="md">
            <p className="u-mono-label text-success">Medium</p>
            <p className="text-sm leading-6 text-muted">
              Default surface used across most dashboard contexts. Balanced padding and min-height.
            </p>
          </Panel>
          <Panel tone="warning" size="lg">
            <p className="u-mono-label text-warning">Large</p>
            <p className="text-sm leading-6 text-muted">
              Hero-grade containers for primary data views, mission briefings, or highlight regions.
            </p>
          </Panel>
        </div>

        <div className="grid gap-2">
          <p className="u-mono-label text-danger">Empty State</p>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            Empty panels render a dashed border and transparent background, signaling an unfilled slot.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <Panel tone="primary" size="sm" />
          <Panel tone="success" size="md" />
          <Panel tone="warning" size="lg" />
        </div>
      </Panel>

      <Panel className="gap-6">
        <div className="grid gap-2">
          <p className="u-mono-label text-primary">Variant Completion</p>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            v0.4 closes the remaining size gaps so micro-actions, compact forms, and hero-grade
            calls to action all stay inside the same semantic contract.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel tone="primary" density="compact" className="gap-4">
            <p className="u-mono-label text-primary">Button sizes</p>
            <div className="flex flex-wrap gap-3">
              {visualSizes.map((size) => (
                <Button key={size} tone="primary" size={size}>
                  {size.toUpperCase()} action
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {visualSizes.map((size) => (
                <Button
                  key={`icon-${size}`}
                  tone="warning"
                  size={size}
                  iconOnly
                  aria-label={`${size} icon action`}
                >
                  <Bell className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </Panel>

          <Panel tone="warning" density="compact" className="gap-4">
            <p className="u-mono-label text-warning">Badge sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              {badgeSizes.map((size) => (
                <Badge key={size} tone="warning" size={size}>
                  {size}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {visualSizes.map((size) => (
                <Kbd key={`variant-kbd-${size}`} size={size}>
                  {size.toUpperCase()}
                </Kbd>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel tone="primary" density="compact" className="gap-4">
            <p className="u-mono-label text-primary">Control sizes</p>
            <div className="grid gap-4">
              {visualSizes.map((size) => (
                <Panel key={`controls-${size}`} tone="muted" density="compact" className="gap-3">
                  <p className="u-mono-label text-primary">{size}</p>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <Checkbox size={size}>Checkpoint sync</Checkbox>
                    <Switch size={size} label={`${size.toUpperCase()} monitor`} defaultChecked />
                    <RadioGroup
                      name={`control-size-${size}`}
                      size={size}
                      defaultValue="primary"
                      orientation="horizontal"
                    >
                      <RadioGroupItem value="primary">Primary</RadioGroupItem>
                      <RadioGroupItem value="fallback">Fallback</RadioGroupItem>
                    </RadioGroup>
                  </div>
                </Panel>
              ))}
            </div>
          </Panel>

          <Panel tone="warning" density="compact" className="gap-4">
            <p className="u-mono-label text-warning">Tabs sizes</p>
            <div className="grid gap-4">
              {visualSizes.map((size) => (
                <Tabs
                  key={`tabs-${size}`}
                  defaultValue="signal"
                  size={size}
                  tone={size === "xl" ? "warning" : "primary"}
                >
                  <TabsList>
                    <TabsTrigger value="signal">{size.toUpperCase()}</TabsTrigger>
                    <TabsTrigger value="relay">Relay</TabsTrigger>
                  </TabsList>
                  <TabsPanel value="signal">
                    <p className="text-sm leading-6 text-muted">
                      Trigger height, internal padding, and panel rhythm scale with <strong>{size}</strong>.
                    </p>
                  </TabsPanel>
                  <TabsPanel value="relay">
                    <p className="text-sm leading-6 text-muted">
                      Shared metadata stays stable while the visual ladder changes.
                    </p>
                  </TabsPanel>
                </Tabs>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel tone="success" density="compact" className="gap-4">
            <p className="u-mono-label text-success">Overlay sizes</p>
            <div className="flex flex-wrap gap-3">
              {visualSizes.map((size) => (
                <Tooltip
                  key={`tooltip-${size}`}
                  size={size}
                  tone="primary"
                  content={`${size.toUpperCase()} tooltip spacing and copy width`}
                >
                  <Button size="sm" tone="primary" ghost>
                    {size.toUpperCase()} tip
                  </Button>
                </Tooltip>
              ))}
            </div>
            <div className="grid gap-3">
              {visualSizes.map((size) => (
                <Toast
                  key={`toast-${size}`}
                  size={size}
                  tone={size === "xs" ? "muted" : size === "xl" ? "warning" : "success"}
                  title={`${size.toUpperCase()} relay notice`}
                  description="Toast sizing changes width, padding, and the content hierarchy without changing tone semantics."
                  showProgress={false}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {visualSizes.map((size) => (
                <Button
                  key={`dialog-${size}`}
                  size="sm"
                  tone="warning"
                  ghost
                  onClick={() => setDialogSize(size)}
                >
                  Open {size.toUpperCase()} dialog
                </Button>
              ))}
            </div>
          </Panel>

          <Panel tone="danger" density="compact" className="gap-4">
            <p className="u-mono-label text-danger">Kbd and Dropzone sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              {visualSizes.map((size) => (
                <Kbd key={`kbd-${size}`} size={size}>
                  {size.toUpperCase()}
                </Kbd>
              ))}
            </div>
            <div className="grid gap-4">
              {(["xs", "md", "xl"] as const).map((size) => (
                <Dropzone
                  key={`dropzone-${size}`}
                  size={size}
                  tone={size === "xl" ? "warning" : "primary"}
                  state={size === "xs" ? "default" : "active"}
                  eyebrow={`${size.toUpperCase()} upload`}
                  title={`${size.toUpperCase()} payload lane`}
                  description="Dropzone padding, copy hierarchy, and sidecar action area all scale with size."
                  hint="PNG, PDF, TAR"
                  icon={<Upload className="h-5 w-5" />}
                  status={<Badge tone="success">Ready</Badge>}
                  actions={<Button size="sm">Browse</Button>}
                >
                  <p className="text-sm leading-6 text-muted">
                    Operators can inspect the upload contract without guessing which sizes are actually supported.
                  </p>
                </Dropzone>
              ))}
            </div>
          </Panel>
        </div>
      </Panel>

      </div>

      <section className="mx-auto w-full max-w-[112rem] px-4 sm:px-6 lg:px-8">
        <Panel className="gap-6">
          <div className="grid gap-2">
            <p className="u-mono-label text-primary">Density Sweep</p>
            <p className="max-w-3xl text-sm leading-7 text-muted">
              Compact, default, and roomy now behave as first-class presentation choices across
              primitives and compositions instead of existing only on select surfaces.
            </p>
          </div>

          <div className="hidden items-start gap-4 xl:grid xl:grid-cols-[14rem_repeat(3,minmax(0,1fr))]">
            <div />
            {densityModes.map((density) => (
              <div
                key={`density-header-${density}`}
                className="grid gap-1 rounded-md border border-border/60 bg-background/35 px-4 py-3"
              >
                <p className="u-mono-label text-primary">{density}</p>
                <p className="text-sm leading-6 text-muted">{densityLabelCopy[density]}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8">
            <div className="grid items-start gap-4 xl:grid-cols-[14rem_repeat(3,minmax(0,1fr))]">
              <div className="grid gap-2 xl:pt-3">
                <p className="u-mono-label text-primary">Primitive baseline</p>
                <p className="text-sm leading-6 text-muted">
                  One compact control stack to compare base rhythm before heavier compositions.
                </p>
              </div>
              {densityModes.map((density) => (
                <div key={`baseline-${density}`} className="grid min-w-0 gap-4">
                  <div className="grid gap-1 xl:hidden">
                    <p className="u-mono-label text-primary">{density}</p>
                    <p className="text-sm leading-6 text-muted">{densityLabelCopy[density]}</p>
                  </div>
                  <Shell density={density} className="grid gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button tone="primary" density={density} size="sm">Action</Button>
                      <Badge tone="success" size="sm">Live</Badge>
                      <Kbd>F</Kbd>
                    </div>
                    <Divider />
                    <Input
                      aria-label={`${density} density query`}
                      density={density}
                      insetLabel="Query"
                      placeholder="Search relay"
                    />
                    <Checkbox density={density}>Track this route</Checkbox>
                    <Switch density={density} label="Relay monitor" defaultChecked />
                  </Shell>
                </div>
              ))}
            </div>

            <div className="grid items-start gap-4 border-t border-border/60 pt-6 xl:grid-cols-[14rem_repeat(3,minmax(0,1fr))]">
              <div className="grid gap-2 xl:pt-3">
                <p className="u-mono-label text-primary">Header and controls</p>
                <p className="text-sm leading-6 text-muted">
                  Compare title rhythm first, then the filter body and control spacing below it.
                </p>
              </div>
              {densityModes.map((density) => (
                <div key={`header-controls-${density}`} className="grid min-w-0 gap-4">
                  <div className="grid gap-1 xl:hidden">
                    <p className="u-mono-label text-primary">{density}</p>
                    <p className="text-sm leading-6 text-muted">{densityLabelCopy[density]}</p>
                  </div>
                  <CommandHeader
                    density={density}
                    eyebrow="Header spacing"
                    title={`${density} command rhythm`}
                    description="Spacing changes should stay structural, not decorative."
                    actions={<Button size="sm">Queue</Button>}
                    metaItems={[{ label: "Density", value: density }]}
                  />
                  <FilterStrip
                    density={density}
                    eyebrow="Header + controls"
                    title="Lane filters"
                    description="Header spacing and controls rhythm should visibly scale."
                    shortcuts={
                      <div className="flex flex-wrap gap-2">
                        <Badge tone="primary" size="xs">Header spacing</Badge>
                        <Badge tone="muted" size="xs">Controls rhythm</Badge>
                      </div>
                    }
                  >
                    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                      <Input
                        aria-label={`${density} filter query`}
                        size="xs"
                        insetLabel="Query"
                        placeholder="Search relay"
                      />
                      <Select
                        aria-label={`${density} filter lane`}
                        size="xs"
                        insetLabel="Lane"
                        defaultValue="active"
                        options={fieldOptions}
                      />
                      <Button size="sm" tone="muted" ghost>
                        Apply
                      </Button>
                    </div>
                  </FilterStrip>
                </div>
              ))}
            </div>

            <div className="grid items-start gap-4 border-t border-border/60 pt-6 xl:grid-cols-[14rem_repeat(3,minmax(0,1fr))]">
              <div className="grid gap-2 xl:pt-3">
                <p className="u-mono-label text-primary">Metric cards</p>
                <p className="text-sm leading-6 text-muted">
                  The same three stats should show card padding and value hierarchy changes immediately.
                </p>
              </div>
              {densityModes.map((density) => (
                <div key={`metrics-${density}`} className="grid min-w-0 gap-4">
                  <div className="grid gap-1 xl:hidden">
                    <p className="u-mono-label text-primary">{density}</p>
                    <p className="text-sm leading-6 text-muted">{densityLabelCopy[density]}</p>
                  </div>
                  <StatGrid
                    density={density}
                    items={densityStatItems}
                    className="oh-density-sweep__metric-grid"
                  />
                </div>
              ))}
            </div>

            <div className="grid items-start gap-4 border-t border-border/60 pt-6 xl:grid-cols-[14rem_repeat(3,minmax(0,1fr))]">
              <div className="grid gap-2 xl:pt-3">
                <p className="u-mono-label text-primary">List rhythm</p>
                <p className="text-sm leading-6 text-muted">
                  Feed and queue stay paired so item spacing reads as one family across densities.
                </p>
              </div>
              {densityModes.map((density) => (
                <div key={`lists-${density}`} className="grid min-w-0 gap-4">
                  <div className="grid gap-1 xl:hidden">
                    <p className="u-mono-label text-primary">{density}</p>
                    <p className="text-sm leading-6 text-muted">{densityLabelCopy[density]}</p>
                  </div>
                  <ActivityFeed
                    density={density}
                    eyebrow="Item rhythm"
                    title="Signals"
                    items={densityFeedItems}
                  />
                  <MissionQueue
                    density={density}
                    eyebrow="Queue spacing"
                    title="Queue"
                    badge={<Badge tone="primary" size="xs">item rhythm</Badge>}
                    items={densityQueueItems}
                  />
                </div>
              ))}
            </div>

            <div className="grid items-start gap-4 border-t border-border/60 pt-6 xl:grid-cols-[14rem_repeat(3,minmax(0,1fr))]">
              <div className="grid gap-2 xl:pt-3">
                <p className="u-mono-label text-primary">Detail surface</p>
                <p className="text-sm leading-6 text-muted">
                  The inspector closes the sweep with body and footer spacing only.
                </p>
              </div>
              {densityModes.map((density) => (
                <div key={`inspector-${density}`} className="grid min-w-0 gap-4">
                  <div className="grid gap-1 xl:hidden">
                    <p className="u-mono-label text-primary">{density}</p>
                    <p className="text-sm leading-6 text-muted">{densityLabelCopy[density]}</p>
                  </div>
                  <InspectorPanel
                    density={density}
                    title="Inspector"
                    eyebrow="Footer spacing"
                    footer={
                      <div className="flex flex-wrap gap-3">
                        <Button size="sm">Promote</Button>
                        <Button size="sm" tone="muted" ghost>Close</Button>
                      </div>
                    }
                  >
                    <div className="grid gap-3">
                      <p className="u-mono-label text-primary">Body spacing</p>
                      <p className="text-sm leading-6 text-muted">
                        Footer spacing, body rhythm, and header separation should all respond to the same density selection.
                      </p>
                    </div>
                  </InspectorPanel>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <Panel className="gap-6">
          <div className="grid gap-2">
            <p className="u-mono-label text-primary">State Audit</p>
            <p className="max-w-3xl text-sm leading-7 text-muted">
              Disabled, loading, warning, and error paths should stay legible whether the state is
              applied directly or inherited through a disabled fieldset.
            </p>
          </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Panel tone="primary" density="compact" className="gap-4">
            <p className="u-mono-label text-primary">Button states</p>
            <Button tone="primary" loading>Encrypting payload</Button>
            <Button tone="muted" disabled>Disabled action</Button>
            <Button tone="warning" ghost>
              <Info className="h-4 w-4" />
              Review state
            </Button>
          </Panel>

          <Panel tone="warning" density="compact" className="gap-4">
            <p className="u-mono-label text-warning">Field states</p>
            <Input
              aria-label="Error field"
              insetLabel="Compromised"
              invalid
              message="This route needs manual review."
            />
            <Select
              aria-label="Warning field"
              insetLabel="Escalation"
              state="warning"
              defaultValue="review"
              options={[
                { value: "review", label: "Review lane" },
                { value: "hold", label: "Hold lane" },
              ]}
            />
            <Textarea
              aria-label="Disabled field"
              insetLabel="Readonly handoff"
              disabled
              defaultValue="Awaiting upstream confirmation."
            />
          </Panel>

          <Panel tone="danger" density="compact" className="gap-4">
            <p className="u-mono-label text-danger">Fieldset cascade</p>
            <fieldset disabled className="grid gap-4 border border-border/60 p-4">
              <Input
                aria-label="Cascade input"
                insetLabel="Inherited disable"
                placeholder="This should dim without local props."
              />
              <Checkbox>Inherited checkbox</Checkbox>
              <Switch label="Inherited switch" defaultChecked />
            </fieldset>
            <p className="text-sm leading-6 text-muted">
              Wrapper chrome should dim when the browser disables descendants through fieldset
              inheritance, not only when each child gets a local prop.
            </p>
          </Panel>
        </div>
      </Panel>

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

      <Dialog
        open={dialogSize !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogSize(null);
          }
        }}
        size={dialogSize ?? "md"}
        tone="warning"
        title={`${(dialogSize ?? "md").toUpperCase()} secure overlay`}
        description="Dialog sizing now affects width, header rhythm, and copy hierarchy instead of being a no-op."
        footer={
          <div className="flex flex-wrap gap-3">
            <Button size="sm" tone="warning">
              Confirm route
            </Button>
            <Button size="sm" tone="muted" ghost onClick={() => setDialogSize(null)}>
              Cancel
            </Button>
          </div>
        }
      >
        <p className="text-sm leading-6 text-muted">
          The overlay keeps the same semantic contract while changing its visual scale from
          compact review prompts to broader briefing surfaces.
        </p>
      </Dialog>
      </div>
    </main>
  );
}
