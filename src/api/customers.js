const baseURL = "https://adp-gpt-phase1-project-backend.onrender.com/customers";

export async function getAll() {
  const res = await fetch(baseURL);
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

// call to add customer
export async function create(customer) {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}


// call to update customer
// using PATCH because I wanted to test if it works as well as PUT
export async function update(customer) {
  const res = await fetch(`${baseURL}/${customer.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to update customer");
  return res.json();
}


// call to remove customer
export async function remove(id) {
  const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete customer");
  return true;
}
