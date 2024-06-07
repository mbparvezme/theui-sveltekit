/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = (options = {}) => {
  const { exclude } = options;

  // Function to check if a color should be excluded
  const shouldExcludeColor = (colorKey) => !(exclude && exclude.includes(colorKey));
  
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
          // Brand soft colors
          ...(shouldExcludeColor('brand-soft') ? {} : {
            "brand-soft": "rgb(var(--ui-brand-soft) / <alpha-value>)"
          }),
          // Secondary brand color
          ...(shouldExcludeColor('brand-secondary') ? {} : {
            "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
            // Secondary brand soft color
            ...(shouldExcludeColor('brand-secondary-soft') ? {} : {
              "brand-secondary-soft": "rgb(var(--ui-brand-secondary-soft) / <alpha-value>)"
            }),
          }),
          error: "rgb(var(--ui-error) / <alpha-value>)",
          info: "rgb(var(--ui-info) / <alpha-value>)",
          success: "rgb(var(--ui-success) / <alpha-value>)",
          warning: "rgb(var(--ui-warning) / <alpha-value>)",
        },
        textColor: {
          "brand-soft": null,
          "brand-secondary-active": null,
          "brand-secondary-soft": null,
          "on-brand": "rgb(var(--ui-text-on-brand) / <alpha-value>)",
          // Secondary brand color
          ...(shouldExcludeColor('brand-secondary') ? {} : {
            "on-brand-secondary": "rgb(var(--ui-text-on-brand-secondary) / <alpha-value>)"
          }),
          default: "rgb(var(--ui-text-default) / <alpha-value>)",
          muted: "rgb(var(--ui-text-muted) / <alpha-value>)",
          alt: "rgb(var(--ui-text-alt) / <alpha-value>)",
        },
        backgroundColor: {
          primary: "rgb(var(--ui-bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--ui-bg-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
          // Brand active colors
          "brand-active": "rgb(var(--ui-brand-active) / <alpha-value>)",
          // Brand soft colors
          ...(shouldExcludeColor('brand-soft') ? {} : {
            "brand-soft-active": "rgb(var(--ui-brand-soft-active) / <alpha-value>)",
          }),
          // Secondary brand color
          ...(shouldExcludeColor('brand-secondary') ? {} : {
            "brand-secondary-active": "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
          }),
          // Secondary brand soft color
          ...(shouldExcludeColor('brand-secondary-soft') ? {} : {
            "brand-secondary-soft-active": "rgb(var(--ui-brand-secondary-soft-active) / <alpha-value>)"
          }),
        },
        fontFamily: {
          'body': ['var(--ui-font-body)', ...defaultTheme.fontFamily.sans],
          'title': ['var(--ui-font-title)', ...defaultTheme.fontFamily.serif],
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
      plugin(({ addComponents, addUtilities }) => {
        addComponents({
          body: {
            backgroundColor: "rgb(var(--ui-bg-primary) / 1)",
            color: "rgb(var(--ui-text-default) / 1)",
          },
        }),
        addUtilities({
          '.max-w': {
            maxWidth: 'var(--ui-max-width)',
          },
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
