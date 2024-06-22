/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
import twShades from "tw-color-shades";

module.exports = (options = {}) => {
  const { exclude } = options;

  // Function to check if a color should be excluded
  const shouldExcludeColor = (colorKey) => (exclude && exclude.includes(colorKey));
  
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
          brand:    twShades("#536DFE"),
          // Secondary brand color
          ...(shouldExcludeColor('brand-secondary') ? {} : {"brand-secondary": twShades("#FF5722")}),
          error:    twShades("#E53935"),
          info:     twShades("#29B6F6"),
          success:  twShades("#00C853"),
          warning:  twShades("#FFC107"),
        },
        textColor: {
          "on-brand": twShades("#FAFDFF"),
          // Secondary brand color
          ...(shouldExcludeColor('brand-secondary') ? {} : {"on-brand-secondary": twShades("#FFFDF9")}),
          default:  "rgb(var(--ui-text-default) / <alpha-value>)",
          muted:    "rgb(var(--ui-text-muted) / <alpha-value>)",
          alt:      "rgb(var(--ui-text-alt) / <alpha-value>)",
        },
        backgroundColor: {
          primary:    "rgb(var(--ui-bg-primary) / <alpha-value>)",
          secondary:  "rgb(var(--ui-bg-secondary) / <alpha-value>)",
          tertiary:   "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
        },
        fontFamily: {
          'body':     ['var(--ui-font-body)', ...defaultTheme.fontFamily.sans],
          'title':    ['var(--ui-font-title)', ...defaultTheme.fontFamily.serif],
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
          // ".sticky,[class$=sticky]": {
          //   zIndex: 20,
          // },
          // ".fixed,[class$=fixed]": {
          //   zIndex: 30,
          // },
        });
      }),
      // colorGen({ cssVariable: '--ui-brand' }),
      // require('./color-plugin.ts')
    ],
  };
};
