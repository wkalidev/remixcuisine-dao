'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { ConnectButton } from '@/components/ConnectButton';
import { LUCKY_DRAW_ABI, LUCKY_DRAW_ADDRESS, USDC_ADDRESS } from '@/lib/constants';

export function LuckyDrawCard() {
  const { address, isConnected } = useAccount();
  const [isEntering, setIsEntering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleEnterDraw = async () => {
    if (!isConnected) return;

    try {
      setIsEntering(true);

      // Prix d'entrée: 0.1 USDC
      const entryFee = parseUnits('0.1', 6); // USDC a 6 décimales

      writeContract({
        address: LUCKY_DRAW_ADDRESS,
        abi: LUCKY_DRAW_ABI,
        functionName: 'enterDraw',
        args: [entryFee],
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error entering draw:', error);
    } finally {
      setIsEntering(false);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 border-glow-pink">
      {/* Prize Pool */}
      <div className="text-center mb-8">
        <p className="text-gray-400 mb-2">Today's Prize Pool</p>
        <div className="text-6xl font-bold text-glow-cyan animate-glow">
          50 <span className="text-3xl">USDC</span>
        </div>
      </div>

      {/* Entry Fee */}
      <div className="bg-cyber-dark rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Entry Fee</p>
            <p className="text-2xl font-bold text-neon-pink">0.1 USDC</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Draw Time</p>
            <p className="text-xl font-bold text-neon-cyan">23:59 UTC</p>
          </div>
        </div>
      </div>

      {/* Entries Counter */}
      <div className="text-center mb-6">
        <div className="inline-block glass-effect rounded-full px-6 py-3">
          <span className="text-gray-400">Total Entries: </span>
          <span className="text-2xl font-bold text-neon-cyan">247</span>
        </div>
      </div>

      {/* Enter Button */}
      {!isConnected ? (
        <ConnectButton />
      ) : (
        <button
          onClick={handleEnterDraw}
          disabled={isEntering || isConfirming}
          className="w-full py-4 rounded-xl font-bold text-lg
                   bg-gradient-to-r from-neon-pink to-neon-purple
                   hover:shadow-neon-pink transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform hover:scale-105"
        >
          {isEntering || isConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Processing...
            </span>
          ) : (
            '🎲 Enter Lucky Draw'
          )}
        </button>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500 text-center animate-pulse">
          ✅ Successfully entered! Good luck!
        </div>
      )}

      {/* How it works */}
      <div className="mt-8 p-6 glass-effect rounded-xl">
        <h3 className="text-lg font-bold text-neon-cyan mb-4">📋 How it works</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-neon-pink">•</span>
            <span>Pay 0.1 USDC to enter today's draw</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-pink">•</span>
            <span>Winner selected daily at 23:59 UTC</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-pink">•</span>
            <span>Winner takes 90% of prize pool</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-pink">•</span>
            <span>10% goes to DAO treasury</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
