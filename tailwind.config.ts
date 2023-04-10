import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import formsPlugin from '@tailwindcss/forms';

const maxWidth = '45rem';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: maxWidth,
        md: maxWidth,
        lg: maxWidth,
        xl: maxWidth,
        '2xl': maxWidth,
      },
    },
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        link: '0 -.1rem 0 0 rgb(255 255 255 / 25%) inset',
      },
      gridTemplateRows: {
        '0fr': '0fr',
        '1fr': '1fr',
      },
    },
  },
  plugins: [formsPlugin()],
} satisfies Config;
