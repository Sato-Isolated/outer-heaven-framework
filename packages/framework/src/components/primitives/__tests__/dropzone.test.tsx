import { render, screen } from "@testing-library/react";
import { Button } from "../button";
import { Dropzone } from "../dropzone";

describe("Dropzone", () => {
  it("renders a structured dropzone state surface", () => {
    render(
      <Dropzone
        tone="success"
        state="success"
        size="xl"
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
    expect(dropzone).toHaveAttribute("data-size", "xl");
    expect(screen.getByText("Upload lane")).toBeInTheDocument();
    expect(screen.getByText("Status block")).toBeInTheDocument();
    expect(screen.getByText("Body slot")).toBeInTheDocument();
  });

  it("renders a bare dropzone with children only", () => {
    render(<Dropzone>Drop here</Dropzone>);

    const zone = screen.getByText("Drop here").closest(".od-dropzone");

    expect(zone).not.toBeNull();
    expect(zone).toHaveAttribute("data-state", "default");
  });
});
