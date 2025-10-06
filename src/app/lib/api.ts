// src/app/lib/api.ts
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `/api${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}