/**
 * Centralizado de configuración de API.
 * Lee desde variable de entorno VITE_BFF_URL en .env
 * Valor por defecto: 
 */

const BFF_URL =
  import.meta.env?.VITE_BFF_URL || "http://localhost:8090/bff";

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

  const res = await fetch(`${BFF_URL}${endpoint}`, config);

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

export { BFF_URL };
