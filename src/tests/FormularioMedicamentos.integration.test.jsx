import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useState } from "react";

import FormularioMedicamentos from "../components/profesional/FormularioMedicamentos";

import { request } from "../utils/api";
import { getMemoryJSON } from "../utils/memoryStore";

vi.mock("../utils/api", () => ({
  request: vi.fn(),
}));

vi.mock("../utils/memoryStore", () => ({
  getMemoryJSON: vi.fn(),
}));

describe("Integración FormularioMedicamentos", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getMemoryJSON.mockReturnValue({
      accessToken: "token-prueba",
    });

    window.alert = vi.fn();
  });

  it("integra formulario, api y actualización del paciente", async () => {
    request.mockResolvedValue({
      id: 1,
      nombre: "Ibuprofeno",
      dosis: "400 mg",
      frecuencia: "Cada 12 horas",
    });

    const ComponentePrueba = () => {
      const [paciente, setPaciente] = useState({
        id: 1,
        medicamentos: [],
      });

      return (
        <>
          <FormularioMedicamentos
            paciente={paciente}
            setPaciente={setPaciente}
          />

          <div data-testid="cantidad-medicamentos">
            {paciente.medicamentos.length}
          </div>
        </>
      );
    };

    render(<ComponentePrueba />);

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: {
        value: "Ibuprofeno",
        name: "nombre",
      },
    });

    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: {
        value: "400 mg",
        name: "dosis",
      },
    });

    fireEvent.change(screen.getAllByRole("textbox")[2], {
      target: {
        value: "Cada 12 horas",
        name: "frecuencia",
      },
    });

    fireEvent.click(
      screen.getByText("Guardar medicamento")
    );

    await waitFor(() => {
      expect(request).toHaveBeenCalled();
    });

    expect(
      screen.getByTestId("cantidad-medicamentos")
    ).toHaveTextContent("1");

    expect(window.alert).toHaveBeenCalledWith(
      "Medicamento guardado correctamente"
    );
  });
});
