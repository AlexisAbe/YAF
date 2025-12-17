export async function fetchCreatives(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`/api/creatives${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch creatives");
  return res.json();
}

export async function createCreative(payload) {
  const res = await fetch(`/api/creatives`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create creative");
  return res.json();
}

export async function updateCreative(id, payload) {
  const res = await fetch(`/api/creatives/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update creative");
  return res.json();
}

export async function deleteCreative(id) {
  const res = await fetch(`/api/creatives/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete creative");
  return res.json();
}
