'use client';

import Image from 'next/image';
import { JSX, useState } from 'react';

interface Props {
  appId: string;
}

export function JazzAuthButton({ appId }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const login = () => {
    setLoading(true);
    const redirectUri = `${window.location.origin}/callback`;
    const authUrl = `http://localhost:4000/auth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    const popup = window.open(authUrl, 'jazz-login', 'width=500,height=600');

    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        setLoading(false);
        window.location.reload();
      }
    }, 500);
  };

  return (
    <button
      onClick={login}
      disabled={loading}
      className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60 transition"
    >
      <Image src="/jazz-logo.png" alt="Jazz" width={20} height={20} />
      {loading ? 'Opening...' : 'Continue with Jazz'}
    </button>
  );
}