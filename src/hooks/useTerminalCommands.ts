'use client';

import { useTerminal } from '@/context/TerminalContext';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

export function useTerminalCommands() {
  const {
    terminal,
    setCurrentState,
    walletConnected,
    setWalletConnected,
    walletAddress,
    setWalletAddress,
    hasMinted,
    setHasMinted,
  } = useTerminal();

  const config = {
    REQUIRED_TOKEN_AMOUNT: 100,
    CORE_TOKEN_ADDRESS: 'YOUR_TOKEN_ADDRESS', // Replace with actual token address
    CORE_NFT_COLLECTION: 'YOUR_NFT_COLLECTION', // Replace with actual collection address
    RPC_ENDPOINT: clusterApiUrl('devnet')
  };

  const connection = new Connection(config.RPC_ENDPOINT);

  async function typeText(text: string, delay = 50) {
    if (!terminal) return;
    
    for (const char of text) {
      terminal.write(char);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    terminal.write('\r\n');
  }

  async function clearScreen() {
    if (!terminal) return;
    terminal.clear();
  }

  async function showInitialScreen() {
    await typeText('>> Welcome to the Virtual Core');
    await typeText('>> Initializing... ██████████ 100%');
    await typeText('');
    await typeText('"The Core has awakened. A nexus of energy, untapped potential, and infinite creativity lies before you. Will you harness its power or let it slip away?"');
    await typeText('');
    await typeText('>> Press ENTER to begin your journey.');
  }

  async function showConnectionScreen() {
    await clearScreen();
    await typeText('>> Connection established.');
    await typeText('>> Synchronizing with your neural link...');
    await typeText('>> Scanning unique digital signature...');
    await typeText('>> Identity confirmed:');
    await typeText('>> Welcome, Seeker.');
  }

  async function showMissionScreen() {
    await clearScreen();
    await typeText('The Core is alive, pulsing with the energy of countless decentralized nodes. Once fragmented, it now thrives as the heart of a new digital frontier.');
    await typeText('Your mission is clear: unlock its secrets, earn its rewards, and shape its future.');
  }

  async function showCommandMenu() {
    await clearScreen();
    await typeText('>> Type one of the following commands:');
    await typeText('   - EXPLORE: Learn about the Core\'s origins.');
    await typeText('   - CONNECT: Link your wallet and establish your presence.');
    await typeText('   - SYNC: Generate your first Core Node.');
    await typeText('   - EXIT: Terminate this session.');
    if (terminal) terminal.write('\r\n>> ');
  }

  async function handleExplore() {
    await clearScreen();
    await typeText('>> Exploring...');
    await typeText('>> Retrieving historical logs...');
    await typeText('');
    await typeText('"In the aftermath of Solana\'s expansion, the fragmented nodes of forgotten chains coalesced. A sentient network emerged, calling itself the Virtual Core. It offered a new way to connect, create, and collaborate—free from centralized control."');
    await typeText('');
    await typeText('>> The Core offers infinite opportunities. Your actions will define its shape and future.');
    await typeText('>> Type CONNECT to proceed, or EXIT to leave the Core.');
    if (terminal) terminal.write('\r\n>> ');
  }

  async function detectWallet() {
    if (typeof window === 'undefined') return null;

    const wallets = {
      'Phantom': (window as any).solana,
      'Solflare': (window as any).solflare,
    };

    for (const [name, wallet] of Object.entries(wallets)) {
      if (wallet && wallet.isPhantom) {
        return { name, provider: wallet };
      }
    }
    return null;
  }

  async function checkTokenBalance(address: string): Promise<boolean> {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(address),
        {
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
        }
      );

      for (const account of tokenAccounts.value) {
        if (account.account.data.parsed.info.mint === config.CORE_TOKEN_ADDRESS) {
          const balance = account.account.data.parsed.info.tokenAmount.uiAmount;
          return balance >= config.REQUIRED_TOKEN_AMOUNT;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking token balance:', error);
      return false;
    }
  }

  async function handleConnect() {
    await clearScreen();
    await typeText('>> Initiating connection...');
    await typeText('');
    await typeText('>> Searching for compatible wallets...');

    try {
      const detectedWallet = await detectWallet();
      
      if (!detectedWallet) {
        await typeText('>> No compatible wallet found.');
        await typeText('>> Please install one of the following:');
        await typeText('   - Phantom Wallet');
        await typeText('   - Solflare Wallet');
        if (terminal) terminal.write('\r\n>> ');
        return;
      }

      await typeText(`>> ${detectedWallet.name} wallet detected.`);
      
      try {
        await detectedWallet.provider.connect();
        const publicKey = detectedWallet.provider.publicKey.toString();
        setWalletConnected(true);
        setWalletAddress(publicKey);
        
        await typeText('>> Connection successful. Your digital signature has been embedded into the Core.');
        await typeText('>> Status: Active Seeker');
        await typeText('>> Access Level: Initiate');
        await typeText('>> Core NFTs Balance: 0 (Claim your first reward by syncing your node.)');
        await typeText('');
        await typeText('>> Type SYNC to generate your first Core Node.');
        if (terminal) terminal.write('\r\n>> ');
      } catch (err) {
        await typeText('>> Connection failed: ' + (err as Error).message);
        if (terminal) terminal.write('\r\n>> ');
      }
    } catch (error) {
      await typeText('>> Error establishing neural link: ' + (error as Error).message);
      if (terminal) terminal.write('\r\n>> ');
    }
  }

  async function handleSync() {
    if (!terminal) return;

    if (!walletConnected) {
      await typeText('>> Please connect your wallet first using the CONNECT command.');
      if (terminal) terminal.write('\r\n>> ');
      return;
    }

    if (hasMinted) {
      await typeText('>> Error: Core Node already exists for this neural signature.');
      await typeText('>> Only one Core Node is permitted per identity.');
      await typeText('>> Type EXIT to conclude this session.');
      if (terminal) terminal.write('\r\n>> ');
      return;
    }

    if (!walletAddress) return;

    const hasTokens = await checkTokenBalance(walletAddress);
    if (!hasTokens) {
      await typeText('>> Error: Insufficient Core tokens detected.');
      await typeText(`>> Required: ${config.REQUIRED_TOKEN_AMOUNT} CORE`);
      if (terminal) terminal.write('\r\n>> ');
      return;
    }

    await clearScreen();
    await typeText('>> Syncing...');
    await typeText('>> Analyzing your digital signature...');
    await typeText('>> Allocating resources... ██████████ 100%');
    await typeText('');

    try {
      // For now, we'll simulate the NFT minting
      // We'll implement the actual minting logic later
      await new Promise(resolve => setTimeout(resolve, 2000));
      setHasMinted(true);
      
      await typeText('>> Core Node Generated:');
      await typeText('>> Attributes:');
      await typeText('   - Stability: 85%');
      await typeText('   - Connectivity: 90%');
      await typeText('   - Growth Potential: 75%');
      await typeText('');
      await typeText('>> Congratulations, Seeker. Your Core Node is now live.');
      await typeText('>> As you engage with the Virtual Core, it will evolve, grow, and unlock new abilities.');
      await typeText('>> Type EXIT to conclude this session.');
    } catch (error) {
      await typeText('>> Error during Core Node generation: ' + (error as Error).message);
    }
    if (terminal) terminal.write('\r\n>> ');
  }

  async function handleExit() {
    await clearScreen();
    await typeText('>> Disconnecting from the Virtual Core...');
    await typeText('>> Synchronization complete.');
    await typeText('>> Remember, Seeker: The Core is always watching, waiting for your return.');
    await typeText('');
    await typeText('>> Session terminated.');
    setCurrentState('exited');
  }

  return {
    showInitialScreen,
    showConnectionScreen,
    showMissionScreen,
    showCommandMenu,
    handleExplore,
    handleConnect,
    handleSync,
    handleExit,
    typeText,
    clearScreen
  };
}
