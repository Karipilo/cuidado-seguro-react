import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { request } from "../utils/api";

describe("api - request", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("hace GET exitoso y retorna JSON", async () => {
    const datos = { id: 1, nombre: "Test" };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(datos),
    });

    const resultado = await request("/endpoint");
    expect(resultado).toEqual(datos);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/endpoint"),
      expect.objectContaining({ method: "GET" })
    );
  });

  it("hace POST con body", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });

    await request("/login", { method: "POST", body: { user: "admin" } });
    const llamada = global.fetch.mock.calls[0];
    expect(llamada[1].method).toBe("POST");
    expect(llamada[1].body).toBe(JSON.stringify({ user: "admin" }));
  });

  it("incluye Authorization cuando se provee token", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await request("/protegido", { token: "mi-token" });
    const headers = global.fetch.mock.calls[0][1].headers;
    expect(headers["Authorization"]).toBe("Bearer mi-token");
  });

  it("lanza error cuando la respuesta no es ok", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve("No autorizado"),
    });

    await expect(request("/protegido")).rejects.toThrow("No autorizado");
  });

  it("lanza error con código HTTP cuando texto está vacío", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.resolve(""),
    });

    await expect(request("/error")).rejects.toThrow("Error HTTP 500");
  });

  it("extrae mensaje de JSON en respuesta de error", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      text: () => Promise.resolve(JSON.stringify({ message: "Datos inválidos" })),
    });

    await expect(request("/datos")).rejects.toThrow("Datos inválidos");
  });

  it("no incluye Authorization cuando no se provee token", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await request("/publico");
    const headers = global.fetch.mock.calls[0][1].headers;
    expect(headers["Authorization"]).toBeUndefined();
  });
});
