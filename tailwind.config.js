/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF00FF',
        'neon-cyan': '#00FFFF',
        'neon-purple': '#9D00FF',
        'cyber-dark': '#0a0a0f',
        'cyber-darker': '#050508',
      },
      boxShadow: {
        'neon-pink': '0 0 20px #FF00FF, 0 0 40px #FF00FF',
        'neon-cyan': '0 0 20px #00FFFF, 0 0 40px #00FFFF',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF' 
          },
          '100%': { 
            textShadow: '0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #00FFFF' 
          },
        },
      },
    },
  },
  plugins: [],
};
