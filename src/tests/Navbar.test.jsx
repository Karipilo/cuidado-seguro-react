import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NavbarComponent from "../components/layout/Navbar";
import * as memoryStore from "../utils/memoryStore";

vi.mock("../utils/memoryStore", () => ({
  getMemoryItem: vi.fn(),
  removeMemoryItem: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("NavbarComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryStore.getMemoryItem.mockReturnValue(null);
  });

  const renderNavbar = () =>
    render(<MemoryRouter><NavbarComponent /></MemoryRouter>);

  it("muestra botones de login y registro cuando no hay sesión", () => {
    renderNavbar();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("muestra links de navegación", () => {
    renderNavbar();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Nosotros")).toBeInTheDocument();
  });

  it("navega a login al hacer click en Iniciar sesión", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("Iniciar sesión"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("navega a registro al hacer click en Registrarse", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("Registrarse"));
    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });

  it("muestra saludo y botones de panel cuando hay sesión", () => {
    memoryStore.getMemoryItem.mockReturnValue(
      JSON.stringify({ userInfo: { nombreCompleto: "Dr. Garcia", tipoUsuario: "PROFESIONAL" } })
    );
    renderNavbar();
    expect(screen.getByText(/Hola, Dr. Garcia/i)).toBeInTheDocument();
    expect(screen.getByText("Mi Panel")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  it("llama removeMemoryItem al cerrar sesión", () => {
    memoryStore.getMemoryItem.mockReturnValue(
      JSON.stringify({ userInfo: { nombreCompleto: "Ana", tipoUsuario: "PACIENTE" } })
    );
    renderNavbar();
    fireEvent.click(screen.getByText("Cerrar sesión"));
    expect(memoryStore.removeMemoryItem).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navega a dashboard profesional al hacer click en Mi Panel", () => {
    memoryStore.getMemoryItem.mockReturnValue(
      JSON.stringify({ userInfo: { nombreCompleto: "Doc", tipoUsuario: "PROFESIONAL" } })
    );
    renderNavbar();
    fireEvent.click(screen.getByText("Mi Panel"));
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard-Profesional");
  });

  it("navega a inicio al hacer click en el logo", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("Cuidado Seguro"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
