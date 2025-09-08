import { getToken } from "../auth";

const API_BASE = "http://localhost:8000";
const baseURL  = `${API_BASE}/api/events`;

async function authFetch(url, init = {}) {
  const token = getToken(); // grab token from login
  const headers = new Headers(init.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(url, { ...init, headers });
}

// looking for potential errors (anything that is not a response in the 200's)
async function parse(res) {
  const body = await res.text().catch(() => "");
  if (!res.ok) throw new Error(body || `HTTP ${res.status}`);
  if (!body) return null;
  try { return JSON.parse(body); } catch { return body; }
}

export async function getAll() {
  const res = await authFetch(baseURL, { method: "GET" });
  return parse(res);
}

export async function create(event) {
  const res = await authFetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return parse(res); // expect saved event JSON (with _id)
}

// Use _id here. If your backend uses `id` instead, change to event.id.
export async function update(event) {
  const res = await authFetch(`${baseURL}/${event._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return parse(res);
}

export async function remove(id) {
  const res = await authFetch(`${baseURL}/${id}`, { method: "DELETE" });
  await parse(res);
  return true;
}
