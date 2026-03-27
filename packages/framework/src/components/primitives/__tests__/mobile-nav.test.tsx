import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { MobileNav, MobileNavLink, MobileNavTrigger } from "../mobile-nav";

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MobileNavTrigger data-testid="trigger" onClick={() => setOpen(true)} />
      <MobileNav open={open} onOpenChange={setOpen}>
        <MobileNavLink href="/alpha">Alpha</MobileNavLink>
        <MobileNavLink href="/bravo" active>Bravo</MobileNavLink>
      </MobileNav>
    </>
  );
}

describe("MobileNav", () => {
  it("renders trigger with three bars", () => {
    render(<Harness />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toBeInTheDocument();
    expect(trigger.querySelectorAll(".od-mobile-nav-trigger__bar")).toHaveLength(3);
  });

  it("opens panel when trigger is clicked", () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId("trigger"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Bravo")).toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId("trigger"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog").closest("[data-state]")).toHaveAttribute(
      "data-state",
      "closed",
    );
  });

  it("closes on backdrop click", () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId("trigger"));

    const overlay = document.querySelector(".od-mobile-nav__overlay");
    expect(overlay).not.toBeNull();
    fireEvent.click(overlay!);

    expect(screen.getByRole("dialog").closest("[data-state]")).toHaveAttribute(
      "data-state",
      "closed",
    );
  });

  it("marks active link with is-active class", () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId("trigger"));

    const bravoLink = screen.getByText("Bravo");
    expect(bravoLink).toHaveClass("is-active");
    expect(screen.getByText("Alpha")).not.toHaveClass("is-active");
  });

  it("locks body scroll when open", () => {
    render(<Harness />);
    expect(document.body.style.overflow).not.toBe("hidden");

    fireEvent.click(screen.getByTestId("trigger"));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("traps focus within the panel on Tab", () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId("trigger"));

    const closeBtn = screen.getByRole("button", { name: "Close navigation" });
    const bravoLink = screen.getByText("Bravo");

    // Focus should be on the close button (first focusable)
    expect(closeBtn).toHaveFocus();

    // Tab forward from last focusable → wraps to first
    bravoLink.focus();
    fireEvent.keyDown(bravoLink, { key: "Tab" });
    expect(closeBtn).toHaveFocus();

    // Shift+Tab from first focusable → wraps to last
    closeBtn.focus();
    fireEvent.keyDown(closeBtn, { key: "Tab", shiftKey: true });
    expect(bravoLink).toHaveFocus();
  });

  it("restores focus to trigger on close", () => {
    render(<Harness />);
    const trigger = screen.getByTestId("trigger");

    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close via Escape
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveFocus();
  });
});
