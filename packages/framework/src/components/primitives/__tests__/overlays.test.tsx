import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { Button } from "../button";
import { Dialog } from "../dialog";
import { Select } from "../select";
import { ToastProvider, toneToast, useToast } from "../toast";
import { Tooltip } from "../tooltip";

describe("Overlays", () => {
  /* ─── Tooltip ─── */

  it("shows and hides tooltip content on hover and escape", () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="Compact hint" tone="primary">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });

    fireEvent.mouseEnter(trigger);
    act(() => {
      vi.advanceTimersByTime(130);
    });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Compact hint");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("opens tooltip on focus and closes on blur", () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="Focus hint" openDelay={0}>
        <button type="button">Focus target</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Focus target" });

    fireEvent.focus(trigger);
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Focus hint");

    fireEvent.blur(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  /* ─── Dialog ─── */

  it("traps focus inside the dialog and closes on escape", () => {
    function DialogHarness() {
      const [open, setOpen] = useState(true);
      const closeTargetRef = useRef<HTMLButtonElement>(null);

      return (
        <div>
          <button type="button">Outside trigger</button>
          <Dialog
            initialFocusRef={closeTargetRef}
            open={open}
            onOpenChange={setOpen}
            title="Secure overlay"
            description="Dialog focus should stay inside the panel."
            footer={<Button>Confirm</Button>}
          >
            <button ref={closeTargetRef} type="button">
              Primary focus target
            </button>
            <button type="button">Inner action</button>
          </Dialog>
        </div>
      );
    }

    render(<DialogHarness />);

    const primaryTarget = screen.getByRole("button", {
      name: "Primary focus target",
    });
    const innerAction = screen.getByRole("button", { name: "Inner action" });
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    const closeButton = screen.getByRole("button", { name: "Close dialog" });

    expect(primaryTarget).toHaveFocus();

    confirmButton.focus();
    fireEvent.keyDown(confirmButton, { key: "Tab" });
    expect(closeButton).toHaveFocus();

    closeButton.focus();
    fireEvent.keyDown(closeButton, { key: "Tab", shiftKey: true });
    expect(confirmButton).toHaveFocus();

    innerAction.focus();
    expect(innerAction).toHaveFocus();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("restores focus after closing a dialog with an initial focus target", () => {
    function RestoreFocusHarness() {
      const [open, setOpen] = useState(false);
      const initialFocusRef = useRef<HTMLButtonElement>(null);

      return (
        <div>
          <button type="button" onClick={() => setOpen(true)}>
            Open panel
          </button>
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title="Focus return"
            initialFocusRef={initialFocusRef}
          >
            <button ref={initialFocusRef} type="button">
              Primary action
            </button>
          </Dialog>
        </div>
      );
    }

    render(<RestoreFocusHarness />);

    const trigger = screen.getByRole("button", { name: "Open panel" });
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("button", { name: "Primary action" })).toHaveFocus();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger).toHaveFocus();
  });

  it("respects closeOnEscape=false", () => {
    function EscapeHarness() {
      const [open, setOpen] = useState(true);

      return (
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="No escape"
          closeOnEscape={false}
        >
          <p>Locked overlay</p>
        </Dialog>
      );
    }

    render(<EscapeHarness />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("respects closeOnBackdrop=false", () => {
    function BackdropHarness() {
      const [open, setOpen] = useState(true);

      return (
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="No backdrop close"
          closeOnBackdrop={false}
        >
          <p>Locked overlay</p>
        </Dialog>
      );
    }

    render(<BackdropHarness />);

    const backdrop = document.querySelector(".od-dialog-backdrop");
    expect(backdrop).not.toBeNull();

    fireEvent.mouseDown(backdrop!);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  /* ─── Toast ─── */

  it("pauses toast dismissal on hover and removes it after resume", () => {
    vi.useFakeTimers();

    function ToastHarness() {
      const { push } = useToast();

      return (
        <Button
          onClick={() =>
            push({
              ...toneToast("success", "Signal routed", "Hover should pause dismissal."),
              duration: 100,
            })
          }
        >
          Trigger toast
        </Button>
      );
    }

    render(
      <ToastProvider>
        <ToastHarness />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Trigger toast" }));
    const toast = screen.getByRole("status");

    expect(screen.getByText("Signal routed")).toBeInTheDocument();

    fireEvent.mouseEnter(toast);
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(screen.getByText("Signal routed")).toBeInTheDocument();

    fireEvent.mouseLeave(toast);
    act(() => {
      vi.advanceTimersByTime(101);
    });
    expect(screen.getByText("Signal routed")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(181);
    });
    expect(screen.queryByText("Signal routed")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  /* ─── Select type-ahead ─── */

  it("jumps to matching option on type-ahead while listbox is open", () => {
    vi.useFakeTimers();
    // jsdom doesn't implement scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();

    render(
      <Select
        aria-label="Region"
        options={[
          { value: "alpha", label: "Alpha" },
          { value: "bravo", label: "Bravo" },
          { value: "baker", label: "Baker" },
          { value: "charlie", label: "Charlie" },
        ]}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Region" });

    // Open the listbox
    fireEvent.click(trigger);

    // Type "b" → should highlight "Bravo" (first match)
    fireEvent.keyDown(trigger, { key: "b" });
    expect(
      document.querySelector("[data-highlighted]"),
    ).toHaveTextContent("Bravo");

    // Type "a" within 500ms → buffer is "ba" → should highlight "Baker"
    fireEvent.keyDown(trigger, { key: "a" });
    expect(
      document.querySelector("[data-highlighted]"),
    ).toHaveTextContent("Baker");

    // Wait for buffer to clear
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Type "c" → should highlight "Charlie"
    fireEvent.keyDown(trigger, { key: "c" });
    expect(
      document.querySelector("[data-highlighted]"),
    ).toHaveTextContent("Charlie");

    vi.useRealTimers();
  });
});
