const baseURL = "https://adp-gpt-phase1-project-backend.onrender.com/users";

export async function getAll() {
  const res = await fetch(baseURL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}