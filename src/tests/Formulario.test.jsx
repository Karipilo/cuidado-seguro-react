import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Formulario from "../components/ui/Formulario";

describe("Formulario", () => {
  it("renderiza el título", () => {
    render(<Formulario title="Mi Formulario" buttonText="Enviar" onSubmit={() => {}} />);
    expect(screen.getByText("Mi Formulario")).toBeInTheDocument();
  });

  it("renderiza el texto del botón", () => {
    render(<Formulario title="T" buttonText="Guardar" onSubmit={() => {}} />);
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("renderiza los children", () => {
    render(
      <Formulario title="T" buttonText="B" onSubmit={() => {}}>
        <input data-testid="campo" />
      </Formulario>
    );
    expect(screen.getByTestId("campo")).toBeInTheDocument();
  });

  it("llama onSubmit al enviar el formulario", () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(<Formulario title="T" buttonText="Enviar" onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByText("Enviar").closest("form"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
