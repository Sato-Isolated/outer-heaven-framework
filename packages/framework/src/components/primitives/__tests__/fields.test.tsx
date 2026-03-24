import { render, screen } from "@testing-library/react";
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

    expect(select).toHaveAttribute("data-state", "warning");
    expect(select).toHaveAttribute("data-tone", "warning");
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
});
