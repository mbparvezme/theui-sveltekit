import type {
  ANIMATE_SPEED,
  INPUT_CONFIG,
  ROUNDED,
  SHADOW,
  ROUNDED_SIDES,
  ROUNDED_ITEM_TYPES,
  NOTIFY_CONFIG,
  NOTIFICATION_TYPE
} from "$lib/types"

import {
  roundClasses,
  shadowClasses,
  animationSpeed,
  animationType,
  fileButtonAnimation,
  inputTypeClass,
  inputSizeClass,
  defaultInputSizeClasses,
  fileInputSizeClasses,
  groupInputSizeClasses,
  messageTheme,
  messageBorderTheme,
  type ANIMATION_PROPERTY_TYPE,
  type INPUT_CATEGORY,
} from "$lib/vars"

import { twMerge } from "tailwind-merge"

let CONFIG: INPUT_CONFIG
let ATTRIBUTES: any

/**
 * Generates the base class for the input container based on the provided configuration, attributes, and input type.
 * 
 * @param config - Configuration object of type INPUT_CONFIG which may include settings like size, and other options.
 * @param attributes - Additional HTML attributes for the input container, like disabled or read-only states.
 * @param type - Specifies the input type, either 'default' or 'group'. Group input means radio, checkbox. Defaults to 'default'.
 * 
 * @returns A string representing the base class for the input container, with conditional additions based on type and attributes.
 * 
 * @remarks
 * - If `config.reset` is true, the function returns only the base class "theui-input-container" without additional classes.
 */
export const inputContainerClass = (config: INPUT_CONFIG, attributes: any = {}, type: 'default' | 'group' = "default"): string => {
  CONFIG = config;
  ATTRIBUTES = attributes;
  let customClass = type === "group" ? groupInputContainerClass() : defaultInputContainerClasses();
  return config?.reset ? "theui-input-container" : `theui-input-container ${twMerge(customClass, ATTRIBUTES?.class)}`;
};


/**
 * Builds the complete set of classes for an input element based on its configuration, attributes, type, and any additional classes.
 * 
 * @param config - Configuration object of type INPUT_CONFIG, which may include settings like size, reset, and other styling options.
 * @param attr - Additional HTML attributes for the input element, like disabled or read-only states.
 * @param type - Specifies the input category such as 'input', 'file', 'checkbox', 'radio', or 'select'. Defaults to 'input'.
 * @param propsClass - Optional string for additional classes passed to the input component.
 * 
 * @returns A string representing the classes for the input element, based on input type, config, and attributes.
 * 
 * @remarks
 * - If `config.reset` is true, the function returns only the base class without additional conditional classes.
 */
export const inputClasses = (config: INPUT_CONFIG, attr: any = {}, type: INPUT_CATEGORY = "input"): string => {
  CONFIG = config;
  ATTRIBUTES = attr;

  const baseClass = `${inputTypeClass[type || "input"]} ${inputSizeClass[config.size || "md"]} `;

  if (config?.reset) return baseClass;

  let cls = `${inputSizeClasses(type)} ${commonInputTheme(type)}${attributesClasses()}`;
  cls += (type === "input" || type === "select") ? ` ${defaultInputClasses()} ` : " ";
  cls += type === "file" ? fileInputClasses() : " ";
  cls += (type === "checkbox" || type === "radio") ? groupInputClasses() : " ";

  return twMerge(baseClass, cls, ATTRIBUTES?.class);
};


/**
 * Checks if a specific key exists within an object and returns its value if found.
 * 
 * @param obj - The object to check.
 * @param key - The key to look for in the object.
 * @returns The value associated with the key if it exists, or `false` if it doesn’t.
 * 
 * @example
 * const data = { name: "Alice", age: 30 };
 * isKeyExist(data, "name"); // Returns "Alice"
 * isKeyExist(data, "height"); // Returns false
 * 
 * @remarks
 * - Useful for safely accessing object properties without risking undefined values.
 */
export const isKeyExist = (obj: Record<string, any>, key: string): any => key in obj ? obj[key] : false;


/**
 * Generates a random number between a specified minimum and maximum.
 * 
 * @param min - The minimum value, defaults to 10.
 * @param max - The maximum value, defaults to 99.
 * @returns A random integer between the min and max values, inclusive.
 * 
 * @example
 * generateRandomNum(1, 100); // Returns a random number between 1 and 100
 * generateRandomNum(); // Returns a random number between 10 and 99
 * 
 * @remarks
 * - Uses `Math.random()` to generate the number, rounding down to the nearest integer.
 */
export const generateRandomNum = (min: number = 10, max: number = 99): number => Math.floor(Math.random() * (max - min + 1)) + min;


