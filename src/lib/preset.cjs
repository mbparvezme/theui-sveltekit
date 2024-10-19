/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const twShades = require('tw-color-shades');

const config = {
  darkMode: "class",
  theme: {
    screens: {
      nano: "360px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        "brand": twShades('#5046E6'),
        "brand-primary": twShades('#FF0000'),
        "on-brand-primary": twShades('#FFFFFF'),
        "brand-secondary": twShades('#FDE68A'),
        "on-brand-secondary": twShades('#080818'),
        primary: twShades("--ui-bg-primary"),
        secondary: twShades("--ui-bg-secondary"),
        tertiary: twShades("--ui-bg-tertiary"),
      },
      textColor: {
        default: twShades('--ui-text-default'),
      },
      fontWeight: ["dark"],
      fill: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
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
};

module.exports = config;
