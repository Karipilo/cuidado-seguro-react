import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "../components/ui/Input";

describe("Input", () => {
  it("renderiza el input", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<Input label="Nombre" id="nombre" />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
  });

  it("muestra asterisco rojo cuando required=true", () => {
    render(<Input label="Campo" id="campo" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    render(<Input error="Campo requerido" />);
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
  });

  it("aplica clase is-invalid cuando hay error", () => {
    render(<Input error="Error" />);
    expect(screen.getByRole("textbox")).toHaveClass("is-invalid");
  });

  it("está deshabilitado cuando disabled=true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("muestra placeholder", () => {
    render(<Input placeholder="Escriba aquí" />);
    expect(screen.getByPlaceholderText("Escriba aquí")).toBeInTheDocument();
  });

  it("llama onChange al cambiar el valor", () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("muestra el valor actual", () => {
    render(<Input value="hola" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("hola");
  });

  it("renderiza input de tipo password", () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector("input[type='password']")).toBeInTheDocument();
  });
});
