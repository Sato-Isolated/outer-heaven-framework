import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";
import { Button } from "../button";
import { Input } from "../input";
import { Panel } from "../panel";

describe("primitive contracts", () => {
  it("renders a button with the public od contract", () => {
    render(
      <Button tone="primary" size="lg">
        Launch
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Launch" });

    expect(button).toHaveClass("od-button");
    expect(button).toHaveAttribute("data-tone", "primary");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toHaveAttribute("data-state", "default");
    expect(button).toHaveAttribute("data-density", "default");
  });

  it("marks loading buttons as busy and disabled", () => {
    render(<Button loading>Decrypting</Button>);

    const button = screen.getByRole("button", { name: /decrypting/i });

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-state", "loading");
  });

  it("promotes invalid inputs to the error state", () => {
    render(<Input invalid aria-label="Access key" />);

    const input = screen.getByRole("textbox", { name: "Access key" });

    expect(input).toHaveClass("od-input");
    expect(input).toHaveAttribute("data-state", "error");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("passes tone and density through to panels", () => {
    render(<Panel tone="warning" density="compact">Panel body</Panel>);

    const panel = screen.getByText("Panel body");

    expect(panel).toHaveClass("od-panel");
    expect(panel).toHaveAttribute("data-tone", "warning");
    expect(panel).toHaveAttribute("data-density", "compact");
  });

  it("renders badges with semantic tone metadata", () => {
    render(<Badge tone="success">Ready</Badge>);

    const badge = screen.getByText("Ready");

    expect(badge).toHaveClass("od-badge");
    expect(badge).toHaveAttribute("data-tone", "success");
  });
});
