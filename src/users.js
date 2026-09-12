// Demo service for the IOU playground.
export async function fetchUser(id) {
  const url = `https://api.example.com/users/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetchUser failed: ${res.status}`);
  const body = await res.json();
  return body;
}

// Tidy: no behaviour change here either.
export function formatName(user) {
  return `${user.first} ${user.last}`.trim();
}
