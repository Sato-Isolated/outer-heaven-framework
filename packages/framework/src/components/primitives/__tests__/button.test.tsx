import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
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

  it("renders ghost buttons without exposing variant props", () => {
    render(<Button ghost>Ghost action</Button>);

    const button = screen.getByRole("button", { name: "Ghost action" });

    expect(button).toHaveAttribute("data-ghost", "true");
    expect(button).not.toHaveAttribute("data-variant");
  });

  it("renders icon-only buttons with the internal icon flag and accessible name", () => {
    render(
      <Button iconOnly aria-label="Close panel">
        <span aria-hidden="true">X</span>
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Close panel" });

    expect(button).toHaveAttribute("data-icon-only", "true");
    expect(button).toHaveAttribute("aria-label", "Close panel");
  });

  it("keeps direct button icons as first-class content", () => {
    render(
      <Button tone="primary">
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="M2 8h12" />
        </svg>
        Route signal
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Route signal" });

    expect(button.querySelector("svg")).not.toBeNull();
  });

  it("supports asChild for link-style button rendering", () => {
    render(
      <Button asChild tone="primary" size="sm">
        <a href="/dashboard">Open dashboard</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Open dashboard" });

    expect(link).toHaveClass("od-button");
    expect(link).toHaveAttribute("data-tone", "primary");
    expect(link).toHaveAttribute("data-size", "sm");
  });
});
