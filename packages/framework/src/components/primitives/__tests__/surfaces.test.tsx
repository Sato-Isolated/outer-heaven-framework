import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";
import { Divider } from "../divider";
import { Kbd } from "../kbd";
import { Panel } from "../panel";
import { Shell } from "../shell";

describe("Surfaces", () => {
  /* ─── Panel ─── */

  it("passes tone and density through to panels", () => {
    render(<Panel tone="warning" density="compact">Panel body</Panel>);

    const panel = screen.getByText("Panel body");

    expect(panel).toHaveClass("od-panel");
    expect(panel).toHaveAttribute("data-tone", "warning");
    expect(panel).toHaveAttribute("data-density", "compact");
  });

  /* ─── Shell ─── */

  it("renders a shell with semantic data attributes", () => {
    render(
      <Shell tone="primary" density="compact">
        Shell content
      </Shell>,
    );

    const shell = screen.getByText("Shell content");

    expect(shell).toHaveClass("od-shell");
    expect(shell).toHaveAttribute("data-tone", "primary");
    expect(shell).toHaveAttribute("data-density", "compact");
    expect(shell).toHaveAttribute("data-state", "default");
  });

  /* ─── Badge ─── */

  it("renders badges with semantic tone metadata", () => {
    render(<Badge tone="success">Ready</Badge>);

    const badge = screen.getByText("Ready");

    expect(badge).toHaveClass("od-badge");
    expect(badge).toHaveAttribute("data-tone", "success");
  });

  /* ─── Kbd ─── */

  it("renders a kbd with the public od contract and default size", () => {
    render(<Kbd>⌘K</Kbd>);

    const kbd = screen.getByText("⌘K");

    expect(kbd.tagName).toBe("KBD");
    expect(kbd).toHaveClass("od-kbd");
    expect(kbd).toHaveAttribute("data-size", "sm");
    expect(kbd).toHaveAttribute("data-state", "default");
    expect(kbd).toHaveAttribute("data-density", "default");
  });

  /* ─── Divider ─── */

  it("renders a horizontal divider with separator role by default", () => {
    render(<Divider />);

    const sep = screen.getByRole("separator");

    expect(sep).toHaveClass("od-divider");
    expect(sep).toHaveAttribute("aria-orientation", "horizontal");
    expect(sep).toHaveAttribute("data-orientation", "horizontal");
    expect(sep).toHaveAttribute("data-contrast", "subtle");
  });

  it("renders a vertical strong divider", () => {
    render(<Divider orientation="vertical" contrast="strong" />);

    const sep = screen.getByRole("separator");

    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep).toHaveAttribute("data-orientation", "vertical");
    expect(sep).toHaveAttribute("data-contrast", "strong");
  });
});