/**
 * Generates an alphanumeric token with a custom prefix, current timestamp, and a random number.
 * 
 * @param prefix - The string prefix for the token, defaults to "_id".
 * @returns A unique alphanumeric token string with the given prefix.
 * 
 * @example
 * generateToken("user_"); // Returns a token like "user_lk9vby43j24"
 * generateToken(); // Returns a token like "_id_k9vmzct08f"
 * 
 * @remarks
 * - Uses `Date.now()` for timestamp-based uniqueness and `generateRandomNum` for added randomness.
 */
export const generateToken = (prefix: string = "_id"): string => prefix + (Date.now() + 1).toString(36) + generateRandomNum();


/**
 * Generates a CSS class for animations based on animation speed and type.
 * 
 * @param animate - The animation speed (or undefined for no animation).
 * @param type - The animation property type (e.g., 'all', 'color'), defaults to "all".
 * @returns A string containing the CSS classes for the animation.
 * 
 * @remarks
 * - Returns an empty string if `animate` is undefined or set to "none".
 */
export const animationClass = (animate: ANIMATE_SPEED | undefined, type: ANIMATION_PROPERTY_TYPE = "all"): string => {
  if (!animate || animate === "none") return " ";

  const baseClass = " theui-animate ease-in-out";
  return type === "fileButton"
    ? ` ${baseClass}${fileButtonAnimation?.[animate] || " "}`
    : `${baseClass} ${animationSpeed?.[animate] || ""} ${animationType?.[type] || ""}`;
};


/**
 * Generates a CSS class for rounded corners based on the specified size, side, and item type.
 * 
 * @param value - The rounded size value, defaults to "md". Use "none" to disable rounding.
 * @param side - The side(s) to apply the rounding (e.g., "all", "top"), defaults to "all".
 * @param type - The item type to define the scope of rounding (e.g., "default", "fileButton"), defaults to "default".
 * @returns A string with the appropriate Tailwind CSS rounded class, or an empty string if no rounding is applied.
 * 
 * @remarks
 * - Defaults to the medium "md" size for general usage.
 */
export const roundedClass = (value: ROUNDED = "md", side: ROUNDED_SIDES = "all", type: ROUNDED_ITEM_TYPES = "default"): string =>
  (!value || value === "none") ? " " : (roundClasses[type]?.[side]?.[value] || " ");


/**
 * Generates a CSS class for shadow effects based on the specified shadow size.
 * 
 * @param size - The shadow intensity (e.g., "sm", "md"), optional. Use "none" or leave undefined to disable shadow.
 * @returns A string with the appropriate Tailwind CSS shadow class, or an empty string if no shadow is applied.
 * 
 * @remarks
 * - Returns an empty string if `size` is undefined or explicitly set to "none".
 */
export const shadowClass = (size?: SHADOW) => (!size || size === "none") ? " " : (shadowClasses[size] || " ");


// Helper functions


/**
 * Adds base classes for the input container based on whether it should expand to fill available space.
 * 
 * @returns A string containing classes that apply a flex layout, spacing, and optionally a `flex-grow` if `CONFIG.grow` is true.
 * 
 * @remarks
 * - The class `flex-grow` is conditionally applied if `CONFIG.grow` is set to true, making the container take up additional space.
 */
const defaultInputContainerClasses = (): string => `flex flex-col gap-2`;


/**
 * Adds classes for handling disabled or read-only states within a grouped input container.
 * 
 * @returns A string containing the appropriate cursor and pointer events based on the `disabled` or `readonly` states in `ATTRIBUTES`.
 * 
 * @remarks
 * - Adds `cursor-not-allowed`, `opacity-50`, and `select-none` for `disabled` state.
 * - Adds `pointer-events-none` for `readonly` state, preventing interactions.
 */
const groupInputContainerClass = (): string => {
  let attrClass: string = "";
  if (ATTRIBUTES?.disabled) {
    attrClass += "cursor-not-allowed opacity-50 select-none";
  }
  if (ATTRIBUTES?.readonly) {
    attrClass += "pointer-events-none";
  }

  return `cursor-pointer ${attrClass}`;
};


/**
 * Determines the size classes for an input based on its category type and configuration size.
 * 
 * @param type - The type of input category, defaulting to "input". Can be "file", "checkbox", "radio", or "input".
 * 
 * @returns A string representing the size-specific classes for the input, with variations based on `CONFIG.size` and `CONFIG.variant`.
 * 
 * @remarks
 * - For "file" inputs, retrieves size from `fileInputSizeClasses`.
 * - For "checkbox" and "radio" types, retrieves size from `groupInputSizeClasses`.
 * - For other input types, applies different classes based on `flat` or `nonFlat` variant.
 */
const inputSizeClasses = (type: INPUT_CATEGORY = "input"): string => {
  if (type === "file") return fileInputSizeClasses[CONFIG.size ?? "md"];
  if (type === "checkbox" || type === "radio") return groupInputSizeClasses[CONFIG.size ?? "md"];

  return defaultInputSizeClasses[CONFIG.variant === "flat" ? "flat" : "nonFlat"][CONFIG.size ?? "md"];
};


