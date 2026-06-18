import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactoInfo from "../components/contacto/ContactoInfo";

describe("ContactoInfo", () => {
  it("renderiza el título Contáctanos", () => {
    render(<ContactoInfo />);
    expect(screen.getByText("Contáctanos")).toBeInTheDocument();
  });

  it("muestra el correo de contacto", () => {
    render(<ContactoInfo />);
    expect(screen.getByText("contacto@cuidadoseguro.cl")).toBeInTheDocument();
  });

  it("muestra el teléfono", () => {
    render(<ContactoInfo />);
    expect(screen.getByText("+56 9 1234 5678")).toBeInTheDocument();
  });

  it("muestra la dirección", () => {
    render(<ContactoInfo />);
    expect(screen.getByText("Villa Alemana, Chile")).toBeInTheDocument();
  });
});
