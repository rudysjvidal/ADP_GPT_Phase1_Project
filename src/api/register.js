const REGISTER_URL = "http://localhost:9000/register";

export async function register({ name, email, password }) {
  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "text/plain, application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const text = (await res.text()).trim();
  if (!res.ok) throw new Error(text || `Register failed (${res.status})`);
  try { return JSON.parse(text); } catch { return null; }
}
