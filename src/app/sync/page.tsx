'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Sync() {
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
        <h1 className="text-2xl mb-8">SYNCHRONIZING WITH THE VIRTUAL CORE</h1>
        <p className="text-lg mb-4">
          Analyzing digital signature...
        </p>
        <div className="w-64 h-2 bg-[#00ff00]/20 mx-auto">
          <div className="h-full bg-[#00ff00] animate-[progress_3s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-sm animate-pulse mt-8">Returning to terminal in a few seconds...</p>
      </div>
    </div>
  );
}
