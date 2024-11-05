import type { Config } from 'tailwindcss';

import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const twShades = require('tw-color-shades');

export default {
  content: [
    "./node_modules/theui-sveltekit/**/*.{html,js,svelte,ts}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      nano: "360px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        "brand-primary": twShades('#536DFE'),
        "on-brand-primary": twShades('#FFFFFF'),
        "brand-secondary": twShades('#FDE68A'),
        "on-brand-secondary": twShades('#080818'),
        error: twShades("#E53935"),
        info: twShades("#29B6F6"),
        success: twShades("#00C853"),
        warning: twShades("#FFC107"),
      },
      backgroundColor: {
        primary: twShades("--ui-bg-primary"),
        secondary: twShades("--ui-bg-secondary"),
        alt: twShades("--ui-bg-alt"),
      },
      textColor: {
        default: twShades('--ui-text-default'),
        alt: twShades('--ui-text-alt'),
        muted: twShades('--ui-text-muted'),
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['dark'],
      fill: ['dark'],
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    plugin(({ addVariant }) => {
      addVariant("not-first-child", "&:not(:first-child)");
      addVariant("not-last-child", "&:not(:last-child)");
      addVariant("edge-child", [
        "&:first-child",
        "&:last-child",
      ]);
      addVariant("not-edge-child", [
        "&:not(:first-child)",
        "&:not(:last-child)",
      ]);
    }),
    plugin(({ addComponents }) => {
      addComponents({
        ".sticky,[class$=sticky]": {
          zIndex: 20,
        },
        ".fixed,[class$=fixed]": {
          zIndex: 30,
        },
      });
    }),
  ],
} satisfies Config;