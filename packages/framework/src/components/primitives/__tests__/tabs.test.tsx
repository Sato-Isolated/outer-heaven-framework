import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "../tabs";

describe("Tabs", () => {
  it("switches tabs and renders only the active panel by default", () => {
    render(
      <Tabs defaultValue="alpha" tone="primary">
        <TabsList>
          <TabsTrigger value="alpha">Alpha</TabsTrigger>
          <TabsTrigger value="beta">Beta</TabsTrigger>
        </TabsList>
        <TabsPanel value="alpha">Alpha panel</TabsPanel>
        <TabsPanel value="beta">Beta panel</TabsPanel>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Alpha panel")).toBeInTheDocument();
    expect(screen.queryByText("Beta panel")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
    expect(screen.getByText("Beta panel")).toBeInTheDocument();
  });

  it("moves focus between tabs with arrow keys", () => {
    render(
      <Tabs defaultValue="a" tone="primary">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
        <TabsPanel value="b">Panel B</TabsPanel>
        <TabsPanel value="c">Panel C</TabsPanel>
      </Tabs>,
    );

    const tabA = screen.getByRole("tab", { name: "A" });
    const tabB = screen.getByRole("tab", { name: "B" });
    const tabC = screen.getByRole("tab", { name: "C" });

    tabA.focus();

    fireEvent.keyDown(tabA, { key: "ArrowRight" });
    expect(tabB).toHaveFocus();
    expect(screen.getByText("Panel B")).toBeInTheDocument();

    fireEvent.keyDown(tabB, { key: "ArrowRight" });
    expect(tabC).toHaveFocus();

    fireEvent.keyDown(tabC, { key: "ArrowRight" });
    expect(tabA).toHaveFocus();

    fireEvent.keyDown(tabA, { key: "ArrowLeft" });
    expect(tabC).toHaveFocus();

    fireEvent.keyDown(tabC, { key: "Home" });
    expect(tabA).toHaveFocus();

    fireEvent.keyDown(tabA, { key: "End" });
    expect(tabC).toHaveFocus();
  });
});
