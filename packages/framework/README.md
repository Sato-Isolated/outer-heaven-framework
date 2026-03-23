# @outerhaven/framework

## Imports

```tsx
import {
  ActivityFeed,
  Button,
  Checkbox,
  CommandHeader,
  CommandHero,
  Dialog,
  FilterStrip,
  Input,
  InspectorPanel,
  MissionQueue,
  Select,
  StatGrid,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  ToastProvider,
  Tooltip,
  useToast,
} from "@outerhaven/framework";
import "@outerhaven/framework/styles.css";
```

## Notes

- `ghost`, `iconOnly`, and `asChild` are stable for `Button` in v1
- `iconOnly` requires an accessible name
- `Dialog` handles focus trap and focus restoration
- `ToastProvider` handles explicit dismissal and pause on hover
- `Tooltip` is non-modal and should stay supplemental
- `Tabs` is intentionally lightweight and optimized for compact workspace switching

## Composition layer

The package now exports reusable section patterns on top of the primitive layer:

- `CommandHero`
- `CommandHeader`
- `FilterStrip`
- `StatGrid`
- `ActivityFeed`
- `MissionQueue`
- `InspectorPanel`

Use these when an application starts rebuilding the same tactical dashboard
sections repeatedly. They are meant to reduce local page scaffolding without
creating a second design language.

## Example

```tsx
import {
  Badge,
  Button,
  CommandHeader,
  FilterStrip,
  Input,
  MissionQueue,
  ToastProvider,
} from "@outerhaven/framework";

export function Example() {
  return (
    <ToastProvider>
      <CommandHeader
        badge={<Badge tone="primary">Framework consumer</Badge>}
        eyebrow="Workspace"
        title="Mission intake"
        description="Compose exported sections before writing page-local tactical wrappers."
        actions={<Button tone="primary">Authorize</Button>}
      />
      <FilterStrip
        eyebrow="Filters"
        title="Search queue"
        description="Shared tactical control section."
      >
        <Input
          aria-label="Mission query"
          insetLabel="Query"
          placeholder="Search payloads"
        />
      </FilterStrip>
      <MissionQueue
        title="Queue preview"
        items={[
          {
            name: "Archive-17.tar",
            detail: "Owner NEST-04",
            status: "Encrypted",
            tone: "success",
          },
        ]}
      />
    </ToastProvider>
  );
}
```
