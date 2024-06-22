<h1 align="center"> TheUI Svelte Components</h1>
<div align="center">

[![npm version](https://badgen.net/npm/v/theui-sveltekit?color=red)](https://www.npmjs.com/package/theui-sveltekit)
[![npm downloads](https://badgen.net/npm/dw/theui-sveltekit)](https://www.npmjs.com/package/theui-sveltekit)
[![npm downloads](https://badgen.net/npm/dt/theui-sveltekit)](https://www.npmjs.com/package/theui-sveltekit)
[![license](https://badgen.net/npm/license/theui-sveltekit)](https://github.com/mbparvezme/theui-sveltekit/blob/master/license.md)

</div>

<h2 align="center">A tool for the <b>Svelte eco-system</b></h2>

<div align="center">
  <img src="https://theui-beta.vercel.app/img/theui-sveltekit-components.svg" width="400px">
</div>

The **theui-svelte** is [**TheUI**](https://www.theui.dev)'s official component library for [**Svelte**](https://kit.svelte.dev), built on top of TailwindCSS. It combines the strength of SvelteKit and the features of TailwindCSS to create a powerful tool that accelerates your development process.

<br>

## **Features**

- Accessible components
- Easy control of dark and light modes
- Effortless theming and branding with a single line of CSS
- Highly customizable
- RTL supports (Upcoming)
- Fully typed for enhanced development

<br>

## **Components**

- General Components

  - [Accordion](https://www.svelte.theui.dev/components/accordion)
  - [Alert](https://www.svelte.theui.dev/components/alert)
  - [Badge](https://www.svelte.theui.dev/components/badge)
  - [Breadcrumb](https://www.svelte.theui.dev/components/breadcrumb)
  - [Button](https://www.svelte.theui.dev/components/button)
  - [Button group](https://www.svelte.theui.dev/components/button-group)
  - [Chips](https://www.svelte.theui.dev/components/chips)
  - [Collapse](https://www.svelte.theui.dev/components/collapse)
  - [Container](https://www.svelte.theui.dev/components/container)
  - [Drawer](https://www.svelte.theui.dev/components/drawer)
  - [Dropdown](https://www.svelte.theui.dev/components/dropdown)
  - [Floating Button](https://www.svelte.theui.dev/components/float-button)
  - [Modal](https://www.svelte.theui.dev/components/modal)
  - [Navbar](https://www.svelte.theui.dev/components/navbar)
  - [Notification](https://www.svelte.theui.dev/components/notification)
  - [Pagination](https://www.svelte.theui.dev/components/pagination)
  - [Popup (Exit & Entry popup)](https://www.svelte.theui.dev/components/popup)
  - [Progress bar](https://www.svelte.theui.dev/components/progress-bar)
  - [SVG](https://www.svelte.theui.dev/components/svg)
  - [Table](https://www.svelte.theui.dev/components/table)
  - [Tabs](https://www.svelte.theui.dev/components/tabs)
  - [Tooltip](https://www.svelte.theui.dev/components/tooltip)

- Form Components

  - [Check-box](https://www.svelte.theui.dev/components/check-box)
  - [Fieldset](https://www.svelte.theui.dev/components/fieldset)
  - [File input](https://www.svelte.theui.dev/components/file-input)
  - [Form](https://www.svelte.theui.dev/components/form)
  - [Helper text](https://www.svelte.theui.dev/components/helper-text)
  - [Input](https://www.svelte.theui.dev/components/input)
  - [Label](https://www.svelte.theui.dev/components/label)
  - [Radio button](https://www.svelte.theui.dev/components/radio-button)
  - [Select](https://www.svelte.theui.dev/components/select)
  - [Textarea](https://www.svelte.theui.dev/components/textarea)
  - [Text editor](https://www.svelte.theui.dev/components/text-editor)
  - [Toggle](https://www.svelte.theui.dev/components/toggle)

- Utility
  - [Close](https://www.svelte.theui.dev/components/close)
  - [Dark mode](https://www.svelte.theui.dev/components/dark-mode)

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
# Create project
npm create svelte@latest my-app
cd my-app

# Add TailwindCSS
npx svelte-add@latest tailwindcss

# Install node modules
npm i

# Install theui-svelte
npm i theui-svelte
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
    "./node_modules/theui-svelte/**/*.{html,js,svelte,ts}", // New line
  ],
  presets: [require("theui-svelte/preset")], // New line
  darkMode: "class",
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
  import "theui-svelte/style"; // Add this line inside script tag
  import "../app.postcss";
</script>
```

The file contains the following CSS codes. If you prefer not to use the default colors, you can copy the following code into your `app.postcss` file and customize it according to your needs.

```css
:root {
  --ui-bg-primary:  250 250 250; /* #FAFAFA */
  --ui-bg-secondary:  238 238 238; /* #EEEEEE */
  --ui-bg-tertiary: 224 224 224; /* #E0E0E0 */
  --ui-bg-primary-alt:  10 10 20; /* #0A0A14 */
  --ui-bg-secondary-alt:  30 30 40; /* #1E1E28 */
  --ui-bg-tertiary-alt: 55 55 65; /* #373741 */

  --ui-text-default:  33 33 33; /* #212121 */
  --ui-text-alt:  189 189 189; /* #BDBDBD */
  --ui-text-muted:  117 117 117; /* #757575 */

  --ui-max-width: 1408px;

  --ui-font-title:  "";
  --ui-font-body: "";
}

:root.dark {
  --ui-bg-primary:  10 10 20; /* #0A0A14 */
  --ui-bg-secondary:  30 30 40; /* #1E1E28 */
  --ui-bg-tertiary: 55 55 65; /* #373741 */
  --ui-bg-primary-alt:  250 250 250; /* #FAFAFA */
  --ui-bg-secondary-alt:  238 238 238; /* #EEEEEE */
  --ui-bg-tertiary-alt: 224 224 224; /* #E0E0E0 */

  --ui-text-default:  245 245 245; /* #F5F5F5 */
  --ui-text-alt:  75 75 75; /* #4B4B4B */
  --ui-text-muted:  175 175 175; /* #AFAFAF */
}
```

And thats all. You are ready to start your awesome project now.

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
| Drawer             | .drawer                   | 40              |
| Modal              | .modal                    | 50              |
| Popup              | .popup                    | 60              |
| Tooltip            | .tooltip                  | 70              |
| Notifications      | .notifications            | 80              |

<br>

## **Contributions**

Prior to commencing work on new features or bug fixes, kindly inform us. If you wish to propose a new feature, please create a feature request in [Github Issues](https://github.com/mbparvezme/theui-svelte/issues). This promotes open discussions and avoids redundant efforts. It encompasses tasks like adding new components, introducing utility features, and making major changes to existing work.

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
