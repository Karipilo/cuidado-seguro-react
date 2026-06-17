import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import FormularioMedicamentos from "../components/profesional/FormularioMedicamentos";

import { request } from "../utils/api";
import { getMemoryJSON } from "../utils/memoryStore";

vi.mock("../utils/api", () => ({
  request: vi.fn(),
}));

vi.mock("../utils/memoryStore", () => ({
  getMemoryJSON: vi.fn(),
}));

describe("FormularioMedicamentos", () => {
  const pacienteMock = {
    id: 1,
    medicamentos: [],
  };

  const setPacienteMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    getMemoryJSON.mockReturnValue({
      accessToken: "token-prueba",
    });

    window.alert = vi.fn();
  });

  it("renderiza el formulario", () => {
    render(
      <FormularioMedicamentos
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    expect(
      screen.getByText("Prescripción de Medicamentos")
    ).toBeInTheDocument();

    expect(screen.getByText("Guardar medicamento")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no existen medicamentos", () => {
    render(
      <FormularioMedicamentos
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    expect(
      screen.getByText("No existen medicamentos prescritos.")
    ).toBeInTheDocument();
  });

  it("muestra medicamentos existentes", () => {
    const pacienteConMedicamentos = {
      id: 1,
      medicamentos: [
        {
          id: 10,
          nombre: "Paracetamol",
          dosis: "500 mg",
          frecuencia: "Cada 8 horas",
          diasTratamiento: 5,
        },
      ],
    };

    render(
      <FormularioMedicamentos
        paciente={pacienteConMedicamentos}
        setPaciente={setPacienteMock}
      />
    );

    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
    expect(screen.getByText(/500 mg/i)).toBeInTheDocument();
  });

  it("muestra alerta si faltan campos obligatorios", async () => {
    render(
      <FormularioMedicamentos
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.click(screen.getByText("Guardar medicamento"));

    expect(window.alert).toHaveBeenCalledWith(
      "Complete los campos obligatorios"
    );

    expect(request).not.toHaveBeenCalled();
  });

  it("guarda medicamento correctamente", async () => {
    request.mockResolvedValue({
      id: 100,
      nombre: "Ibuprofeno",
      dosis: "400 mg",
      frecuencia: "Cada 12 horas",
    });

    render(
      <FormularioMedicamentos
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "Ibuprofeno", name: "nombre" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: 50 mg"), {
      target: { value: "400 mg", name: "dosis" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: Cada 24 horas"), {
      target: { value: "Cada 12 horas", name: "frecuencia" },
    });

    fireEvent.click(screen.getByText("Guardar medicamento"));

    await waitFor(() => {
      expect(request).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Medicamento guardado correctamente"
    );

    expect(setPacienteMock).toHaveBeenCalled();
  });

  it("muestra error cuando falla la api", async () => {
    request.mockRejectedValue(new Error("Error servidor"));

    render(
      <FormularioMedicamentos
        paciente={pacienteMock}
        setPaciente={setPacienteMock}
      />
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "Ibuprofeno", name: "nombre" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: 50 mg"), {
      target: { value: "400 mg", name: "dosis" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: Cada 24 horas"), {
      target: { value: "Cada 12 horas", name: "frecuencia" },
    });

    fireEvent.click(screen.getByText("Guardar medicamento"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Error servidor");
    });
  });
});