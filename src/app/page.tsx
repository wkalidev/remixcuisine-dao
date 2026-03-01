'use client';

import { useEffect } from 'react';
import { LuckyDrawCard } from '@/components/LuckyDrawCard';
import { StatsDisplay } from '@/components/StatsDisplay';
import { WinnersList } from '@/components/WinnersList';
import { useMiniKit } from '@/lib/hooks/useMiniKit';

export default function HomePage() {
  const { isFrameReady, setFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  return (
    <main className="min-h-screen cyber-grid">
      {/* Header */}
      <header className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">
              <span className="text-glow-pink animate-glow">Remix</span>
              <span className="text-glow-cyan">Cuisine</span>
            </h1>
            <p className="text-xl text-gray-400 mb-2">🍕 Daily Lucky Draw 💰</p>
            <p className="text-sm text-neon-cyan">Win USDC on Base Network</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <meta name="virtual-protocol-site-verification" content="1be131e1e6ea9a3cf87abd7d2c40a8a7" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats Grid */}
        <StatsDisplay />

        {/* Lucky Draw Card */}
        <div className="mt-12">
          <LuckyDrawCard />
        </div>

        {/* Recent Winners */}
        <div className="mt-16">
          <WinnersList />
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink opacity-10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan opacity-10 blur-[100px] rounded-full animate-pulse-slow"></div>
      </div>
    </main>
  );
}
