'use client';

import { useSearchParams } from 'next/navigation';
import { JSX, useEffect } from 'react';

export default function CallbackPage(): JSX.Element {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const client_id = searchParams.get('client_id');

  useEffect(() => {
    const exchange = async () => {
      if (!code || !client_id) return;

      const res = await fetch('http://localhost:4000/token', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, client_id }),
      });

      if (res.ok) {
        window.opener?.postMessage('login-success', '*');
        window.close();
      }
    };
    exchange();
  }, [code, client_id]);

  return <div className="p-6 text-center">Completing login...</div>;
}