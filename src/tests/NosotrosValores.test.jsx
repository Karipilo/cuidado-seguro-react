import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NosotrosValores from "../components/nosotros/NosotrosValores";

describe("NosotrosValores", () => {
  it("renderiza el título Nuestros valores", () => {
    render(<NosotrosValores />);
    expect(screen.getByText("Nuestros valores")).toBeInTheDocument();
  });

  it("muestra los tres valores", () => {
    render(<NosotrosValores />);
    expect(screen.getByText("Compromiso")).toBeInTheDocument();
    expect(screen.getByText("Seguridad")).toBeInTheDocument();
    expect(screen.getByText("Humanización")).toBeInTheDocument();
  });

  it("muestra la descripción de Compromiso", () => {
    render(<NosotrosValores />);
    expect(screen.getByText(/bienestar de cada paciente/i)).toBeInTheDocument();
  });
});
