// Demo service for the IOU playground.
export async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error(`fetchUser failed: ${res.status}`);
  const data = await res.json();
  return data;
}

export function formatName(user) {
  return `${user.first} ${user.last}`.trim();
}
