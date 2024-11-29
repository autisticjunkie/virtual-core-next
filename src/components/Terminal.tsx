'use client';

import { useEffect, useRef } from 'react';
import { useVirtualCore } from '@/hooks/useVirtualCore';
import 'xterm/css/xterm.css';

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { initializeTerminal, cleanup } = useVirtualCore();

  useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    // Ensure container has dimensions before initializing
    container.style.width = '100%';
    container.style.height = '100vh';

    initializeTerminal(container);

    return () => {
      cleanup();
    };
  }, [initializeTerminal, cleanup]);

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        ref={terminalRef}
        className="w-full h-full"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        }}
      />
    </div>
  );
}
