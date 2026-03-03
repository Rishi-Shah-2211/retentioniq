export async function fetcher<T>(endpoint: string): Promise<T> {
  const res = await fetch(
    `http://localhost:5000/api/dashboard${endpoint}`
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}