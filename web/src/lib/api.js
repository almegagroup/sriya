const API_BASE = import.meta.env.VITE_API_BASE || "/api";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { ...options });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  hello: () => request("/hello"),
  list: (limit = 5) => request(`/fs/list?limit=${limit}`),
  me: async (idToken) =>
    request("/me", { headers: { Authorization: `Bearer ${idToken}` } }),
};
