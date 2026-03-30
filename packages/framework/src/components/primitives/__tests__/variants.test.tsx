import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Badge } from "../badge";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Divider } from "../divider";
import { Dialog } from "../dialog";
import { Dropzone } from "../dropzone";
import { Input } from "../input";
import { Kbd } from "../kbd";
import { Panel } from "../panel";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Select } from "../select";
import { Shell } from "../shell";
import { Switch } from "../switch";
import { Textarea } from "../textarea";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "../tabs";
import { Toast } from "../toast";
import { Tooltip } from "../tooltip";

describe("Variants", () => {
  it("supports the expanded size contracts across buttons, badges, and fields", () => {
    render(
      <div>
        <Button size="xs">Scout</Button>
        <Button size="xl">Deploy</Button>
        <Badge size="xs">XS</Badge>
        <Badge size="lg">LG</Badge>
        <Input aria-label="Input xs" size="xs" />
        <Input aria-label="Input xl shell" size="xl" insetLabel="Shell input" />
        <Select
          aria-label="Select xl"
          size="xl"
          options={[{ value: "alpha", label: "Alpha" }]}
        />
        <Textarea aria-label="Textarea xl" size="xl" />
        <Checkbox size="xl">Confirm</Checkbox>
        <Switch label="Scale switch" size="xs" />
        <RadioGroup name="variants-radio" size="lg" defaultValue="a">
          <RadioGroupItem value="a">Alpha</RadioGroupItem>
        </RadioGroup>
        <Tabs defaultValue="ops" size="xl">
          <TabsList>
            <TabsTrigger value="ops">Ops</TabsTrigger>
          </TabsList>
          <TabsPanel value="ops">Panel</TabsPanel>
        </Tabs>
        <Tooltip content="Scaled tooltip" size="xs" openDelay={0}>
          <button type="button">Tooltip trigger</button>
        </Tooltip>
        <Dialog open size="lg" title="Scaled dialog">
          Dialog body
        </Dialog>
        <Toast size="xl" title="Scaled toast" showProgress={false} />
        <Kbd size="xl">Enter</Kbd>
        <Dropzone size="xs" title="Scaled dropzone" />
      </div>,
    );

    expect(screen.getByRole("button", { name: "Scout" })).toHaveAttribute("data-size", "xs");
    expect(screen.getByRole("button", { name: "Deploy" })).toHaveAttribute("data-size", "xl");
    expect(screen.getByText("XS")).toHaveAttribute("data-size", "xs");
    expect(screen.getByText("LG")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("textbox", { name: "Input xs" })).toHaveAttribute("data-size", "xs");
    expect(screen.getByRole("textbox", { name: "Input xl shell" }).closest(".od-field")).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("combobox", { name: "Select xl" })).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("textbox", { name: "Textarea xl" })).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("checkbox", { name: "Confirm" }).closest(".od-checkbox")).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("switch", { name: "Scale switch" }).closest(".od-switch")).toHaveAttribute("data-size", "xs");
    expect(document.querySelector(".od-radio-group")).toHaveAttribute("data-size", "lg");
    expect(document.querySelector(".od-tabs")).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("tab", { name: "Ops" })).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "xl");
    expect(screen.getByText("Enter")).toHaveAttribute("data-size", "xl");
    expect(screen.getByText("Scaled dropzone").closest(".od-dropzone")).toHaveAttribute("data-size", "xs");
  });

  it("propagates density variants across primitives and surfaces", () => {
    render(
      <div>
        <Button density="roomy">Roomy action</Button>
        <Input aria-label="Compact input" density="compact" />
        <Checkbox density="roomy">Dense check</Checkbox>
        <Switch label="Dense switch" density="compact" />
        <RadioGroup name="density-group" density="roomy" defaultValue="a">
          <RadioGroupItem value="a">Alpha</RadioGroupItem>
        </RadioGroup>
        <Panel aria-label="Roomy panel" density="roomy">Panel body</Panel>
        <Shell density="roomy">Shell body</Shell>
      </div>,
    );

    expect(screen.getByRole("button", { name: "Roomy action" })).toHaveAttribute("data-density", "roomy");
    expect(screen.getByRole("textbox", { name: "Compact input" })).toHaveAttribute("data-density", "compact");
    expect(screen.getByRole("checkbox", { name: "Dense check" }).closest(".od-checkbox")).toHaveAttribute(
      "data-density",
      "roomy",
    );
    expect(screen.getByRole("switch", { name: "Dense switch" }).closest(".od-switch")).toHaveAttribute(
      "data-density",
      "compact",
    );
    expect(document.querySelector(".od-radio-group")).toHaveAttribute("data-density", "roomy");
    expect(screen.getByText("Panel body")).toHaveAttribute("data-density", "roomy");
    expect(screen.getByText("Shell body")).toHaveAttribute("data-density", "roomy");
    expect(screen.getByText("Shell body")).not.toHaveAttribute("data-size");
  });

  it("forwards refs and merges click handlers for Button asChild", () => {
    const ref = createRef<HTMLElement>();
    const childClick = vi.fn();
    const parentClick = vi.fn();

    render(
      <Button asChild ref={ref} onClick={parentClick}>
        <a href="#ops" onClick={childClick}>
          Open ops
        </a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Open ops" });
    fireEvent.click(link);

    expect(ref.current).toBe(link);
    expect(childClick).toHaveBeenCalledTimes(1);
    expect(parentClick).toHaveBeenCalledTimes(1);
  });

  it("preserves disabled cascade inside fieldsets and retains long or RTL content", () => {
    const rtl = "مهمة مراقبة طويلة";
    const longLabel = "Relay alignment corridor ".repeat(4).trim();

    render(
      <div dir="rtl">
        <fieldset disabled>
          <Input aria-label="Fieldset input" insetLabel="Disabled input" />
          <Checkbox>Disabled checkbox</Checkbox>
          <Switch label="Disabled switch" />
        </fieldset>
        <Badge>{rtl}</Badge>
        <Panel aria-label="Long content panel">{longLabel}</Panel>
        <Kbd>Ctrl</Kbd>
        <Divider orientation="vertical" />
      </div>,
    );

    expect(screen.getByRole("textbox", { name: "Fieldset input" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "Disabled checkbox" })).toBeDisabled();
    expect(screen.getByRole("switch", { name: "Disabled switch" })).toBeDisabled();
    expect(screen.getByText(rtl)).toBeInTheDocument();
    expect(screen.getByText(longLabel)).toBeInTheDocument();
    expect(screen.getByText("Ctrl")).toHaveAttribute("data-size", "sm");
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByRole("separator")).not.toHaveAttribute("data-size");
  });
});
