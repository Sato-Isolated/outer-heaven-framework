import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Checkbox } from "../checkbox";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Switch } from "../switch";

describe("Controls", () => {
  /* ─── Checkbox ─── */

  it("renders checkbox with public od contract and invalid semantics", () => {
    render(
      <Checkbox invalid description="Description copy.">
        Require approval
      </Checkbox>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Require approval" });

    expect(checkbox).toHaveClass("od-checkbox-input");
    expect(checkbox.closest(".od-checkbox")).toHaveAttribute("data-state", "error");
    expect(checkbox.closest(".od-checkbox")).toHaveAttribute("data-tone", "danger");
    expect(screen.getByText("Description copy.")).toHaveClass("od-checkbox-description");
  });

  it("toggles checkbox via label click and respects disabled", () => {
    render(
      <Checkbox defaultChecked={false} data-testid="cb">
        Accept terms
      </Checkbox>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("prevents toggle on disabled checkbox", () => {
    render(
      <Checkbox disabled defaultChecked={false}>
        Locked field
      </Checkbox>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Locked field" });

    expect(checkbox).toBeDisabled();
    expect(checkbox.closest(".od-checkbox")).toHaveAttribute("data-state", "disabled");
  });

  /* ─── Switch ─── */

  it("supports controlled switch toggling and aria semantics", () => {
    function SwitchHarness() {
      const [checked, setChecked] = useState(false);

      return (
        <Switch
          label="Live relay monitoring"
          checked={checked}
          onCheckedChange={setChecked}
          tone="success"
        />
      );
    }

    render(<SwitchHarness />);

    const toggle = screen.getByRole("switch", { name: "Live relay monitoring" });

    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle.closest(".od-switch")).toHaveAttribute("data-state", "active");
  });

  it("toggles switch via keyboard space and enter on the button", () => {
    function SwitchKeyboardHarness() {
      const [checked, setChecked] = useState(false);

      return (
        <Switch
          label="Enable relay"
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    }

    render(<SwitchKeyboardHarness />);

    const toggle = screen.getByRole("switch", { name: "Enable relay" });

    toggle.focus();

    fireEvent.keyDown(toggle, { key: " " });
    fireEvent.keyUp(toggle, { key: " " });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  /* ─── RadioGroup ─── */

  it("renders a radio group with the public od contract", () => {
    render(
      <RadioGroup name="test" defaultValue="a" tone="primary">
        <RadioGroupItem value="a">Alpha</RadioGroupItem>
        <RadioGroupItem value="b">Beta</RadioGroupItem>
      </RadioGroup>,
    );

    const group = document.querySelector(".od-radio-group");

    expect(group).not.toBeNull();
    expect(group).toHaveAttribute("role", "radiogroup");
    expect(group).toHaveAttribute("aria-orientation", "vertical");
    expect(group).toHaveAttribute("data-tone", "primary");
    expect(group).toHaveAttribute("data-orientation", "vertical");

    const radios = screen.getAllByRole("radio");

    expect(radios).toHaveLength(2);
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
  });

  it("selects radio item on click and updates state", () => {
    function RadioHarness() {
      const [value, setValue] = useState("a");

      return (
        <RadioGroup name="click-test" value={value} onValueChange={setValue}>
          <RadioGroupItem value="a">Alpha</RadioGroupItem>
          <RadioGroupItem value="b">Beta</RadioGroupItem>
        </RadioGroup>
      );
    }

    render(<RadioHarness />);

    const radios = screen.getAllByRole("radio");

    expect(radios[0]).toBeChecked();
    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  it("renders radio item with invalid state and description", () => {
    render(
      <RadioGroup name="invalid-test" defaultValue="">
        <RadioGroupItem value="x" invalid description="Must select an option.">
          Required choice
        </RadioGroupItem>
      </RadioGroup>,
    );

    const radio = screen.getByRole("radio");
    const item = radio.closest(".od-radio");

    expect(item).toHaveAttribute("data-state", "error");
    expect(item).toHaveAttribute("data-tone", "danger");
    expect(screen.getByText("Must select an option.")).toHaveClass("od-radio-description");
  });

  it("disables individual radio items and group-level disabled", () => {
    render(
      <RadioGroup name="disabled-test" defaultValue="a" disabled>
        <RadioGroupItem value="a">Alpha</RadioGroupItem>
        <RadioGroupItem value="b">Beta</RadioGroupItem>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");

    expect(radios[0]).toBeDisabled();
    expect(radios[1]).toBeDisabled();
    expect(radios[0].closest(".od-radio")).toHaveAttribute("data-state", "disabled");
  });

  it("navigates radio items with arrow keys", () => {
    render(
      <RadioGroup name="keyboard-test" defaultValue="a">
        <RadioGroupItem value="a">Alpha</RadioGroupItem>
        <RadioGroupItem value="b">Beta</RadioGroupItem>
        <RadioGroupItem value="c">Gamma</RadioGroupItem>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");

    radios[0].focus();

    fireEvent.keyDown(radios[0], { key: "ArrowDown" });
    expect(radios[1]).toHaveFocus();
    expect(radios[1]).toBeChecked();

    fireEvent.keyDown(radios[1], { key: "ArrowDown" });
    expect(radios[2]).toHaveFocus();

    fireEvent.keyDown(radios[2], { key: "ArrowDown" });
    expect(radios[0]).toHaveFocus();

    fireEvent.keyDown(radios[0], { key: "ArrowUp" });
    expect(radios[2]).toHaveFocus();
  });

  it("uses horizontal arrow keys when orientation is horizontal", () => {
    render(
      <RadioGroup name="horiz-test" defaultValue="a" orientation="horizontal">
        <RadioGroupItem value="a">Alpha</RadioGroupItem>
        <RadioGroupItem value="b">Beta</RadioGroupItem>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");

    radios[0].focus();

    fireEvent.keyDown(radios[0], { key: "ArrowRight" });
    expect(radios[1]).toHaveFocus();

    fireEvent.keyDown(radios[1], { key: "ArrowLeft" });
    expect(radios[0]).toHaveFocus();
  });
});
