import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouteShell } from "../../app/components/RouteShell";
describe("route shell", () => {
  it("has an accessible main and interactive state", () => {
    render(<RouteShell title="Works" />);
    expect(screen.getByRole("heading", { name: "Works" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("Hydration check: 1");
  });
});
