// Demo service for the IOU playground.
export async function fetchUser(id, { retries = 3, backoffMs = 200 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`https://api.example.com/users/${id}`);
      if (res.status >= 500 && attempt < retries) throw new Error(`retryable ${res.status}`);
      if (!res.ok) throw new Error(`fetchUser failed: ${res.status}`);
      return res.json();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
      await new Promise((r) => setTimeout(r, backoffMs * 2 ** attempt));
    }
  }
  throw lastError;
}

export function formatName(user) {
  return `${user.first} ${user.last}`.trim();
}
