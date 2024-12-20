<h1 align="center">Svelte 5 Component Library by TheUI</h1>
<div align="center">

[![npm version](https://badgen.net/npm/v/theui-sveltekit?color=red)](https://www.npmjs.com/package/theui-sveltekit)
[![npm downloads](https://badgen.net/npm/dw/theui-sveltekit)](https://www.npmjs.com/package/theui-sveltekit)
[![npm downloads](https://badgen.net/npm/dt/theui-sveltekit)](https://www.npmjs.com/package/theui-sveltekit)
[![license](https://badgen.net/npm/license/theui-sveltekit)](https://github.com/mbparvezme/theui-sveltekit/blob/master/license.md)

</div>

<h2 align="center">A tool for the <b>Svelte eco-system</b></h2>

<div align="center">
  <img src="https://theui-beta.vercel.app/img/theui-svelte-components.svg" width="400px">
</div>

The **theui-svelte** is [**TheUI**](https://www.theui.dev)'s component library for [**Svelte 5**](https://kit.svelte.dev), built on top of TailwindCSS. It combines the strength of Svelte and the features of TailwindCSS to create a powerful tool that accelerates your development process.
<br>

## **Features**
- Built with ARIA roles and WCAG compliance for better usability.
- Highly customizable
- Support LTR/RTL.
- Easy theming, branding, and dark/light mode control.
- Optimized for leveraging svelte's reactivity
- Includes smooth transitions and animations for better user experience.
- Fully typed for enhanced development
- Offers examples, and usage guides tailored for Svelte.
<br>

## **Components**

- Components
  - [Accordion](https://www.svelte.theui.dev/accordion)
  - [Alert](https://www.svelte.theui.dev/alert)
  - [Badge](https://www.svelte.theui.dev/badge)
  - [Breadcrumb](https://www.svelte.theui.dev/breadcrumb)
  - [Button](https://www.svelte.theui.dev/button)
  - [Button group](https://www.svelte.theui.dev/button-group)
  - [Quick action button](https://www.svelte.theui.dev/quick-action-button)
  - [Card](https://www.svelte.theui.dev/card)
  - [Chips](https://www.svelte.theui.dev/chips)
  - [Collapse](https://www.svelte.theui.dev/collapse)
  - [Drawer](https://www.svelte.theui.dev/drawer)
  - [Dropdown](https://www.svelte.theui.dev/dropdown)
  - [List group](https://www.svelte.theui.dev/list-group)
  - [Modal](https://www.svelte.theui.dev/modal)
  - [Navbar](https://www.svelte.theui.dev/navbar)
  - [Notification](https://www.svelte.theui.dev/notification)
  - [Pagination](https://www.svelte.theui.dev/pagination)
  - [Popover](https://www.svelte.theui.dev/popover)
  - [Popup (Exit and Entry popup)](https://www.svelte.theui.dev/popup)
  - [Progress bar](https://www.svelte.theui.dev/progress-bar)
  - [Slider](https://www.svelte.theui.dev/slider)
  - [Table](https://www.svelte.theui.dev/table)
  - [Tabs](https://www.svelte.theui.dev/tabs)
  - [Tooltip](https://www.svelte.theui.dev/tooltip)

- Form controls
  - [Form](https://www.svelte.theui.dev/form)
  - [Fieldset](https://www.svelte.theui.dev/fieldset)
  - [Label](https://www.svelte.theui.dev/label)
  - [Text input](https://www.svelte.theui.dev/input)
  - [Select](https://www.svelte.theui.dev/select)
  - [Check-box](https://www.svelte.theui.dev/check-box)
  - [Radio button](https://www.svelte.theui.dev/radio-button)
  - [File input](https://www.svelte.theui.dev/file-input)
  - [Toggle](https://www.svelte.theui.dev/toggle)
  - [Helper text](https://www.svelte.theui.dev/helper-text)
  - [Close](https://www.svelte.theui.dev/close)

- Utilities
  - [Container](https://www.svelte.theui.dev/container)
  - [Dark mode](https://www.svelte.theui.dev/dark-mode)
  - [SVG](https://www.svelte.theui.dev/svg-icon)

<br>

## **Installation Guide**
To add the Svelte Components library to your project, you can do it in two ways:
1. Use the boilerplate from GitHub.
2. Manual installation from scratch.
<br>

### **1. Use the Boilerplate from GitHub**

To install the boilerplate template, open your terminal and use the following command, replacing **<project-name>** with your desired project name.

```bash
# Clone the project
git clone https://github.com/mbparvezme/theui-svelte-starter.git my-app

# Install node modules
npm i

# Run the application
npm run dev
```

<br>

### **2. Manually Install from Scratch**

To manually install the component library, follow these steps:

#### **2.1 Install Sveltekit with TailwindCSS**

```bash
# Install Svelte
npx sv create my-app
cd my-app

# Install node modules
npm i

# Install theui-svelte
npm i theui-svelte
```

<br>

#### **2.2 Configuration**

Open the TailwindCSS configuration file called `tailwind.config.cjs` and replace all of its existing content with the code provided below.

```diff
const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
+       "./node_modules/theui-svelte/**/*.{html,js,svelte,ts}",
    ],
+   presets: [require("theui-svelte/preset")],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [],
};

module.exports = config;
```

If you wish to use the default colors or desire an instant design without any color customization, you can utilize the `style.postcss` file, which contains all the default CSS variables used in this component library. To do this, open `+layout.svelte` and import the core style file as follows:

```diff
<script>
+   import "theui-svelte/style";
    import "../app.postcss";
</script>
```

And thats all. You are ready to start your awesome project now.

<br>


# Colors System

## CSS Variable Colors

### Introduction
CSS Variable Colors in the library allow you to modify the static background and text colors easily using CSS variables. These colors do not have shades and are ideal for defining primary design elements that remain consistent throughout your application. Below are the available variables for background and text customization:

**Background color variables:**
- `--ui-bg-primary`
- `--ui-bg-secondary`
- `--ui-bg-alt`

**Text color variables:**
- `--ui-text-default`
- `--ui-text-alt`
- `--ui-text-muted`

### Code Demo

[Space for code demo]

### Available Classes
These colors are directly applied via the CSS variables mentioned above. No additional classes are required.

---

## TailwindCSS Color Classes

### Introduction
The library integrates seamlessly with the TailwindCSS color system, providing 8 custom color classes that you can fully customize through the `tailwind.config.js` file. These classes come with 11 shades, ranging from 50 to 950, and can be used for background, text, borders, outlines, fills, strokes, and more.

**Custom classes:**
- `brand-primary`
- `brand-secondary`
- `error`
- `info`
- `success`
- `warning`

### Code Demo

[Space for code demo]

### Available Classes
Each custom class offers the following shades:
- **Shades:** 50, 100-900, 950
- **Usage:** These shades can be used with any Tailwind utility, like `bg-brand-primary-500`, `text-error-700`, or `border-info-300`.




## **Colors System**

The "theui-svelte" component library offers the following CSS variables and their default values. Each CSS variable is prefixed with "ui" to prevent conflicts with other variables.

```css
/* Background colors */
--ui-bg-primary
--ui-bg-secondary
--ui-bg-alt
/* Text colors */
--ui-text-default
--ui-text-alt
--ui-text-muted
```

> Brand colors are universally accessible, ready to be used in various parts of your design. However, it's important to note that text colors are distinct from background colors, and vice versa. This separation ensures that you have the appropriate colors for both text and background elements, allowing for effective and visually pleasing design combinations.

<br>

### **Use of Custom Colors**

You have the flexibility to employ custom classes for integrating the custom colors into your design. The components library incorporates the following classes to make this process seamless:

| CLASS                         | DESCRIPTION                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .[...]-brand                  | Apply the brand color to your component by using the ".bg-brand" class for the background and ".text-brand" for the foreground.                                                                                                             |
| .[...]-brand-active           | Use these classes to indicate different states, such as active or hover, for an element. For example, apply the brand color with slight variations using ".bg-brand-active" for the background and ".text-brand-active" for the foreground. |
| .[...]-brand-secondary        | If you wish to use a secondary brand color for your components, you can do so with the ".bg-brand-secondary" class for the background and ".text-brand-secondary" for the foreground. These classes offer additional design flexibility.    |
| .[...]-brand-secondary-active | Similar to ".[...]-brand-active," but designed for the secondary brand color.                                                                                                                                                               |
| .text-on-brand                | This class is for the foreground color when using the background color ".bg-brand."                                                                                                                                                         |
| .text-on-brand-secondary      | This class serves as the foreground color when using the background color ".bg-brand-secondary."                                                                                                                                            |
| .text-default                 | This class represents the default text/foreground color for the component library.                                                                                                                                                          |
| .bg-primary                   | Use this class for the default/primary background color.                                                                                                                                                                                    |
| .bg-secondary                 | Apply this class for the secondary background color.                                                                                                                                                                                        |
| .bg-tertiary                  | Utilize this class for the tertiary background color.                                                                                                                                                                                       |

<br>

### **Color Customization**

The process of customizing colors in the components library is straightforward and requires just a single line of code. To change the value of a specific CSS variable, follow these steps:

- Identify the CSS variable you wish to customize. For instance, let's say you want to set your brand color to "rgb(255, 0, 0)" and change the default text color to "rgb(0, 0, 0)."
- Open the `./src/app.css` or `./src/app.postcss` file in your project, which contains your TailwindCSS styles and add the following lines to the file:

```css
--ui-brand: 255 0 0;
--ui-text-default: 0 0 0;
```

Congratulations! With this simple change, all the components using the brand color and the default text color will automatically adapt to the new color values. No further adjustments are necessary.

> Writing the color values in the format provided, such as "255 0 0," rather than the conventional RGB code like "rgb(255, 255, 266," is essential because it aligns with TailwindCSS's methodology for applying opacity to colors.

TailwindCSS allows you to easily adjust the opacity of colors using utility classes like "bg-opacity-50" to set a 50% opacity background. These utility classes are designed to work with color values expressed in the format you mentioned, "255 0 0," and not with conventional RGB codes like "rgb(255, 255, 266)."

By adhering to this format, you ensure that you can seamlessly leverage TailwindCSS's opacity utilities to control the transparency of your colors, providing a consistent and flexible approach to design customization.

<br>



## **Default CSS Variables**

The component library is built on the powerful foundation of TailwindCSS, a tool capable of generating a wide array of CSS styles and a multitude of variables for your design. However, the real question is, do you truly need an extensive array of CSS variables for your design?

Having the ability to define numerous variables is not the issue. The challenge lies in maintaining design consistency. When you have an overwhelming number of options, it becomes all too easy to lose that consistency, leading to a haphazard and disjointed design.

To address this challenge, the "theui-svelte" component library introduces a set of carefully curated custom variables that seamlessly integrate with those offered by TailwindCSS. You can effortlessly customize your theme using just one line of code by altering the values of these custom variables.

<br>

### **Utility Variables**

There `--max-width` CSS variable exclusively used in the `Container` component to ensure that the width of the component remains consistent throughout the entire design. There is no dedicated CSS class for this property. Instead, you can apply it using a Tailwind CSS arbitrary value like `max-w-[var(--max-width)]`.

```css
--max-width
```

<br>

## **The z-index**

In this library, several components make use of z-index values. This document will provide you with information about the order of the z-index in these components.

Z-index helps in managing the stacking order of elements and overlays, controlling their arrangement along the z-axis. It is not recommended to customize these values in the design, as doing so may disrupt the layout along the z-axis.

| COMPONENT/Property | CLASS/Selector            | VALUE (Z-INDEX) |
| ------------------ | ------------------------- | --------------- |
| Dropdown           | .dropdown .backdrop       | 10              |
| Dropdown           | .dropdown-content         | 11              |
| Sticky positioned  | .sticky, [class$=:sticky] | 20              |
| Fixed positioned   | .fixed, [class$=:fixed]   | 30              |
| Offcanvas          | .offcanvas                | 40              |
| Modal              | .modal                    | 50              |
| Popup              | .popup                    | 60              |
| Tooltip            | .tooltip                  | 70              |
| Notifications      | .notifications            | 80              |

<br>

## **Contributions**

Prior to commencing work on new features or bug fixes, kindly inform us. If you wish to propose a new feature, please create a feature request in [Github Issues](https://github.com/mbparvezme/theui-svelte/issues). This promotes open discussions and avoids redundant efforts. It encompasses tasks like adding new components, introducing utility features, and making major changes to existing work.

<br>

## **Copyright**

The code and documentation are copyright 2023 by [M B Parvez](https://www.mbparvez.me), [Gosoft](https://www.gosoft.io) and [The UI](https://www.theui.dev).

<br>

## **License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

---

<br>

## **Special Thanks To [Gosoft.io](https://www.gosoft.io) and [BIPBY Digital](https://www.bipby.digital) for being our digital partner**
