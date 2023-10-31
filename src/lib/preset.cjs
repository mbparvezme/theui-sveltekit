/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

const config = {
  mode: "jit",
  darkMode: "class",
  theme: {
    screens: {
      "nano": "360px",
      "xs": "480px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        brand: "rgb(var(--ui-brand) / <alpha-value>)",
        "brand-active": "rgb(var(--ui-brand-active) / <alpha-value>)",
        "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
        "brand-secondary-active": "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
        "on-brand": "rgb(var(--ui-text-on-brand) / <alpha-value>)",
        primary: "rgb(var(--ui-bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--ui-bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
      },
      textColor: {
        brand: "rgb(var(--ui-brand) / <alpha-value>)",
        "on-brand": "rgb(var(--ui-text-on-brand) / <alpha-value>)",
        "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
        "on-brand-secondary": "rgb(var(--ui-text-on-brand-secondary) / <alpha-value>)",
        default: "rgb(var(--ui-text-default) / <alpha-value>)",
      },
      backgroundColor: {
        brand: "rgb(var(--ui-brand) / <alpha-value>)",
        "brand-active": "rgb(var(--ui-brand-active) / <alpha-value>)",
        "brand-secondary": "rgb(var(--ui-brand-secondary) / <alpha-value>)",
        "brand-secondary-active": "rgb(var(--ui-brand-secondary-active) / <alpha-value>)",
        primary: "rgb(var(--ui-bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--ui-bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--ui-bg-tertiary) / <alpha-value>)",
      },
      fontWeight: ["dark"],
      fill: ["dark"],
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("not-first-child", "&:not(:first-child)")
      addVariant("not-last-child", "&:not(:last-child)")
      addVariant("not-edge-child", ['&:not(:first-child)', '&:not(:last-child)'])
    }),
    plugin(({ addComponents }) => {
      addComponents({
        '.sticky,[class$=sticky]': {
          zIndex: 20
        },
        '.fixed,[class$=fixed]': {
          zIndex: 30
        }
      })
    })
    // plugin(({ addBase }) => addBase({
    //   'body': {
    //     backgroundColor: resolveColor(theme('colors.primary', colors.white), '--ui-bg-primary'),
    //     color: resolveColor(theme('colors.default', colors.gray[800]), '--ui-text-default'),
    //   }
    // })),
  ]
}

module.exports = config

// const colors = require('tailwindcss/colors')
// let resolveColor = (color, opacityVariableName) => color.replace('<alpha-value>', `var(${opacityVariableName}, 1)`)
// {
//   base: [":root"],
//   styles: {
//     '--ui-brand'                    : '80 70 230',    /* #5046E6 */
//     '--ui-brand-active'             : '67 56 202',    /* #4338CA */
//     '--ui-brand-secondary'          : '253 230 138',  /* #FDE68A */
//     '--ui-brand-secondary-active'   : '252 211 77',   /* #FCD34D */
//     '--ui-text-on-brand'            : '255 255 255',  /* #FFFFFF */
//     '--ui-text-on-brand-secondary'  : '8 8 24',       /* #080818 */
//     '--ui-text-default'             : '8 8 24',       /* #080818 */
//     '--ui-bg-primary'               : '255 255 255',  /* #FFFFFF */
//     '--ui-bg-secondary'             : '243 244 246',  /* #F3F4F6 */
//     '--ui-bg-tertiary'              : '229 231 235',  /* #E5E7EB */
//     '--max-width'                   : '1408px'
//   },
// },
// {
//   variant: ["dark"],
//   styles: {
//     '--ui-text-default': '229 231 235', /* #E5E7EB */
//     '--ui-bg-primary':    '8 8 24',     /* #080818 */
//     '--ui-bg-secondary':  '22 22 38',   /* #161626 */
//     '--ui-bg-tertiary':   '32 32 48',   /* #202030 */
//   },
// },