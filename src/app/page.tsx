'use client';

import { getToken, fetchProducts } from '@/utils/auth';
import { JSX, useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:4000/jazz-auth-sdk.js';
    script.async = true;
    script.onload = () => {
      window.JazzAuth?.init({
        clientId: 'cricket',
        containerId: 'jazz-auth-container',
        buttonColor: '#16a34a',
        onLogin: (t) => {
          setToken(t);
          fetchProducts('cricket', t).then(setProducts).catch(console.error);
        },
      });
    };
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    const load = async () => {
      const t = await getToken();
      setToken(t);
      if (t) fetchProducts('cricket', t).then(setProducts).catch(console.error);
    };
    load();
  }, []);

  if (token) {
    return (
      <div className="p-8 max-w-md mx-auto bg-green-50 rounded-xl">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Jazz Cricket (Logged In)</h1>
        <ul className="space-y-2">
          {products.map(p => <li key={p} className="bg-white p-3 rounded border">{p}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Jazz Cricket POC</h1>
      <div id="jazz-auth-container"></div>
    </div>
  );
}