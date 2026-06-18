import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactoForm from "../components/contacto/ContactoForm";

describe("ContactoForm", () => {
  beforeEach(() => {
    window.alert = vi.fn();
  });

  const llenarFormulario = (overrides = {}) => {
    const campos = {
      nombre: "Ana Lopez",
      correo: "ana@test.com",
      asunto: "Consulta",
      mensaje: "Hola mundo",
      ...overrides,
    };
    const inputs = document.querySelectorAll("input, textarea");
    // nombre, correo, asunto, mensaje
    fireEvent.change(inputs[0], { target: { name: "nombre", value: campos.nombre } });
    fireEvent.change(inputs[1], { target: { name: "correo", value: campos.correo } });
    fireEvent.change(inputs[2], { target: { name: "asunto", value: campos.asunto } });
    fireEvent.change(inputs[3], { target: { name: "mensaje", value: campos.mensaje } });
  };

  it("renderiza el formulario con botón de envío", () => {
    render(<ContactoForm />);
    expect(screen.getByText("Enviar mensaje")).toBeInTheDocument();
  });

  it("muestra alerta si todos los campos están vacíos", () => {
    render(<ContactoForm />);
    fireEvent.click(screen.getByText("Enviar mensaje"));
    expect(window.alert).toHaveBeenCalledWith("Complete todos los campos");
  });

  it("muestra alerta si correo es inválido", () => {
    const { container } = render(<ContactoForm />);
    llenarFormulario({ correo: "correo-invalido" });
    fireEvent.submit(container.querySelector("form"));
    expect(window.alert).toHaveBeenCalledWith("Ingrese un correo válido");
  });

  it("envía el formulario correctamente", () => {
    render(<ContactoForm />);
    llenarFormulario();
    fireEvent.click(screen.getByText("Enviar mensaje"));
    expect(window.alert).toHaveBeenCalledWith("Mensaje enviado correctamente");
  });

  it("limpia los campos tras envío exitoso", () => {
    render(<ContactoForm />);
    llenarFormulario();
    fireEvent.click(screen.getByText("Enviar mensaje"));
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => expect(input.value).toBe(""));
  });

  it("actualiza el campo nombre al escribir", () => {
    render(<ContactoForm />);
    const inputs = document.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { name: "nombre", value: "Carlos" } });
    expect(inputs[0]).toHaveValue("Carlos");
  });
});
