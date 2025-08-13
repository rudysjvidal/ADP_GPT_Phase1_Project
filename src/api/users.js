const baseURL = "http://localhost:4000/users";

export async function getAll() {
  const res = await fetch(baseURL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}