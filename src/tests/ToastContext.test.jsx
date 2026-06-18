import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToastProvider, useToast } from "../context/ToastContext";

const TestComponent = ({ message, variant }) => {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast(message, variant)}>
      Mostrar Toast
    </button>
  );
};

describe("ToastContext", () => {
  it("ToastProvider renderiza children", () => {
    render(
      <ToastProvider>
        <p>Hijo</p>
      </ToastProvider>
    );
    expect(screen.getByText("Hijo")).toBeInTheDocument();
  });

  it("useToast lanza error fuera del provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestComponent message="x" />)).toThrow(
      "useToast must be used within a ToastProvider"
    );
    consoleSpy.mockRestore();
  });

  it("showToast muestra un toast con success", async () => {
    render(
      <ToastProvider>
        <TestComponent message="Guardado correctamente" variant="success" />
      </ToastProvider>
    );
    await act(async () => {
      screen.getByText("Mostrar Toast").click();
    });
    expect(screen.getByText("Guardado correctamente")).toBeInTheDocument();
  });

  it("showToast muestra un toast con danger", async () => {
    render(
      <ToastProvider>
        <TestComponent message="Error al guardar" variant="danger" />
      </ToastProvider>
    );
    await act(async () => {
      screen.getByText("Mostrar Toast").click();
    });
    expect(screen.getByText("Error al guardar")).toBeInTheDocument();
  });

  it("window.alert redirige a showToast", async () => {
    render(
      <ToastProvider>
        <p>Test</p>
      </ToastProvider>
    );
    await act(async () => {
      window.alert("Mensaje de alerta");
    });
    expect(screen.getByText("Mensaje de alerta")).toBeInTheDocument();
  });
});
