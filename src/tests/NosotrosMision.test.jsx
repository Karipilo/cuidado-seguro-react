import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NosotrosMision from "../components/nosotros/NosotrosMision";

describe("NosotrosMision", () => {
  it("renderiza el título Nuestra misión", () => {
    render(<NosotrosMision />);
    expect(screen.getByText("Nuestra misión")).toBeInTheDocument();
  });

  it("renderiza el texto de misión", () => {
    render(<NosotrosMision />);
    expect(screen.getByText(/plataforma digital segura/i)).toBeInTheDocument();
  });
});
