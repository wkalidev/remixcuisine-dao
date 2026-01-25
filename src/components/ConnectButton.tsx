'use client';

import { ConnectWallet, Wallet, WalletDropdown } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';

export function ConnectButton() {
  const { address } = useAccount();

  if (address) {
    return (
      <Wallet>
        <WalletDropdown>
          <div className="px-4 py-2 text-sm text-gray-400">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </WalletDropdown>
      </Wallet>
    );
  }

  return (
    <ConnectWallet
      className="w-full py-4 rounded-xl font-bold text-lg
               bg-gradient-to-r from-neon-cyan to-neon-purple
               hover:shadow-neon-cyan transition-all duration-300
               transform hover:scale-105"
    >
      <span>🔐 Connect Wallet</span>
    </ConnectWallet>
  );
}
