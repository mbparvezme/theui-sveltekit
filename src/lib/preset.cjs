/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const config = {
  mode: "jit",
  darkMode: "class",
  theme: {
    screens: {
      nano: "360px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        brand: "rgb(var(--ui-brand) / <alpha-value>)",
        "brand-active": "rgb(var(--ui-brand-active) / <alpha-value>)",
        "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
        "brand-secondary-active":
          "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
        "on-brand": "rgb(var(--ui-text-on-brand) / <alpha-value>)",
        primary: "rgb(var(--ui-bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--ui-bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
      },
      textColor: {
        brand: "rgb(var(--ui-brand) / <alpha-value>)",
        "on-brand": "rgb(var(--ui-text-on-brand) / <alpha-value>)",
        "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
        "on-brand-secondary":
          "rgb(var(--ui-text-on-brand-secondary) / <alpha-value>)",
        default: "rgb(var(--ui-text-default) / <alpha-value>)",
      },
      backgroundColor: {
        brand: "rgb(var(--ui-brand) / <alpha-value>)",
        "brand-active": "rgb(var(--ui-brand-active) / <alpha-value>)",
        "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
        "brand-secondary-active":
          "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
        primary: "rgb(var(--ui-bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--ui-bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
      },
      fontWeight: ["dark"],
      fill: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require('tailwindcss-rtl'),
    plugin(({ addVariant }) => {
      addVariant("not-first-child", "&:not(:first-child)");
      addVariant("not-last-child", "&:not(:last-child)");
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
