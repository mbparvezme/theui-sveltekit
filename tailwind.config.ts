import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  presets: [require("./src/lib/preset.cjs")],
  theme: {
    extend: {}
  },

  plugins: [typography, forms, aspectRatio]
} satisfies Config;
