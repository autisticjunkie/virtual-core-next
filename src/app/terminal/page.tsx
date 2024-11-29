'use client';

import dynamic from 'next/dynamic';

// Dynamically import Terminal with no SSR to avoid xterm.js issues
const Terminal = dynamic(() => import('@/components/Terminal'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-green-500 font-mono">
      Initializing Virtual Core...
    </div>
  ),
});

export default function TerminalPage() {
  return <Terminal />;
}
