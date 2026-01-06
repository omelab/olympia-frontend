import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D2F92',
      },

      fontFamily: {
        bangla: ['var(--font-alinurnakkhatra)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
