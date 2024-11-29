'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Connect() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/terminal');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]); // Added router to dependencies

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-black text-[#00ff00] font-mono">
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-2xl mb-8">CONNECTING TO THE VIRTUAL CORE</h1>
        <p className="text-lg mb-4">
          Establishing secure connection to the Virtual Core network...
        </p>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-[#00ff00] animate-ping"></div>
          <div className="w-3 h-3 bg-[#00ff00] animate-ping delay-100"></div>
          <div className="w-3 h-3 bg-[#00ff00] animate-ping delay-200"></div>
        </div>
        <p className="text-sm animate-pulse mt-8">Returning to terminal in a few seconds...</p>
      </div>
    </div>
  );
}
