import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../components/ui/Button";

describe("Button", () => {
  it("renderiza con texto", () => {
    render(<Button>Hola</Button>);
    expect(screen.getByText("Hola")).toBeInTheDocument();
  });

  it("llama onClick al hacer click", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("está deshabilitado cuando disabled=true", () => {
    render(<Button disabled>Deshabilitado</Button>);
    expect(screen.getByText("Deshabilitado")).toBeDisabled();
  });

  it("muestra spinner y está deshabilitado cuando loading=true", () => {
    render(<Button loading>Guardar</Button>);
    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
    expect(screen.getByText("Guardar").closest("button")).toBeDisabled();
  });

  it("aplica clase w-100 cuando fullWidth=true", () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByText("Full").closest("button")).toHaveClass("w-100");
  });

  it("aplica clase btn-lg cuando size=lg", () => {
    render(<Button size="lg">Grande</Button>);
    expect(screen.getByText("Grande").closest("button")).toHaveClass("btn-lg");
  });

  it("aplica clase btn-sm cuando size=sm", () => {
    render(<Button size="sm">Pequeño</Button>);
    expect(screen.getByText("Pequeño").closest("button")).toHaveClass("btn-sm");
  });

  it("aplica type=submit cuando se especifica", () => {
    render(<Button type="submit">Enviar</Button>);
    expect(screen.getByText("Enviar").closest("button")).toHaveAttribute("type", "submit");
  });

  it("aplica clases de variante danger", () => {
    render(<Button variant="danger">Eliminar</Button>);
    expect(screen.getByText("Eliminar").closest("button")).toHaveClass("btn-danger");
  });

  it("aplica className adicional", () => {
    render(<Button className="mi-clase">X</Button>);
    expect(screen.getByText("X").closest("button")).toHaveClass("mi-clase");
  });
});
