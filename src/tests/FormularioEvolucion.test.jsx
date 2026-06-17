import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import FormularioEvolucion from "../components/profesional/FormularioEvolucion";

import { getMemoryJSON } from "../utils/memoryStore";

vi.mock("../utils/memoryStore", () => ({
  getMemoryJSON: vi.fn(),
}));

describe("FormularioEvolucion", () => {
  const pacienteMock = {
    id: 1,
    evoluciones: [],
  };

  const setPacienteMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    getMemoryJSON.mockReturnValue({
      username: "doctor.prueba",
    });

    window.alert = vi.fn();
  });

  it("renderiza el formulario correctamente", () => {
    render(
      <FormularioEvolucion
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    expect(
      screen.getByText("Registrar Evolución")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Guardar evolución")
    ).toBeInTheDocument();
  });

  it("muestra alerta cuando faltan campos obligatorios", () => {
    render(
      <FormularioEvolucion
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.click(
      screen.getByText("Guardar evolución")
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Complete los campos"
    );

    expect(setPacienteMock).not.toHaveBeenCalled();
  });

  it("guarda correctamente una evolución", () => {
    render(
      <FormularioEvolucion
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    const textareas = screen.getAllByRole("textbox");

    fireEvent.change(textareas[0], {
      target: {
        value: "Paciente presenta mejoría",
        name: "evolucion",
      },
    });

    fireEvent.change(textareas[1], {
      target: {
        value: "Sin complicaciones",
        name: "observaciones",
      },
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: {
        value: "Estable",
        name: "estado",
      },
    });

    fireEvent.click(
      screen.getByText("Guardar evolución")
    );

    expect(setPacienteMock).toHaveBeenCalledTimes(1);

    expect(window.alert).toHaveBeenCalledWith(
      "Evolución guardada"
    );
  });

  it("agrega la evolución al paciente", () => {
    render(
      <FormularioEvolucion
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    const textareas = screen.getAllByRole("textbox");

    fireEvent.change(textareas[0], {
      target: {
        value: "Paciente estable",
        name: "evolucion",
      },
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: {
        value: "Estable",
        name: "estado",
      },
    });

    fireEvent.click(
      screen.getByText("Guardar evolución")
    );

    const llamada = setPacienteMock.mock.calls[0][0];

    expect(llamada.evoluciones).toHaveLength(1);

    expect(llamada.evoluciones[0].evolucion).toBe(
      "Paciente estable"
    );

    expect(llamada.evoluciones[0].estado).toBe(
      "Estable"
    );
  });
});