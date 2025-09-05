import { getToken } from "../auth";

const API_BASE = "http://localhost:8000";
const baseURL  = `${API_BASE}/api/customers`;


async function authFetch(url, init = {}) {
  const token = getToken(); // grab token from login
  const headers = new Headers(init.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(url, { ...init, headers });
}


async function parse(res) {
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    const www = res.headers.get("www-authenticate");
    throw new Error(www || msg || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (res.status === 204) return null;
  return ct.includes("application/json") ? res.json() : res.text();
}

export async function getAll() {
  const res = await authFetch(baseURL, { method: "GET" });
  return parse(res);
}

// call to add customer
export async function create(customer) {
  const res = await authFetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return parse(res);
}


// call to update customer
export async function update(customer) {
  const res = await authFetch(`${baseURL}/${customer.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return parse(res);
}


// call to remove customer
export async function remove(id) {
  const res = await authFetch(`${baseURL}/${id}`, { method: "DELETE" });
  await parse(res);
  return true;
}