/**
 * Applies theme classes to an input element based on its type and variant.
 * 
 * @param type - The input category, which influences which rounded and border classes are applied.
 * 
 * @returns A string with the theme classes, determined by the `CONFIG.variant` (like "bordered", "filled", or "flat") and input type.
 * 
 * @remarks
 * - Uses theme-specific classes based on `CONFIG.variant`, applying different border and background styles.
 * - Adds rounded classes according to the `type`, adding "full" rounding for radio buttons and conditional rounding for others.
 */
const commonInputTheme = (type: INPUT_CATEGORY): string => {
  const themes = {
    bordered: "border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-primary-500 focus:border-brand-primary-500",
    filled: "bg-black/5 dark:bg-white/10 border-0 focus:ring-1 focus:ring-brand-primary-500 focus:border-brand-primary-500",
    flat: type !== "file" ? "border-0 border-b-2 border-gray-300 dark:border-gray-700 bg-transparent focus:ring-0" : "border-0 focus:ring-0"
  };
  const theme = themes[CONFIG.variant ?? "bordered"];

  return `${theme}${type === "radio" ? roundedClass("full") : (CONFIG.variant == "flat" ? " " : roundedClass(CONFIG?.rounded))}`;
};


/**
 * Returns the default classes for an input element, including animation styling.
 * 
 * @returns A string of base classes for input styling, adding animation based on `CONFIG.animate`.
 * 
 * @remarks
 * - Includes `outline-transparent` and `ring-transparent` to manage input outline and focus ring appearance.
 * - Uses `animationClass` to add animation based on the configuration.
 */
const defaultInputClasses = (): string => `outline-transparent ring-transparent block w-full ${animationClass(CONFIG?.animate)}`;


/**
 * Adds classes for `disabled` or `readonly` states, styling the input accordingly.
 * 
 * @returns A string of classes for handling `disabled` or `readonly` states, or an empty string if neither applies.
 * 
 * @remarks
 * - For `disabled` state, sets a background color, cursor, opacity, and disables selection.
 * - For `readonly` state, sets a background color, pointer events, and opacity to indicate a read-only field.
 */
const attributesClasses = (): string => {
  if (ATTRIBUTES?.disabled) return " disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none";
  if (ATTRIBUTES?.readonly) return " read-only:bg-gray-100 dark:read-only:bg-gray-800 read-only:pointer-events-none read-only:opacity-50";

  return "";
};


/**
 * Returns classes specific to file input styling, including button and text colors.
 * 
 * @returns A string containing classes for file input appearance, including spacing, colors, and cursor.
 * 
 * @remarks
 * - Adds `file:mr-4` for margin between the file button and text.
 * - Sets colors for the file input button, adapting to dark mode.
 * - Uses `roundedClass` to apply rounded corners based on configuration.
 */
const fileInputClasses = (): string => ` file:mr-4 file:bg-brand-primary-50 file:text-brand-primary-600 dark:file:bg-brand-primary-700 dark:file:text-brand-primary-100 file:cursor-pointer cursor-pointer file:border-0 ${roundedClass(CONFIG?.rounded, "all", "fileButton")}${roundedClass(CONFIG?.rounded)}`;


/**
 * Returns styling classes for grouped input elements, like checkboxes and radio buttons.
 * 
 * @returns A string of classes specific to grouped inputs, including background, border, text color, and focus ring.
 * 
 * @remarks
 * - Adds a background color suitable for light and dark modes.
 * - Sets border styling and colors for input groups.
 * - Uses `focus-within` to set a focus ring on the entire input group container.
 */
const groupInputClasses = (): string => " bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-200/20 text-brand-primary-500 focus-within:ring-brand-primary-500 !ring-offset-primary";


export const notificationClasses = (config: NOTIFY_CONFIG, type: NOTIFICATION_TYPE = "error", props: any = null): string => {
  let theme = config?.theme ?? "default"
  let baseClass = `theui-notification px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer ${messageTheme[theme][type]}`
  const variantClasses = {
    card: roundedClass(config?.rounded ?? "md"),
    borderTop: `${roundedClass(config?.rounded ?? "md", "bottom")} ${messageBorderTheme[theme][type]} border-t-4`,
    borderBottom: `${roundedClass(config?.rounded ?? "md", "top")} ${messageBorderTheme[theme][type]} border-b-4`,
    borderStart: `${roundedClass(config?.rounded ?? "md")} ${messageBorderTheme[theme][type]} border-s-4`
  }
  return twMerge(`${baseClass} ${variantClasses[config?.variant ?? "card"]}`, (props?.class || "") as string);
}

export let backdropClasses = (backdrop: string|boolean) =>
  `backdrop fixed inset-0 ${twMerge("bg-black/50 z-[-1]", (typeof backdrop == "string" ? backdrop : ""))}`

export let isLocalUrl = (url: string) : boolean => {
  try {
    const parsedUrl = new URL(url, window.location.origin)
    return parsedUrl.origin === window.location.origin
  } catch (error) {
    return false
  }
}