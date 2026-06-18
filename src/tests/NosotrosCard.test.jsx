import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NosotrosCard from "../components/nosotros/NosotrosCard";

describe("NosotrosCard", () => {
  it("renderiza NosotrosHero, Mision y Valores", () => {
    render(<NosotrosCard />);
    expect(screen.getByText("Nosotros")).toBeInTheDocument();
    expect(screen.getByText("Nuestra misión")).toBeInTheDocument();
    expect(screen.getByText("Nuestros valores")).toBeInTheDocument();
  });
});
