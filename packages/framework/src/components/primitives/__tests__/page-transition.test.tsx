import { act, render, screen } from "@testing-library/react";
import { PageTransition, easeEmphasis } from "../page-transition";

describe("PageTransition", () => {
  let now = 0;
  let rafQueue: FrameRequestCallback[] = [];
  const ctx = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    scale: vi.fn(),
    globalAlpha: 1,
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
  } as unknown as CanvasRenderingContext2D;

  beforeEach(() => {
    now = 0;
    rafQueue = [];
    vi.useFakeTimers();
    vi.spyOn(performance, "now").mockImplementation(() => now);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => ctx,
    );
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => {
        rafQueue.push(callback);
        return rafQueue.length;
      }),
    );
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("animates the canvas overlay when the pathname changes", () => {
    const { rerender } = render(
      <PageTransition pathname="/alpha" cols={2} rows={2} duration={100}>
        <div>Transition body</div>
      </PageTransition>,
    );

    expect(screen.getByText("Transition body")).toBeInTheDocument();
    expect(document.querySelector("canvas")).toBeNull();

    rerender(
      <PageTransition pathname="/bravo" cols={2} rows={2} duration={100}>
        <div>Transition body</div>
      </PageTransition>,
    );

    expect(document.querySelector("canvas")).not.toBeNull();
    expect(rafQueue).toHaveLength(1);

    act(() => {
      rafQueue.shift()?.(0);
    });

    expect(ctx.scale).toHaveBeenCalled();
    expect(rafQueue.length).toBeGreaterThan(0);

    now = 30;
    act(() => {
      rafQueue.shift()?.(30);
    });

    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.strokeRect).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(171);
    });

    expect(document.querySelector("canvas")).toBeNull();
  });

  it("skips the effect when disabled", () => {
    const { rerender } = render(
      <PageTransition pathname="/alpha" enabled={false}>
        <div>Static body</div>
      </PageTransition>,
    );

    rerender(
      <PageTransition pathname="/bravo" enabled={false}>
        <div>Static body</div>
      </PageTransition>,
    );

    expect(document.querySelector("canvas")).toBeNull();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("uses a monotonic emphasis easing curve", () => {
    expect(easeEmphasis(0)).toBe(0);
    expect(easeEmphasis(0.5)).toBeGreaterThan(0.5);
    expect(easeEmphasis(1)).toBe(1);
  });
});
