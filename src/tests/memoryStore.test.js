import { describe, it, expect, beforeEach } from "vitest";
import {
  getMemoryItem,
  setMemoryItem,
  removeMemoryItem,
  getMemoryJSON,
  setMemoryJSON,
} from "../utils/memoryStore";

describe("memoryStore", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("setMemoryItem y getMemoryItem funcionan", () => {
    setMemoryItem("clave", "valor");
    expect(getMemoryItem("clave")).toBe("valor");
  });

  it("getMemoryItem retorna null si no existe", () => {
    expect(getMemoryItem("no_existe_xyz")).toBeNull();
  });

  it("removeMemoryItem elimina el item", () => {
    setMemoryItem("borrar", "data");
    removeMemoryItem("borrar");
    expect(getMemoryItem("borrar")).toBeNull();
  });

  it("setMemoryJSON guarda como JSON y getMemoryJSON recupera", () => {
    const obj = { nombre: "Carlos", edad: 30 };
    setMemoryJSON("usuario", obj);
    const resultado = getMemoryJSON("usuario");
    expect(resultado).toEqual(obj);
  });

  it("getMemoryJSON retorna fallback si no existe", () => {
    expect(getMemoryJSON("no_existe_xyz", "default")).toBe("default");
  });

  it("getMemoryJSON retorna null por defecto si no existe", () => {
    expect(getMemoryJSON("no_existe_xyz")).toBeNull();
  });

  it("getMemoryJSON maneja JSON inválido retornando fallback", () => {
    sessionStorage.setItem("invalido", "no-es-json{");
    expect(getMemoryJSON("invalido", null)).toBeNull();
  });

  it("setMemoryItem persiste en sessionStorage", () => {
    setMemoryItem("persistir", "valor123");
    expect(sessionStorage.getItem("persistir")).toBe("valor123");
  });

  it("removeMemoryItem elimina de sessionStorage", () => {
    setMemoryItem("quitar", "x");
    removeMemoryItem("quitar");
    expect(sessionStorage.getItem("quitar")).toBeNull();
  });
});
