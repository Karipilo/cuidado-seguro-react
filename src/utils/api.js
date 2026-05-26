/**
 * Centralizado de configuración de API.
 * Lee desde variable de entorno VITE_BFF_URL en .env
 * Valor por defecto: http://localhost:8090
 */

const BFF_URL =
  import.meta.env?.VITE_BFF_URL || "http://localhost:8090";

export async function request(
  endpoint,
  { method = "GET", body, token, ...rest } = {}
) {
  const headers = {
    "Content-Type": "application/json",
    ...(rest.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    ...rest,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${BFF_URL}${endpoint}`, config);

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Error HTTP ${res.status}`);
  }

  return res.json();
}

export { BFF_URL };
