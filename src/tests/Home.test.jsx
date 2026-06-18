import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

  it("renderiza el título principal", () => {
    renderHome();
    expect(screen.getByText("Seguro")).toBeInTheDocument();
  });

  it("renderiza el badge de plataforma", () => {
    renderHome();
    expect(screen.getByText("Plataforma de salud digital")).toBeInTheDocument();
  });

  it("muestra botón Comenzar ahora", () => {
    renderHome();
    expect(screen.getByText("Comenzar ahora")).toBeInTheDocument();
  });

  it("navega a registro al hacer click en Comenzar ahora", () => {
    renderHome();
    fireEvent.click(screen.getByText("Comenzar ahora"));
    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });

  it("muestra las características de la plataforma", () => {
    renderHome();
    expect(screen.getByText("Atención segura y personalizada")).toBeInTheDocument();
    expect(screen.getByText("Equipo médico especializado")).toBeInTheDocument();
    expect(screen.getByText("Cuidado integral para cada paciente")).toBeInTheDocument();
  });
});
