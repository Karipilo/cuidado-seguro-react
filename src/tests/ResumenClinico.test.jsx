import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ResumenClinico from "../components/profesional/ResumenClinico";

describe("ResumenClinico", () => {
  it("renderiza el título", () => {
    render(<ResumenClinico paciente={{}} />);

    expect(
      screen.getByText("Resumen Clínico")
    ).toBeInTheDocument();
  });

  it("muestra mensaje cuando no existen registros", () => {
    render(<ResumenClinico paciente={{}} />);

    expect(
      screen.getByText("No existen registros clínicos.")
    ).toBeInTheDocument();
  });

  it("muestra medicamentos del paciente", () => {
    const paciente = {
      medicamentos: [
        {
          nombre: "Paracetamol",
          dosis: "500 mg",
          frecuencia: "Cada 8 horas",
          diasTratamiento: 5,
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    expect(
      screen.getByText(/Paracetamol/i)
    ).toBeInTheDocument();
  });

  it("muestra signos vitales del paciente", () => {
    const paciente = {
      signosVitales: [
        {
          fecha: "2025-01-01",
          profesional: "Enfermero",
          presion: "120/80",
          frecuencia: 80,
          temperatura: 36.5,
          saturacion: 98,
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    expect(
      screen.getByText(/120\/80/i)
    ).toBeInTheDocument();
  });

  it("filtra por medicamentos", () => {
    const paciente = {
      medicamentos: [
        {
          nombre: "Paracetamol",
          dosis: "500 mg",
          frecuencia: "Cada 8 horas",
          diasTratamiento: 5,
        },
      ],
      signosVitales: [
        {
          fecha: "2025-01-01",
          profesional: "Enfermero",
          presion: "120/80",
          frecuencia: 80,
          temperatura: 36.5,
          saturacion: 98,
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    fireEvent.click(
      screen.getByText(/Medicamentos/i)
    );

    expect(
      screen.getByText(/Paracetamol/i)
    ).toBeInTheDocument();
  });

  it("muestra evoluciones del paciente", () => {
    const paciente = {
      evoluciones: [
        {
          descripcion: "Paciente estable",
          profesional: "Doctor",
          fecha: "2025-01-01",
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    expect(
      screen.getByText(/Paciente estable/i)
    ).toBeInTheDocument();
  });

  it("muestra exámenes clínicos", () => {
    const paciente = {
      examenes: [
        {
          nombre: "Hemograma",
          estado: "Completado",
          resultado: "Normal",
          fecha: "2025-01-01",
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    expect(
      screen.getByText(/Hemograma/i)
    ).toBeInTheDocument();
  });

  it("muestra datos antropométricos", () => {
    const paciente = {
      antropometria: [
        {
          peso: 80,
          altura: 1.75,
          fecha: "2025-01-01",
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    expect(
      screen.getByText(/Peso: 80 kg/i)
    ).toBeInTheDocument();
  });

  it("muestra indicaciones médicas", () => {
    const paciente = {
      indicaciones: [
        {
          indicacion: "Reposo por 7 días",
          profesional: "Doctor",
          fecha: "2025-01-01",
        },
      ],
    };

    render(<ResumenClinico paciente={paciente} />);

    expect(
      screen.getByText(/Reposo por 7 días/i)
    ).toBeInTheDocument();
  });
});