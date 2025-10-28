// utils/auth.ts
export async function getToken(): Promise<string | null> {
  // const local = typeof window !== 'undefined' ? localStorage.getItem('jazz_token') : null;
  // if (local) return local;

  try {
    const res = await fetch('http://localhost:4000/sso-check', {
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      const token = data.access_token;
      localStorage.setItem('jazz_token', token);
      return token;
    }
  } catch (err) {
    console.warn('SSO check failed:', err);
  }
  return null;
}

export async function fetchProducts(app: 'tamasha' | 'cricket', token: string): Promise<string[]> {
  const res = await fetch(`http://localhost:4000/products/${app}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}