import { render, screen } from "@testing-library/react";
import { ActivityFeed } from "../../compositions/activity-feed";
import { CommandHeader } from "../../compositions/command-header";
import { CommandHero } from "../../compositions/command-hero";
import { FilterStrip } from "../../compositions/filter-strip";
import { InspectorPanel } from "../../compositions/inspector-panel";
import { MissionQueue } from "../../compositions/mission-queue";
import { StatGrid } from "../../compositions/stat-grid";
import { Input } from "../input";

describe("Compositions", () => {
  it("renders a command hero composition with optional stamp omitted", () => {
    render(
      <CommandHero
        eyebrow="Command Interface Layer"
        title="Tactical UI for systems that need discipline, not decoration."
        description="The hero composition should render structured content without relying on page-local layout classes."
        metaItems={[
          { label: "Framework Name", value: "Outer Heaven Framework" },
          { label: "Public Layer", value: "`od-*` primitives" },
        ]}
        panel={{
          label: "Tactical Display 01",
          headline: "One visual language from shell to toast.",
          rows: [
            {
              index: "01",
              label: "Semantic Theme Map",
              detail: "Tailwind utilities resolve against tactical tokens instead of one-off color picks.",
            },
          ],
          readouts: [
            {
              value: "11",
              label: "Primitives",
              detail: "One contract across surfaces, inputs, overlays, and signals.",
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("Command Interface Layer")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Tactical UI for systems that need discipline, not decoration.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The hero composition should render structured content without relying on page-local layout classes.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Semantic Theme Map")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.queryByText("Live Contract")).not.toBeInTheDocument();
    expect(document.querySelector(".oh-command-hero")).not.toBeNull();
    expect(document.querySelector(".oh-command-hero__panel")).not.toBeNull();
  });

  it("renders the new composition layer with stable structural contracts", () => {
    render(
      <div>
        <CommandHeader
          eyebrow="Workspace"
          title="Mission intake"
          description="Composition surface"
          metaItems={[{ label: "Layer", value: "Framework" }]}
        />
        <FilterStrip eyebrow="Filters" title="Search queue" description="Shared section">
          <Input aria-label="Mission query" />
        </FilterStrip>
        <StatGrid
          items={[
            {
              label: "Queued",
              value: "18",
              detail: "Pending",
              tone: "primary",
              icon: <span aria-hidden="true">!</span>,
            },
          ]}
        />
        <ActivityFeed
          eyebrow="Feed"
          title="Signals"
          items={[{ title: "Relay sync complete", note: "Healthy", tone: "success" }]}
        />
        <MissionQueue
          title="Queue"
          items={[
            {
              name: "Archive-17.tar",
              detail: "Owner NEST-04",
              status: "Encrypted",
              tone: "success",
            },
          ]}
        />
        <InspectorPanel title="Toolkit">Inspector body</InspectorPanel>
      </div>,
    );

    expect(document.querySelector(".oh-command-header")).not.toBeNull();
    expect(document.querySelector(".oh-command-header__lead")).not.toBeNull();
    expect(document.querySelector(".oh-filter-strip")).not.toBeNull();
    expect(document.querySelector(".oh-stat-grid")).not.toBeNull();
    expect(document.querySelector(".oh-activity-feed")).not.toBeNull();
    expect(document.querySelector(".oh-mission-queue")).not.toBeNull();
    expect(document.querySelector(".oh-inspector-panel")).not.toBeNull();
    expect(document.querySelector(".oh-stat-grid__icon.oh-icon-slot")).not.toBeNull();
    expect(screen.getByText("Inspector body")).toBeInTheDocument();
  });
});
