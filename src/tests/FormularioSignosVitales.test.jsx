import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import FormularioSignosVitales from "../components/profesional/FormularioSignosVitales";

import { request } from "../utils/api";
import { getMemoryJSON } from "../utils/memoryStore";

vi.mock("../utils/api", () => ({
  request: vi.fn(),
}));

vi.mock("../utils/memoryStore", () => ({
  getMemoryJSON: vi.fn(),
}));

describe("FormularioSignosVitales", () => {
  const pacienteMock = {
    id: 1,
    signosVitales: [],
  };

  const setPacienteMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    getMemoryJSON.mockReturnValue({
      accessToken: "token-prueba",
      userInfo: {
        nombreCompleto: "Juan Pérez",
        profesion: "Enfermero",
      },
    });

    window.alert = vi.fn();
  });

  it("renderiza el formulario", () => {
    render(
      <FormularioSignosVitales
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    expect(
      screen.getByText("Registrar Signos Vitales")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Guardar signos vitales")
    ).toBeInTheDocument();
  });

  it("muestra alerta si faltan campos", () => {
    render(
      <FormularioSignosVitales
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.click(
      screen.getByText("Guardar signos vitales")
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Complete todos los campos"
    );

    expect(request).not.toHaveBeenCalled();
  });

  it("guarda signos vitales correctamente", async () => {
    request.mockResolvedValue({
      id: 1,
      presion: "120/80 mmHg",
      frecuencia: 80,
      temperatura: 36.5,
      saturacion: 98,
    });

    render(
      <FormularioSignosVitales
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Sistólica"),
      {
        target: {
          value: "120",
          name: "sistolica",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Diastólica"),
      {
        target: {
          value: "80",
          name: "diastolica",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("lpm"),
      {
        target: {
          value: "80",
          name: "frecuencia",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("°C"),
      {
        target: {
          value: "36.5",
          name: "temperatura",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("%"),
      {
        target: {
          value: "98",
          name: "saturacion",
        },
      }
    );

    fireEvent.click(
      screen.getByText("Guardar signos vitales")
    );

    await waitFor(() => {
      expect(request).toHaveBeenCalled();
    });

    expect(setPacienteMock).toHaveBeenCalled();

    expect(window.alert).toHaveBeenCalledWith(
      "Signos vitales guardados en BD"
    );
  });

  it("muestra error cuando falla la api", async () => {
    request.mockRejectedValue(
      new Error("Error servidor")
    );

    render(
      <FormularioSignosVitales
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Sistólica"),
      {
        target: {
          value: "120",
          name: "sistolica",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Diastólica"),
      {
        target: {
          value: "80",
          name: "diastolica",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("lpm"),
      {
        target: {
          value: "80",
          name: "frecuencia",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("°C"),
      {
        target: {
          value: "36.5",
          name: "temperatura",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("%"),
      {
        target: {
          value: "98",
          name: "saturacion",
        },
      }
    );

    fireEvent.click(
      screen.getByText("Guardar signos vitales")
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "No se pudieron guardar los signos vitales"
      );
    });
  });
});