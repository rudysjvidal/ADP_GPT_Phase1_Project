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
  if (!res.ok) throw new Error(text || `Login failed (${res.status})`);

  let token = text;
  try {
    const data = JSON.parse(text);
    token = data.access_token || data.token || data.jwt || data.id_token || "";
  } catch {}

  if (!token) throw new Error("Token missing in response");

  localStorage.setItem(KEY, token);
  return token;
}

export function getToken() {
  return localStorage.getItem(KEY);
}





// // auth.js
// const TOKEN_URL = "http://localhost:9000/token";
// const ACCESS_TOKEN_KEY = "access_token";

// export function getToken() {
//   return localStorage.getItem(ACCESS_TOKEN_KEY);
// }

// export async function getTokenClientCredentials({
//       clientId= "bruce.wayne@example.com",
//       clientSecret= "batman",
//       scope= "read"
// } = {}) {
//   const basic = btoa(`${clientId}:${clientSecret}`);
//   const res = await fetch(TOKEN_URL, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${basic}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "text/plain, application/json;q=0.9, */*;q=0.1",
//     },
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//       scope,
//     }),
//   });

//   const body = (await res.text()).trim();
//   if (!res.ok) throw new Error(body || `Auth failed (${res.status})`);

//   // body is the token (optionally quoted); strip quotes/newlines/spaces
//   const token = body.replace(/^"+|"+$/g, "");
//   localStorage.setItem(ACCESS_TOKEN_KEY, token);
//   return token;
// }
