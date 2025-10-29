'use client';

import { getToken, fetchProducts } from '@/utils/auth';
import { JSX, useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:4000/jazz-auth-sdk.js';
    script.async = true;
    script.onload = () => {
      window.JazzAuth?.init({
        clientId: 'cricket',
        containerId: 'jazz-auth-container',
        buttonColor: '#16a34a', // Green
        onLogin: () => {
          loadSession();
        },
      });
    };
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const loadSession = async () => {
    setLoading(true);
    const token = await getToken();
    if (token) {
      try {
        const data = await fetchProducts('cricket', token);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Checking session...</div>;
  }

  if (products.length > 0) {
    return (
      <div className="p-8 max-w-md mx-auto bg-green-50 rounded-xl">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Jazz Cricket (Logged In)</h1>
        <ul className="space-y-2">
          {products.map(p => (
            <li key={p} className="bg-white p-3 rounded border">{p}</li>
          ))}
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