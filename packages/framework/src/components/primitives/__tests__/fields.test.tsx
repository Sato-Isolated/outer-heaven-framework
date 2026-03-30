import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Input } from "../input";
import { Select } from "../select";
import { Textarea } from "../textarea";

describe("Fields", () => {
  /* ─── Input ─── */

  it("promotes invalid inputs to the error state", () => {
    render(<Input invalid aria-label="Access key" />);

    const input = screen.getByRole("textbox", { name: "Access key" });

    expect(input).toHaveClass("od-input");
    expect(input).toHaveAttribute("data-state", "error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-tone", "danger");
  });

  it("renders input chrome helpers for prefix, inset labels, and messages", () => {
    render(
      <Input
        aria-label="Payload query"
        prefix={<span aria-hidden="true">/</span>}
        insetLabel="Query"
        hint="Search by filename."
        message="Invalid route."
        invalid
      />,
    );

    expect(screen.getByText("Query")).toHaveClass("od-field-label");
    expect(screen.getByText("/").parentElement).toHaveClass("od-field-adornment");
    expect(screen.getByText("/").closest(".od-field-control")).toHaveAttribute(
      "data-control-kind",
      "input",
    );
    expect(document.querySelector(".od-field-body")).not.toBeNull();
    expect(screen.getByText("Search by filename.")).toHaveClass("od-field-hint");
    expect(screen.getByText("Invalid route.")).toHaveClass("od-field-message");
  });

  it("propagates size metadata to bare and wrapped field shells, including xl", () => {
    render(
      <div>
        <Input aria-label="Bare xl input" size="xl" />
        <Input
          aria-label="Wrapped xl input"
          size="xl"
          insetLabel="Wrapped input"
          prefix={<span aria-hidden="true">/</span>}
        />
        <Select
          aria-label="Wrapped xl select"
          size="xl"
          insetLabel="Wrapped select"
          options={[{ value: "alpha", label: "Alpha" }]}
        />
        <Textarea
          aria-label="Wrapped xs textarea"
          size="xs"
          insetLabel="Wrapped textarea"
        />
      </div>,
    );

    expect(screen.getByRole("textbox", { name: "Bare xl input" })).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("textbox", { name: "Wrapped xl input" })).toHaveAttribute("data-size", "xl");
    expect(screen.getByRole("textbox", { name: "Wrapped xl input" }).closest(".od-field")).toHaveAttribute(
      "data-size",
      "xl",
    );
    expect(screen.getByRole("textbox", { name: "Wrapped xl input" }).closest(".od-field-control")).toHaveAttribute(
      "data-size",
      "xl",
    );
    expect(screen.getByRole("combobox", { name: "Wrapped xl select" }).closest(".od-field")).toHaveAttribute(
      "data-size",
      "xl",
    );
    expect(screen.getByRole("textbox", { name: "Wrapped xs textarea" }).closest(".od-field-control")).toHaveAttribute(
      "data-size",
      "xs",
    );
  });

  /* ─── Textarea ─── */

  it("renders textarea chrome helpers and invalid state", () => {
    render(
      <Textarea
        aria-label="Operator note"
        prefix={<span aria-hidden="true">/</span>}
        insetLabel="Note"
        hint="Extended mission copy."
        message="Field review required."
        invalid
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Operator note" });

    expect(textarea).toHaveClass("od-textarea");
    expect(textarea).toHaveAttribute("data-state", "error");
    expect(textarea).toHaveAttribute("data-tone", "danger");
    expect(textarea.closest(".od-field-control")).toHaveAttribute(
      "data-control-kind",
      "textarea",
    );
    expect(textarea.closest(".od-field-control")?.querySelector(".od-field-body")).not.toBeNull();
    expect(screen.getByText("Note")).toHaveClass("od-field-label");
    expect(screen.getByText("Extended mission copy.")).toHaveClass("od-field-hint");
  });

  /* ─── Select ─── */

  it("supports select warning and disabled states", () => {
    render(
      <Select
        aria-label="Relay sector"
        state="warning"
        disabled
        insetLabel="Sector"
        options={[{ value: "north", label: "North" }]}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Relay sector" });

    expect(select).toHaveAttribute("data-state", "disabled");
    expect(select).toHaveAttribute("data-tone", "muted");
    expect(select).toBeDisabled();
  });

  it("renders select chrome helpers with a stable indicator shell", () => {
    render(
      <Select
        aria-label="Priority lane"
        prefix={<span aria-hidden="true">/</span>}
        insetLabel="Lane"
        hint="Selection shell"
        options={[{ value: "active", label: "Active" }]}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Priority lane" });

    expect(select.closest(".od-field-control")).toHaveAttribute(
      "data-control-kind",
      "select",
    );
    expect(select.closest(".od-field-control")?.querySelector(".od-field-body")).not.toBeNull();
    expect(select.closest(".od-field-control")?.querySelector(".od-field-adornment[data-slot=\"indicator\"]")).not.toBeNull();
  });

  /* ─── aria-describedby & aria-required ─── */

  it("wires aria-describedby to hint and message on Input", () => {
    render(
      <Input
        aria-label="Mission code"
        hint="Alpha-numeric only."
        message="Code invalid."
        invalid
      />,
    );

    const input = screen.getByRole("textbox", { name: "Mission code" });
    const describedBy = input.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    const ids = describedBy!.split(" ");
    // message ID comes first, hint ID second
    expect(ids).toHaveLength(2);
    expect(document.getElementById(ids[0])).toHaveTextContent("Code invalid.");
    expect(document.getElementById(ids[1])).toHaveTextContent("Alpha-numeric only.");
  });

  it("sets aria-required on Input when required", () => {
    render(<Input aria-label="Callsign" required />);

    const input = screen.getByRole("textbox", { name: "Callsign" });
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("wires aria-describedby to hint and message on Textarea", () => {
    render(
      <Textarea
        aria-label="Briefing"
        hint="Keep it brief."
        message="Too short."
        invalid
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Briefing" });
    const describedBy = textarea.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    const ids = describedBy!.split(" ");
    expect(ids).toHaveLength(2);
    expect(document.getElementById(ids[0])).toHaveTextContent("Too short.");
    expect(document.getElementById(ids[1])).toHaveTextContent("Keep it brief.");
  });

  it("sets aria-required on Textarea when required", () => {
    render(<Textarea aria-label="Briefing" required />);

    const textarea = screen.getByRole("textbox", { name: "Briefing" });
    expect(textarea).toHaveAttribute("aria-required", "true");
  });

  it("wires aria-describedby on Select trigger when in chrome mode", () => {
    render(
      <Select
        aria-label="Priority"
        hint="Choose wisely."
        message="Required."
        invalid
        options={[{ value: "a", label: "Alpha" }]}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Priority" });
    const describedBy = select.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    const ids = describedBy!.split(" ");
    expect(ids).toHaveLength(2);
    expect(document.getElementById(ids[0])).toHaveTextContent("Required.");
    expect(document.getElementById(ids[1])).toHaveTextContent("Choose wisely.");
  });

  it("sets aria-required on Select trigger when required", () => {
    render(
      <Select
        aria-label="Zone"
        required
        options={[{ value: "a", label: "Alpha" }]}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Zone" });
    expect(select).toHaveAttribute("aria-required", "true");
  });

  it("does not set aria-describedby in bare mode (no chrome)", () => {
    render(
      <Input aria-label="Bare input" />,
    );

    const input = screen.getByRole("textbox", { name: "Bare input" });
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("supports controlled input updates", () => {
    function ControlledInputHarness() {
      const [value, setValue] = useState("alpha");

      return (
        <>
          <Input
            aria-label="Controlled input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <p>{value}</p>
        </>
      );
    }

    render(<ControlledInputHarness />);

    const input = screen.getByRole("textbox", { name: "Controlled input" });
    fireEvent.change(input, { target: { value: "bravo" } });

    expect(input).toHaveValue("bravo");
    expect(screen.getByText("bravo")).toBeInTheDocument();
  });

  it("supports uncontrolled textarea updates", () => {
    render(<Textarea aria-label="Uncontrolled textarea" defaultValue="Seed" />);

    const textarea = screen.getByRole("textbox", { name: "Uncontrolled textarea" });
    fireEvent.change(textarea, { target: { value: "Expanded note" } });

    expect(textarea).toHaveValue("Expanded note");
  });

  it("supports controlled and uncontrolled select modes", () => {
    Element.prototype.scrollIntoView = vi.fn();

    function ControlledSelectHarness() {
      const [value, setValue] = useState("alpha");

      return (
        <>
          <Select
            aria-label="Controlled select"
            value={value}
            onValueChange={setValue}
            options={[
              { value: "alpha", label: "Alpha" },
              { value: "bravo", label: "Bravo" },
            ]}
          />
          <p>{value}</p>
        </>
      );
    }

    render(
      <div>
        <Select
          aria-label="Uncontrolled select"
          defaultValue="alpha"
          options={[
            { value: "alpha", label: "Alpha" },
            { value: "bravo", label: "Bravo" },
          ]}
        />
        <ControlledSelectHarness />
      </div>,
    );

    const uncontrolled = screen.getByRole("combobox", { name: "Uncontrolled select" });
    fireEvent.click(uncontrolled);
    fireEvent.mouseDown(screen.getByRole("option", { name: "Bravo" }));
    expect(uncontrolled).toHaveTextContent("Bravo");

    const controlled = screen.getByRole("combobox", { name: "Controlled select" });
    fireEvent.click(controlled);
    fireEvent.mouseDown(screen.getAllByRole("option", { name: "Bravo" })[0]);
    expect(controlled).toHaveTextContent("Bravo");
    expect(screen.getByText("bravo")).toBeInTheDocument();
  });
});
