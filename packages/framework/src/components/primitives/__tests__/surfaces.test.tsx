import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";
import { Divider } from "../divider";
import { Kbd } from "../kbd";
import { Panel } from "../panel";
import { Shell } from "../shell";

describe("Surfaces", () => {
  it("passes tone and density through to panels", () => {
    render(
      <Panel tone="warning" density="compact" size="lg" aria-label="Warning panel">
        Panel body
      </Panel>,
    );

    const panel = screen.getByText("Panel body");

    expect(panel).toHaveClass("od-panel");
    expect(panel).toHaveAttribute("data-tone", "warning");
    expect(panel).toHaveAttribute("data-density", "compact");
    expect(panel).toHaveAttribute("data-size", "lg");
    expect(panel.tagName).toBe("SECTION");
  });

  it("renders unnamed panels as divs instead of unnamed sections", () => {
    render(<Panel>Unnamed panel</Panel>);

    const panel = screen.getByText("Unnamed panel");

    expect(panel).toHaveClass("od-panel");
    expect(panel.tagName).toBe("DIV");
  });

  it("renders a shell with semantic data attributes", () => {
    render(
      <Shell tone="primary" density="compact" state="active">
        Shell content
      </Shell>,
    );

    const shell = screen.getByText("Shell content");

    expect(shell).toHaveClass("od-shell");
    expect(shell).toHaveAttribute("data-tone", "primary");
    expect(shell).toHaveAttribute("data-density", "compact");
    expect(shell).toHaveAttribute("data-state", "active");
    expect(shell).not.toHaveAttribute("data-size");
  });

  it("renders badges with semantic tone metadata", () => {
    render(<Badge tone="success" size="lg">Ready</Badge>);

    const badge = screen.getByText("Ready");

    expect(badge).toHaveClass("od-badge");
    expect(badge).toHaveAttribute("data-tone", "success");
    expect(badge).toHaveAttribute("data-size", "lg");
  });

  it("supports role='status' on Badge for live-region semantics", () => {
    render(<Badge tone="danger" role="status">3 alerts</Badge>);

    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("3 alerts");
    expect(badge).toHaveClass("od-badge");
  });

  it("does not apply a role on Badge by default", () => {
    render(<Badge tone="muted">Decorative</Badge>);

    const badge = screen.getByText("Decorative");
    expect(badge).not.toHaveAttribute("role");
  });

  it("renders a kbd with the public od contract and expanded size ladder", () => {
    render(
      <div>
        <Kbd>Ctrl</Kbd>
        <Kbd size="xl">Enter</Kbd>
      </div>,
    );

    const kbd = screen.getByText("Ctrl");
    const largeKbd = screen.getByText("Enter");

    expect(kbd.tagName).toBe("KBD");
    expect(kbd).toHaveClass("od-kbd");
    expect(kbd).toHaveAttribute("data-size", "sm");
    expect(kbd).toHaveAttribute("data-state", "default");
    expect(kbd).toHaveAttribute("data-density", "default");
    expect(largeKbd).toHaveAttribute("data-size", "xl");
  });

  it("renders a horizontal divider with separator role by default", () => {
    render(<Divider />);

    const sep = screen.getByRole("separator");

    expect(sep).toHaveClass("od-divider");
    expect(sep).toHaveAttribute("aria-orientation", "horizontal");
    expect(sep).toHaveAttribute("data-orientation", "horizontal");
    expect(sep).toHaveAttribute("data-contrast", "subtle");
    expect(sep).not.toHaveAttribute("data-size");
  });

  it("renders a vertical strong divider", () => {
    render(<Divider orientation="vertical" contrast="strong" />);

    const sep = screen.getByRole("separator");

    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep).toHaveAttribute("data-orientation", "vertical");
    expect(sep).toHaveAttribute("data-contrast", "strong");
  });
});
