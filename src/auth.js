const TOKEN_URL = "http://localhost:9000/token";
const KEY = "access_token";

// Uses basic auth to validate
export async function loginBasic({ email, password }) {
  // Makes sure its basic
  const basic = btoa(`${email}:${password}`);

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      Accept: "text/plain, application/json"
    }
  });

  const text = (await res.text()).trim();

  // For debugging if needed
  /*if (!res.ok) throw new Error(text || `Login failed (${res.status})`);*/

  if (!res.ok) throw new Error(`Login failed.`);

  let token = text;
  
  // If we recieve json instead of plantext use below
  /*try {
    const data = JSON.parse(text);
    token = data.access_token || data.token || data.jwt || data.id_token || "";
  } catch {}*/

  if (!token) throw new Error("Token missing in response");

  localStorage.setItem(KEY, token);
  return token;
}

export function getToken() {
  return localStorage.getItem(KEY);
} 