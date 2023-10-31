<h1 align="center"> TheUI Sveltekit Components</h1>
<div align="center">

[![npm version](https://badgen.net/npm/v/theui-sveltekit?color=red)](https://www.npmjs.com/package/theui-sveltekit)
[![npm downloads](https://badgen.net/npm/dw/theui-sveltekit)](https://www.npmjs.com/package/theui-sveltekit)
[![npm downloads](https://badgen.net/npm/dt/theui-sveltekit)](https://www.npmjs.com/package/theui-sveltekit)
[![license](https://badgen.net/npm/license/theui-sveltekit)](https://github.com/mbparvezme/theui-sveltekit/blob/master/license.md)

</div>

<h2 align="center">A tool for the <b>Sveltekit eco-system</b></h2>

<div align="center">
  <img src="https://theui-beta.vercel.app/img/theui-sveltekit-components.svg" width="400px">
</div>

The **theui-sveltekit** is [**TheUI**](https://www.theui.dev)'s official component library for [**Sveltekit**](https://kit.svelte.dev), built on top of TailwindCSS. It combines the strength of SvelteKit and the features of TailwindCSS to create a powerful tool that accelerates your development process.

<br>

## **Features**

 * Accessible components
 * Easy control of dark and light modes
 * Effortless theming and branding with a single line of CSS
 * Highly customizable
 * RTL supports (Upcoming)
 * Fully typed for enhanced development

<br>

## **Components**

* General Components

  * [Accordion](https://www.svelte.theui.dev/accordion)
  * [Alert](https://www.svelte.theui.dev/alert)
  * [Badge](https://www.svelte.theui.dev/badge)
  * [Breadcrumb](https://www.svelte.theui.dev/breadcrumb)
  * [Button](https://www.svelte.theui.dev/button)
  * [Button group](https://www.svelte.theui.dev/button-group)
  * [Chips](https://www.svelte.theui.dev/chips)
  * [Collapse](https://www.svelte.theui.dev/collapse)
  * [Container](https://www.svelte.theui.dev/container)
  * [Dropdown](https://www.svelte.theui.dev/dropdown)
  * [Modal](https://www.svelte.theui.dev/modal)
  * [Navbar](https://www.svelte.theui.dev/navbar)
  * [Notification](https://www.svelte.theui.dev/notification)
  * [Offcanvas](https://www.svelte.theui.dev/offcanvas)
  * [Pagination](https://www.svelte.theui.dev/pagination)
  * [Popup (Exit and Entry popup)](https://www.svelte.theui.dev/popup)
  * [Progress bar](https://www.svelte.theui.dev/progress-bar)
  * [SVG](https://www.svelte.theui.dev/svg)
  * [Table](https://www.svelte.theui.dev/table)
  * [Tabs](https://www.svelte.theui.dev/tabs)
  * [Tooltip](https://www.svelte.theui.dev/tooltip)

* Form Components
  * [Form](https://www.svelte.theui.dev/form)
  * [Fieldset](https://www.svelte.theui.dev/fieldset)
  * [Helper text](https://www.svelte.theui.dev/helper-text)
  * [Check-box](https://www.svelte.theui.dev/check-box)
  * [Text editor](https://www.svelte.theui.dev/text-editor)
  * [File input](https://www.svelte.theui.dev/file-input)
  * [Input](https://www.svelte.theui.dev/input)
  * [Label](https://www.svelte.theui.dev/label)
  * [Radio button](https://www.svelte.theui.dev/radio-button)
  * [Select](https://www.svelte.theui.dev/select)
  * [Textarea](https://www.svelte.theui.dev/textarea)
  * [Toggle](https://www.svelte.theui.dev/toggle)

* Utility
    * [Close](https://www.svelte.theui.dev/close)
    * [Dark mode](https://www.svelte.theui.dev/dark-mode)

<br>

## **Installation Guide**

To add the Sveltekit Components library to your project, you can do it in two ways:

1. Use the boilerplate from GitHub.
2. Manual installation from scratch.

<br>

### **1. Use the Boilerplate from GitHub**

To install the boilerplate template, open your terminal and use the following command, replacing **<project-name>** with your desired project name.

```bash
# Clone the project
git clone https://github.com/mbparvezme/theui-sveltekit-starter.git app-name

# Install node modules
npm i

# Run the application
npm run dev
```

<br>

### **2. Manually Install from Scratch**

To manually install the component library, follow these steps:

#### **2.1 &nbsp;&nbsp; Install Svelte/Sveltekit**

```bash
# Install Sveltekit
npm create svelte@latest my-app
cd my-app

# Add TailwindCSS
npx svelte-add@latest tailwindcss

# Install node modules
npm i

# Install theui-svelte
npm i theui-sveltekit
```

<br>

#### **2.2 &nbsp;&nbsp; Configuration**

Open the TailwindCSS configuration file called `tailwind.config.cjs` and replace all of its existing content with the code provided below.

```js
// 1. Update config.content
// 2. Add config.presets
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/theui-sveltekit/**/*.{html,js,svelte,ts}", // New line
  ],
  presets: [require("theui-sveltekit/preset")], // New line
  darkMode: 'class',
  theme: {
    extend: {},
  },

  plugins: [],
};

module.exports = config;
```
If you wish to use the default colors or desire an instant design without any color customization, you can utilize the `style.postcss` file, which contains all the default CSS variables used in this component library. To do this, open `__layout.svelte` and import the core style file as follows:

```html
<script>
  import "theui-sveltekit/style"; // Add this line inside script tag
  import "../app.postcss";
</script>
```

The file contains the following CSS codes. If you prefer not to use the default colors, you can copy the following code into your `app.postcss` file and customize it according to your needs.

```css
@layer base{
  :root {
    --ui-brand                    : 80 70 230;    /* #5046E6 */
    --ui-brand-active             : 67 56 202;    /* #4338CA */
    --ui-brand-secondary          : 253 230 138;  /* #FDE68A */
    --ui-brand-secondary-active   : 252 211 77;   /* #FCD34D */
    --ui-text-on-brand            : 255 255 255;  /* #FFFFFF */
    --ui-text-on-brand-secondary  : 8 8 24;       /* #080818 */
    --ui-text-default             : 8 8 24;       /* #080818 */
    --ui-bg-primary               : 255 255 255;  /* #FFFFFF */
    --ui-bg-secondary             : 243 244 246;  /* #F3F4F6 */
    --ui-bg-tertiary              : 229 231 235;  /* #E5E7EB */

    --max-width                   : 1408px;
  }

  :root.dark {
    --ui-text-default             : 229 231 235;  /* #E5E7EB */
    --ui-bg-primary               : 8 8 24;       /* #080818 */
    --ui-bg-secondary             : 22 22 38;     /* #161626 */
    --ui-bg-tertiary              : 32 32 48;     /* #202030 */
  }

  body{
    @apply bg-primary text-default;
  }
}
```

And thats all. You are ready to start your awesome project now.

<br>

## **Default CSS Variables**

The component library is built on the powerful foundation of TailwindCSS, a tool capable of generating a wide array of CSS styles and a multitude of variables for your design. However, the real question is, do you truly need an extensive array of CSS variables for your design?

Having the ability to define numerous variables is not the issue. The challenge lies in maintaining design consistency. When you have an overwhelming number of options, it becomes all too easy to lose that consistency, leading to a haphazard and disjointed design.

To address this challenge, the "TheUI Sveltekit" component library introduces a set of carefully curated custom variables that seamlessly integrate with those offered by TailwindCSS. You can effortlessly customize your theme using just one line of code by altering the values of these custom variables.

<br>

### **Utility Variables**
There `--max-width` CSS variable exclusively used in the `Container` component to ensure that the width of the component remains consistent throughout the entire design. There is no dedicated CSS class for this property. Instead, you can apply it using a Tailwind CSS arbitrary value like `max-w-[var(--max-width)]`.

```css
--max-width
```

### **Colors Variables**

"TheUI Sveltekit" component library offers the following CSS variables and their default values. Each CSS variable is prefixed with "ui" to prevent conflicts with other variables.

```css
  /* Brand colors */
  --ui-brand
  --ui-brand-active
  --ui-brand-secondary
  --ui-brand-secondary-active
  /* Text colors */
  --ui-text-on-brand
  --ui-text-on-brand-secondary
  --ui-text-default
  /* Background colors */
  --ui-bg-primary
  --ui-bg-secondary
  --ui-bg-tertiary
```
> Brand colors are universally accessible, ready to be used in various parts of your design. However, it's important to note that text colors are distinct from background colors, and vice versa. This separation ensures that you have the appropriate colors for both text and background elements, allowing for effective and visually pleasing design combinations.

<br>

### **Use of Custom Colors**

You have the flexibility to employ custom classes for integrating the custom colors into your design. The Sveltekit Components library incorporates the following classes to make this process seamless:

| CLASS | DESCRIPTION |
| --- | ----------- |
| .[...]-brand | Apply the brand color to your component by using the ".bg-brand" class for the background and ".text-brand" for the foreground. |
| .[...]-brand-active | Use these classes to indicate different states, such as active or hover, for an element. For example, apply the brand color with slight variations using ".bg-brand-active" for the background and ".text-brand-active" for the foreground. |
| .[...]-brand-secondary | If you wish to use a secondary brand color for your components, you can do so with the ".bg-brand-secondary" class for the background and ".text-brand-secondary" for the foreground. These classes offer additional design flexibility. |
| .[...]-brand-secondary-active | Similar to ".[...]-brand-active," but designed for the secondary brand color. |
| .text-on-brand | This class is for the foreground color when using the background color ".bg-brand." |
| .text-on-brand-secondary | This class serves as the foreground color when using the background color ".bg-brand-secondary." |
| .text-default | This class represents the default text/foreground color for the component library. |
| .bg-primary | Use this class for the default/primary background color. |
| .bg-secondary | Apply this class for the secondary background color. |
| .bg-tertiary | Utilize this class for the tertiary background color. |

<br>

### **Color Customization**

The process of customizing colors in the Sveltekit Components library is straightforward and requires just a single line of code. To change the value of a specific CSS variable, follow these steps:

* Identify the CSS variable you wish to customize. For instance, let's say you want to set your brand color to "rgb(255, 0, 0)" and change the default text color to "rgb(0, 0, 0)."
* Open the `./src/app.css` or `./src/app.postcss` file in your project, which contains your TailwindCSS styles and add the following lines to the file:

```css
--ui-brand : 255 0 0;
--ui-text-default : 0 0 0;
```

Congratulations! With this simple change, all the components using the brand color and the default text color will automatically adapt to the new color values. No further adjustments are necessary.

> Writing the color values in the format provided, such as "255 0 0," rather than the conventional RGB code like "rgb(255, 255, 266," is essential because it aligns with TailwindCSS's methodology for applying opacity to colors.

TailwindCSS allows you to easily adjust the opacity of colors using utility classes like "bg-opacity-50" to set a 50% opacity background. These utility classes are designed to work with color values expressed in the format you mentioned, "255 0 0," and not with conventional RGB codes like "rgb(255, 255, 266)."

By adhering to this format, you ensure that you can seamlessly leverage TailwindCSS's opacity utilities to control the transparency of your colors, providing a consistent and flexible approach to design customization.

<br>

## **The z-index**

In this library, several components make use of z-index values. This document will provide you with information about the order of the z-index in these components.

Z-index helps in managing the stacking order of elements and overlays, controlling their arrangement along the z-axis. It is not recommended to customize these values in the design, as doing so may disrupt the layout along the z-axis.

| COMPONENT/Property | CLASS/Selector | VALUE (Z-INDEX) |
| ------------------ | -------------- | --------------- |
| Dropdown | .dropdown .backdrop | 10 |
| Dropdown | .dropdown-content | 11 |
| Sticky positioned | .sticky, [class$=:sticky] | 20 |
| Fixed positioned | .fixed, [class$=:fixed] | 30 |
| Offcanvas | .offcanvas | 40 |
| Modal |	.modal | 50 |
| Popup |	.popup |	60
| Tooltip |	.tooltip |	70
| Notifications |	.notifications |	80

<br>

## **Contributions**
Prior to commencing work on new features or bug fixes, kindly inform us. If you wish to propose a new feature, please create a feature request in [Github Issues](https://github.com/mbparvezme/theui-sveltekit/issues). This promotes open discussions and avoids redundant efforts. It encompasses tasks like adding new components, introducing utility features, and making major changes to existing work.

<br>

## **Copyright**

The code and documentation are copyright 2023 by [M B Parvez](https://www.mbparvez.me), [Gosoft](https://www.gosoft.io) and [TheUI](https://www.theui.dev).

<br>

## **License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

---

<br>

## **Special Thanks To [Gosoft.io](https://www.gosoft.io) and [BIPBY Digital](https://www.bipby.digital) for being our digital partner**