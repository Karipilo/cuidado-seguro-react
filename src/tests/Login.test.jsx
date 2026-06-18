import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { request } from "../utils/api";
import { setMemoryJSON } from "../utils/memoryStore";

vi.mock("../utils/api", () => ({ request: vi.fn() }));
vi.mock("../utils/memoryStore", () => ({
  setMemoryJSON: vi.fn(),
  getMemoryJSON: vi.fn(),
  getMemoryItem: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () =>
    render(<MemoryRouter><Login /></MemoryRouter>);

  it("renderiza el formulario de login", () => {
    renderLogin();
    expect(screen.getAllByText("Iniciar Sesión").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByPlaceholderText("Ingrese su usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ingrese su contraseña")).toBeInTheDocument();
  });

  it("redirige a paciente normal cuando tipoUsuario es PACIENTE", async () => {
    request.mockResolvedValue({ userInfo: { tipoUsuario: "PACIENTE" } });
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), { target: { value: "paciente1" } });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), { target: { value: "pass123" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/dashboardPacienteNormal", expect.anything()));
  });

  it("redirige a profesional cuando tipoUsuario es PROFESIONAL", async () => {
    request.mockResolvedValue({ userInfo: { tipoUsuario: "PROFESIONAL" } });
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), { target: { value: "doc1" } });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), { target: { value: "pass123" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/dashboard-profesional", expect.anything()));
  });

  it("redirige a tutor cuando tipoUsuario es TUTOR", async () => {
    request.mockResolvedValue({ userInfo: { tipoUsuario: "TUTOR" } });
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), { target: { value: "tutor1" } });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), { target: { value: "pass123" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/dashboardTutor", expect.anything()));
  });

  it("redirige a inicio cuando tipoUsuario es desconocido", async () => {
    request.mockResolvedValue({ userInfo: { tipoUsuario: "OTRO" } });
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), { target: { value: "user" } });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), { target: { value: "pass" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/", expect.anything()));
  });

  it("muestra error cuando el login falla", async () => {
    request.mockRejectedValue(new Error("Credenciales incorrectas"));
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), { target: { value: "bad" } });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), { target: { value: "bad" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    await waitFor(() =>
      expect(screen.getByText("Credenciales incorrectas")).toBeInTheDocument()
    );
  });

  it("navega a registro al hacer click en Regístrese aquí", () => {
    renderLogin();
    fireEvent.click(screen.getByText("Regístrese aquí"));
    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });

  it("muestra Ingresando... mientras carga", async () => {
    request.mockImplementation(() => new Promise(() => {}));
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), { target: { value: "u" } });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), { target: { value: "p" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    await waitFor(() =>
      expect(screen.getByText("Ingresando...")).toBeInTheDocument()
    );
  });
});
