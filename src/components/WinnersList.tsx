'use client';

export function WinnersList() {
  // Mock data - remplace avec de vraies données du contract
  const recentWinners = [
    { address: '0x742d...E6Ba', amount: '85.5', date: 'Jan 22, 2026', emoji: '🏆' },
    { address: '0x5C4f...A892', amount: '92.3', date: 'Jan 21, 2026', emoji: '🎉' },
    { address: '0x8B3d...C4f1', amount: '78.9', date: 'Jan 20, 2026', emoji: '🌟' },
    { address: '0x1A2b...D5e6', amount: '104.2', date: 'Jan 19, 2026', emoji: '💎' },
    { address: '0x9F8e...B3c4', amount: '67.8', date: 'Jan 18, 2026', emoji: '✨' },
  ];

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-glow-cyan">
          🏆 Recent Winners
        </h2>
        <div className="text-sm text-gray-400">
          Last 5 draws
        </div>
      </div>

      <div className="space-y-4">
        {recentWinners.map((winner, index) => (
          <div
            key={index}
            className="bg-cyber-dark rounded-xl p-4 hover:bg-cyber-dark/80 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{winner.emoji}</div>
                <div>
                  <p className="font-mono text-neon-cyan font-bold">
                    {winner.address}
                  </p>
                  <p className="text-sm text-gray-400">{winner.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-pink">
                  {winner.amount}
                </p>
                <p className="text-sm text-gray-400">USDC</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-3 rounded-xl glass-effect hover:bg-white/10 transition-colors text-neon-cyan font-semibold">
        View All Winners →
      </button>
    </div>
  );
}
