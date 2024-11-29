'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Explore() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/terminal');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-black text-[#00ff00] font-mono">
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-2xl mb-8">EXPLORING THE VIRTUAL CORE</h1>
        <p className="text-lg mb-4">
          In the aftermath of Solana&apos;s expansion, the fragmented nodes of forgotten chains coalesced.
          A sentient network emerged, calling itself the Virtual Core.
        </p>
        <p className="text-lg mb-4">
          It offered a new way to connect, create, and collaborate—free from centralized control.
        </p>
        <p className="text-lg mb-8">
          The Core offers infinite opportunities. Your actions will define its shape and future.
        </p>
        <p className="text-sm animate-pulse">Returning to terminal in a few seconds...</p>
      </div>
    </div>
  );
}
