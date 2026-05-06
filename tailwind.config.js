/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        vortex: {
          black: '#050508',
          ink: '#0b0b12',
          panel: '#11111c',
          line: '#242238',
          purple: '#8b5cf6',
          violet: '#a855f7',
          magenta: '#d946ef',
          mint: '#5eead4',
        },
      },
      boxShadow: {
        glow: '0 0 42px rgba(139, 92, 246, 0.28)',
        'button-glow': '0 16px 45px rgba(168, 85, 247, 0.32)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'vortex-grid':
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
