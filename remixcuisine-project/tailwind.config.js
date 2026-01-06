/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00FFFF',
        'neon-magenta': '#FF00FF',
        'neon-green': '#00FF00',
        'neon-pink': '#FF1493',
        'neon-yellow': '#FFFF00',
        'neon-blue': '#0066FF',
        'neon-purple': '#9D00FF',
      },
      boxShadow: {
        'neon-cyan': '0 0 30px rgba(0, 255, 255, 0.3)',
        'neon-magenta': '0 0 30px rgba(255, 0, 255, 0.3)',
        'neon-cyan-strong': '0 0 40px rgba(0, 255, 255, 0.6)',
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
