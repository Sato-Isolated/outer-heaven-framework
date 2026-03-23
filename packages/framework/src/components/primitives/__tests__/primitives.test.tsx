import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { CommandHero } from "../../compositions/command-hero";
import { Badge } from "../badge";
import { Button } from "../button";
import { Dialog } from "../dialog";
import { Dropzone } from "../dropzone";
import { Input } from "../input";
import { Panel } from "../panel";
import { Select } from "../select";
import { ToastProvider, toneToast, useToast } from "../toast";

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

    expect(screen.getByText("Query")).toHaveClass("od-control-inset-label");
    expect(screen.getByText("/").parentElement).toHaveClass("od-control-prefix");
    expect(screen.getByText("Search by filename.")).toHaveClass("od-control-hint");
    expect(screen.getByText("Invalid route.")).toHaveClass("od-control-message");
  });

  it("supports select warning and disabled states", () => {
    render(
      <Select
        aria-label="Relay sector"
        state="warning"
        disabled
        insetLabel="Sector"
      >
        <option>North</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Relay sector" });

    expect(select).toHaveAttribute("data-state", "warning");
    expect(select).toHaveAttribute("data-tone", "warning");
    expect(select).toBeDisabled();
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

  it("renders a command hero composition with optional stamp omitted", () => {
    render(
      <CommandHero
        eyebrow="Command Interface Layer"
        title="Tactical UI for systems that need discipline, not decoration."
        description="The hero composition should render structured content without relying on page-local layout classes."
        metaItems={[
          { label: "Framework Name", value: "Outer Heaven Framework" },
          { label: "Public Layer", value: "`od-*` primitives" },
        ]}
        panel={{
          label: "Tactical Display 01",
          headline: "One visual language from shell to toast.",
          rows: [
            {
              index: "01",
              label: "Semantic Theme Map",
              detail: "Tailwind utilities resolve against tactical tokens instead of one-off color picks.",
            },
          ],
          readouts: [
            {
              value: "11",
              label: "Primitives",
              detail: "One contract across surfaces, inputs, overlays, and signals.",
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("Command Interface Layer")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Tactical UI for systems that need discipline, not decoration.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The hero composition should render structured content without relying on page-local layout classes.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Semantic Theme Map")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.queryByText("Live Contract")).not.toBeInTheDocument();
    expect(document.querySelector(".oh-command-hero")).not.toBeNull();
    expect(document.querySelector(".oh-command-hero__panel")).not.toBeNull();
  });

  it("renders a structured dropzone state surface", () => {
    render(
      <Dropzone
        tone="success"
        state="success"
        eyebrow="Upload lane"
        title="Payload accepted"
        description="The structured API should render copy, status, and body areas."
        status={<span>Status block</span>}
        actions={<Button size="sm">Retry</Button>}
      >
        <div>Body slot</div>
      </Dropzone>,
    );

    const dropzone = screen.getByText("Payload accepted").closest(".od-dropzone");

    expect(dropzone).toHaveAttribute("data-state", "success");
    expect(screen.getByText("Upload lane")).toBeInTheDocument();
    expect(screen.getByText("Status block")).toBeInTheDocument();
    expect(screen.getByText("Body slot")).toBeInTheDocument();
  });

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
});
