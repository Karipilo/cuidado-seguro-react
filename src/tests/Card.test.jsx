import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "../components/ui/Card";

describe("Card", () => {
  it("renderiza children", () => {
    render(<Card><p>Contenido</p></Card>);
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("muestra título cuando se provee", () => {
    render(<Card title="Mi Tarjeta"><p>X</p></Card>);
    expect(screen.getByText("Mi Tarjeta")).toBeInTheDocument();
  });

  it("muestra subtítulo cuando se provee", () => {
    render(<Card title="T" subtitle="Subtítulo"><p>X</p></Card>);
    expect(screen.getByText("Subtítulo")).toBeInTheDocument();
  });

  it("muestra header personalizado", () => {
    render(<Card header={<span>Header Custom</span>}><p>X</p></Card>);
    expect(screen.getByText("Header Custom")).toBeInTheDocument();
  });

  it("muestra footer cuando se provee", () => {
    render(<Card footer={<span>Footer</span>}><p>X</p></Card>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("no muestra header cuando no hay título ni header", () => {
    const { container } = render(<Card><p>Sin header</p></Card>);
    expect(container.querySelector(".card-header")).not.toBeInTheDocument();
  });

  it("no muestra footer cuando no se provee", () => {
    const { container } = render(<Card><p>X</p></Card>);
    expect(container.querySelector(".card-footer")).not.toBeInTheDocument();
  });

  it("aplica className adicional", () => {
    const { container } = render(<Card className="extra"><p>X</p></Card>);
    expect(container.querySelector(".extra")).toBeInTheDocument();
  });

  it("no muestra subtítulo cuando no se provee", () => {
    const { container } = render(<Card title="Solo título"><p>X</p></Card>);
    expect(container.querySelector(".card-subtitle")).not.toBeInTheDocument();
  });
});
