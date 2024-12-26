import type { Config } from 'tailwindcss';

import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import twShades from 'tw-color-shades';

export default {
  content: [
    "./node_modules/theui-sveltekit/**/*.{html,js,svelte,ts}",
  ],
  darkMode: "selector",
  theme: {
    screens: {
      nano: "360px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundColor: {
        primary: twShades("--ui-bg-primary"),
        secondary: twShades("--ui-bg-secondary"),
        alt: twShades("--ui-bg-alt"),
      },
      colors: {
        "brand-primary": twShades('#E93E3A'),
        "on-brand-primary": twShades('#FFFFFF'),
        "brand-secondary": twShades('#E8E838'),
        "on-brand-secondary": twShades('#2E2105'),
        error: twShades("#E53935"),
        info: twShades("#29B6F6"),
        success: twShades("#00C853"),
        warning: twShades("#FFC107"),
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
          zIndex: "20",
        },
        ".fixed,[class$=fixed]": {
          zIndex: "30",
        },
      });
    }),
  ],
} satisfies Config;