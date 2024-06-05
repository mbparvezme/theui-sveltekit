/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = (options = {}) => {
  const { exclude } = options;

  // Function to check if a color should be excluded
  const shouldExcludeColor = (colorKey) => exclude && exclude.includes(colorKey);

  return {
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
          ...(shouldExcludeColor('brand-soft') ? {} : {
            "brand-soft": "rgb(var(--ui-brand-soft) / <alpha-value>)",
            "brand-soft-active": "rgb(var(--ui-brand-soft-active) / <alpha-value>)",
          }),
          ...(shouldExcludeColor('brand-secondary') ? {} : {
            "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
            "brand-secondary-active": "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
            ...(shouldExcludeColor('brand-secondary-soft') ? {} : {
              "brand-secondary-soft": "rgb(var(--ui-brand-secondary-soft) / <alpha-value>)",
              "brand-secondary-soft-active": "rgb(var(--ui-brand-secondary-soft-active) / <alpha-value>)",
            }),
          }),
          primary: "rgb(var(--ui-bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--ui-bg-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
        },
        textColor: {
          brand: "rgb(var(--ui-brand) / <alpha-value>)",
          "on-brand": "rgb(var(--ui-text-on-brand) / <alpha-value>)",
          ...(shouldExcludeColor('brand-soft') ? {} : {
            "on-brand-soft": "rgb(var(--ui-text-on-brand-soft) / <alpha-value>)",
          }),
          ...(shouldExcludeColor('brand-secondary') ? {} : {
            "on-brand-secondary": "rgb(var(--ui-text-on-brand-secondary) / <alpha-value>)",
          }),
          ...(shouldExcludeColor('brand-secondary-soft') ? {} : {
            "on-brand-secondary-soft": "rgb(var(--ui-text-on-brand-secondary-soft) / <alpha-value>)",
          }),
          default: "rgb(var(--ui-text-default) / <alpha-value>)",
          muted: "rgb(var(--ui-text-muted) / <alpha-value>)"
        },
        backgroundColor: {
          // brand: "rgb(var(--ui-brand) / <alpha-value>)",
          // "brand-active": "rgb(var(--ui-brand-active) / <alpha-value>)",
          // ...(shouldExcludeColor('brandSecondary') ? {} : {
          //   "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
          //   "brand-secondary-active": "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
          //   ...(shouldExcludeColor('brandSecondarySoft') ? {} : {
          //     "brand-secondary-soft": "rgb(var(--ui-brand-secondary-soft) / <alpha-value>)",
          //     "brand-secondary-soft-active": "rgb(var(--ui-brand-secondary-soft-active) / <alpha-value>)",
          //   }),
          // }),
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
};
