// utils/auth.ts
export async function getToken(): Promise<string | null> {
  try {
    const res = await fetch('http://localhost:4000/sso-check', {
      credentials: 'include'  // Sends cookie
    });

    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    }
  } catch (err) {
    console.warn('SSO check failed:', err);
  }
  return null;
}

export async function fetchProducts(
  app: 'tamasha' | 'cricket',
  token: string
): Promise<string[]> {
  const res = await fetch(`http://localhost:4000/products/${app}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}