'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Terminal } from 'xterm';

interface TerminalContextType {
  terminal: Terminal | null;
  setTerminal: (term: Terminal | null) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [terminal, setTerminal] = useState<Terminal | null>(null);

  return (
    <TerminalContext.Provider
      value={{
        terminal,
        setTerminal,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
