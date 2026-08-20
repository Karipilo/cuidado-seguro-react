/**
 * Centralizado de configuración de API.
 * El frontend solo conoce el dominio de AWS API Gateway (VITE_API_BASE_URL),
 * que enruta hacia el BFF. Nunca las URLs del BFF ni de los microservicios.
 */

const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "http://localhost:8090/bff";

function extractCleanMessage(text) {
  if (!text) return "";
  let current = text.trim();
  
  try {
    const parsed = JSON.parse(current);
    if (parsed && typeof parsed === "object") {
      const nextMsg = parsed.message || parsed.error;
      if (nextMsg && nextMsg !== text) {
        return extractCleanMessage(nextMsg);
      }
    }
  } catch (e) {
    const jsonStart = current.indexOf('{');
    const jsonEnd = current.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const possibleJson = current.substring(jsonStart, jsonEnd + 1);
      try {
        const parsed = JSON.parse(possibleJson);
        if (parsed && typeof parsed === "object") {
          const nextMsg = parsed.message || parsed.error;
          if (nextMsg && nextMsg !== text) {
            return extractCleanMessage(nextMsg);
          }
        }
      } catch (e2) {
        // Ignore and fallback
      }
    }
  }
  return current;
}

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

  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    let msg = "";
    try {
      const text = await res.text();
      msg = extractCleanMessage(text) || `Error HTTP ${res.status}`;
    } catch {
      msg = `Error HTTP ${res.status}`;
    }
    throw new Error(msg);
  }

  return res.json();
}

export { API_BASE_URL };
