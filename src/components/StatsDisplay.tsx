'use client';

export function StatsDisplay() {
  const stats = [
    { label: 'Total Prize Paid', value: '12,450', unit: 'USDC', color: 'neon-pink' },
    { label: 'Total Participants', value: '3,247', unit: '', color: 'neon-cyan' },
    { label: 'Daily Draws', value: '156', unit: 'days', color: 'neon-purple' },
    { label: 'Avg. Prize Pool', value: '79.8', unit: 'USDC', color: 'neon-pink' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300"
        >
          <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <p className={`text-3xl font-bold text-${stat.color}`}>
              {stat.value}
            </p>
            {stat.unit && (
              <p className="text-sm text-gray-500">{stat.unit}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
