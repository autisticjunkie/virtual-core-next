import { useRef, useState, useCallback } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useRouter } from 'next/navigation';

export function useVirtualCore() {
    const router = useRouter();
    const terminalRef = useRef<Terminal | null>(null);
    const fitAddonRef = useRef<FitAddon | null>(null);
    const [currentState, setCurrentState] = useState<'intro' | 'command' | 'exited'>('intro');
    const initialized = useRef(false);
    const containerRef = useRef<HTMLElement | null>(null);

    const write = useCallback((text: string) => {
        if (!terminalRef.current) return;
        terminalRef.current.write(text);
    }, []);

    const writeLine = useCallback((text: string) => {
        if (!terminalRef.current) return;
        terminalRef.current.writeln(text);
    }, []);

    const typeText = useCallback(async (text: string, delay = 30) => {
        if (!terminalRef.current) return;
        for (const char of text) {
            write(char);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        write('\r\n');
    }, [write]);

    const handleCommand = useCallback(async (command: string) => {
        if (!terminalRef.current) return;

        switch (command.toUpperCase()) {
            case 'EXPLORE':
                writeLine('>> Initiating exploration sequence...');
                writeLine('>> Loading virtual environment...');
                setTimeout(() => router.push('/explore'), 2000);
                break;

            case 'CONNECT':
                writeLine('>> Initializing wallet connection...');
                writeLine('>> Please approve the connection request in your wallet...');
                setTimeout(() => router.push('/connect'), 2000);
                break;

            case 'SYNC':
                writeLine('>> Synchronizing with the Virtual Core...');
                writeLine('>> Checking wallet balance...');
                setTimeout(() => router.push('/sync'), 2000);
                break;

            case 'EXIT':
                writeLine('>> Terminating session...');
                writeLine('>> Goodbye.');
                setCurrentState('exited');
                setTimeout(() => router.push('/'), 2000);
                break;

            default:
                writeLine('>> Unknown command. Available commands:');
                writeLine('   EXPLORE - Begin your journey');
                writeLine('   CONNECT - Connect your wallet');
                writeLine('   SYNC    - Synchronize with the Core');
                writeLine('   EXIT    - End session');
                writeLine('');
                write('>> ');
        }
    }, [router, writeLine, write]);

    const showCommandMenu = useCallback(async () => {
        writeLine('>> Available commands:');
        writeLine('   EXPLORE - Begin your journey');
        writeLine('   CONNECT - Connect your wallet');
        writeLine('   SYNC    - Synchronize with the Core');
        writeLine('   EXIT    - End session');
        writeLine('');
        write('>> ');
    }, [writeLine, write]);

    const showIntroSequence = useCallback(async () => {
        if (!terminalRef.current) return;
        terminalRef.current.clear();
        
        await typeText('>> Welcome to the Virtual Core');
        await typeText('>> Initializing... ██████████ 100%');
        await typeText('');
        await typeText('"The Core has awakened. A nexus of energy, untapped potential, and infinite creativity lies before you. Will you harness its power or let it slip away?"');
        await typeText('');
        await typeText('>> Press ENTER to begin your journey.');
    }, [typeText]);

    const setupEventListeners = useCallback(() => {
        if (!terminalRef.current) return;

        let currentInput = '';
        terminalRef.current.onData((data) => {
            if (currentState === 'exited') return;

            if (data === '\r') { // Enter key
                if (currentState === 'intro') {
                    setCurrentState('command');
                    writeLine('');
                    showCommandMenu();
                } else if (currentState === 'command') {
                    const command = currentInput.trim();
                    writeLine('');
                    currentInput = '';
                    handleCommand(command);
                }
            } else if (data === '\x7f') { // Backspace
                if (currentInput.length > 0 && currentState === 'command') {
                    currentInput = currentInput.slice(0, -1);
                    write('\b \b');
                }
            } else if (data >= ' ' && data <= '~' && currentState === 'command') {
                currentInput += data;
                write(data);
            }
        });
    }, [currentState, handleCommand, showCommandMenu, write, writeLine]);

    const handleResize = useCallback(() => {
        if (!terminalRef.current || !fitAddonRef.current || !containerRef.current) return;

        try {
            const { clientWidth, clientHeight } = containerRef.current;
            const cols = Math.max(80, Math.floor(clientWidth / 10));
            const rows = Math.max(24, Math.floor(clientHeight / 20));
            
            terminalRef.current.resize(cols, rows);
            fitAddonRef.current.fit();
        } catch (e) {
            console.error('Error resizing terminal:', e);
        }
    }, []);

    const initializeTerminal = useCallback((element: HTMLElement) => {
        if (initialized.current) return;
        containerRef.current = element;

        const term = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: 'Courier New',
            theme: {
                background: '#000000',
                foreground: '#00ff00',
                cursor: '#00ff00'
            },
            allowTransparency: true,
            rows: 24,
            cols: 80
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        
        terminalRef.current = term;
        fitAddonRef.current = fitAddon;

        // Open terminal and wait for it to be ready
        term.open(element);
        
        // Initialize after a short delay to ensure proper mounting
        setTimeout(() => {
            if (terminalRef.current && fitAddonRef.current) {
                handleResize();
                setupEventListeners();
                showIntroSequence();
                
                // Add window resize listener
                window.addEventListener('resize', handleResize);
            }
        }, 100);

        initialized.current = true;
    }, [handleResize, setupEventListeners, showIntroSequence]);

    const cleanup = useCallback(() => {
        window.removeEventListener('resize', handleResize);
        
        if (terminalRef.current) {
            terminalRef.current.dispose();
            terminalRef.current = null;
        }
        
        if (fitAddonRef.current) {
            fitAddonRef.current = null;
        }
        
        containerRef.current = null;
        initialized.current = false;
    }, [handleResize]);

    return {
        initializeTerminal,
        handleResize,
        currentState,
        cleanup
    };
}
