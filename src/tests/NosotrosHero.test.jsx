import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NosotrosHero from "../components/nosotros/NosotrosHero";

describe("NosotrosHero", () => {
  it("renderiza el título Nosotros", () => {
    render(<NosotrosHero />);
    expect(screen.getByText("Nosotros")).toBeInTheDocument();
  });

  it("renderiza el texto descriptivo", () => {
    render(<NosotrosHero />);
    expect(screen.getByText(/mejorar la continuidad/i)).toBeInTheDocument();
  });
});
