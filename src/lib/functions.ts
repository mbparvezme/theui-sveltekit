import type { ANIMATE_SPEED, INPUT_CONFIG, ROUNDED, SHADOW } from "$lib/types";
import { twMerge } from "tailwind-merge";
type INPUT_TYPES = 'input' | 'file' | 'checkbox' | 'radio' | 'select';
type ROUNDED_SIDES = "top" | "end" | "bottom" | "start" | "topStart" | "topEnd" | "bottomStart" | "bottomEnd" | "all";
type ROUNDED_ITEM_TYPES = "default" | "fileButton" | "first" | "last";

const roundSides = { top: "t", end: "e", bottom: "b", start: "s", topStart: "ss", topEnd: "se", bottomStart: "es", bottomEnd: "ee", all: "" };

// Get container classes
export let getInputBoxClasses = (config: INPUT_CONFIG, attributes: any = {}, type: 'default' | 'group' = "default"): string => {
  let cls = `theui-input-box theui-input-${config.variant} ${(config?.reset ? "theui-reset" : "")}`;
  if (type == "default") {
    return `${cls} ${textSelectInputContainerClasses(config)}`;
  }
  if (type == "group") {
    return `${cls} ${radioCheckboxContainerClasses(config, attributes)}`;
  }
  return cls;
}

// Get container classes for input, textarea and select
let textSelectInputContainerClasses = (config: INPUT_CONFIG): string => `flex flex-col gap-2 ${(config?.grow ? "flex-grow" : "")}`;

// Get container classes for checkbox and radio
let radioCheckboxContainerClasses = (config: INPUT_CONFIG, attributes: any): string => {
  let cls = `theui-input-box theui-input-${config.variant} ${(config?.reset ? "theui-reset" : "cursor-pointer")}`;
  if (attributes?.disabled) {
    return `${cls} cursor-not-allowed opacity-50 select-none`;
  }
  if (attributes?.readonly) {
    return `${cls} pointer-events-none opacity-50`;
  }
  return cls;
}

export let getInputClasses = (
  config: INPUT_CONFIG,
  attr: any,
  type: INPUT_TYPES = "input",
  propsClass: string
) => {
  let defaultClasses = `${type !== "input" ? `theui-input-${type}` : `theui-input`} theui-input-${config.size} `;

  if (config?.reset) {
    return defaultClasses;
  }

  let cls = `${getInputSize(config, type)} ${getDefaultInputTheme(config, type)}`;

  if (type == "input" || type == "select") {
    cls += `${defaultInputClasses(config)} ${getAttributesClasses(attr)}`;
  }
  if (type == "file") {
    cls += `${fileInputClasses(config)} ${getAttributesClasses(attr)}`;
  }
  if (type == "checkbox" || type == "radio") {
    cls += radioAndCheckboxClasses();
  }

  return defaultClasses + twMerge(cls, propsClass);
};

let getInputSize = (config: INPUT_CONFIG, type: string = "input"): string => {

  let defaultInputSizes: { [type in 'flat' | 'nonFlat']: { [size in Exclude<INPUT_CONFIG['size'], undefined> | 'none']: string } } = {
    flat: {
      none: "",
      sm: "px-0 py-2 text-sm",
      md: "px-0 py-3",
      lg: "px-0 py-4 text-xl",
      xl: "px-0 py-5 text-2xl",
    },
    nonFlat: {
      none: "",
      sm: "p-2 text-sm",
      md: "p-3",
      lg: "p-4 text-xl",
      xl: "p-5 text-2xl",
    }
  };

  let fileInputSizes: { [size in Exclude<INPUT_CONFIG['size'], undefined> | 'none']: string } = {
    none: "",
    sm: "file:px-4 file:py-2 file:text-sm",
    md: "file:px-6 file:py-3",
    lg: "file:px-6 file:py-4 file:text-xl",
    xl: "file:px-8 file:py-5 file:text-2xl",
  };

  let binaryInputSizes: { [size in Exclude<INPUT_CONFIG['size'], undefined> | 'none']: string } = {
    none: "",
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  if (type == "file") {
    return fileInputSizes[config.size ?? "none"];
  }
  if (type == "checkbox" || type == "radio") {
    return binaryInputSizes[config.size ?? "none"];
  }
  return defaultInputSizes[config.variant == "flat" ? "flat" : "nonFlat"][config.size ?? "none"];
};

let getDefaultInputTheme = (config: INPUT_CONFIG, type: INPUT_TYPES) => {
  let theme: { [variant in Exclude<INPUT_CONFIG['variant'], undefined>]: string } = {
    bordered: "border border-gray-100 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-primary-500 focus:border-brand-primary-500",
    filled: "bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-brand-primary-500 focus:border-brand-primary-500",
    flat: (type !== "file" ? "border-0 border-b-2 border-gray-100 dark:border-gray-700 bg-transparent focus:ring-0" : "border-0 focus:ring-0")
  }
  return `${theme[config.variant ?? "bordered"]}${(type == "radio" ? roundedClass("full") : (config.variant == "flat" ? roundedClass("none") : roundedClass(config.rounded)))}`;
}

let defaultInputClasses = (config: INPUT_CONFIG) => ` outline-transparent ring-transparent block w-full${getAnimate(config?.animate)}`

let fileInputClasses = (config: INPUT_CONFIG) => ` file:mr-4 file:bg-brand-primary-50 file:text-brand-primary-600 dark:file:bg-brand-primary-700 dark:file:text-brand-primary-100 file:cursor-pointer cursor-pointer file:border-0${fileButtonRoundedClass(config?.rounded)}${roundedClass(config?.rounded)}`;

let radioAndCheckboxClasses = () => " bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-200/20 text-brand-primary-500 focus-within:ring-brand-primary-500 !ring-offset-primary";

export let getAttributesClasses = (attributes: any) => {
  if (attributes?.disabled) {
    return " disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none";
  }
  if (attributes?.readonly) {
    return " read-only:bg-gray-100 dark:read-only:bg-gray-800 read-only:pointer-events-none read-only:opacity-50";
  }
  return ""
}

// Check for key existence
export let isKeyExist = (obj: Record<string, any>, key: string): any => key in obj ? obj[key] : false;
// Generate random number
export let generateRandomNum = (min: number = 10, max: number = 99): number => Math.floor(Math.random() * (max - min + 1)) + min;
// Generate alpha-numeric tokes/ID
export let generateToken = (prefix: string = "_id"): string => prefix + (Date.now() + 1).toString(36) + generateRandomNum();
// Animation Class functions
export let getAnimate = (animate: ANIMATE_SPEED, type: string = ""): string => {
  const durationClasses = {
    faster: "duration-100",
    fast: "duration-150",
    slow: "duration-500",
    slower: "duration-700",
    normal: "duration-300"
  };

  const baseClass = !animate ? " theui-no-animate" : " theui-animate ease-in-out";
  const duration = animate ? ` ${durationClasses[animate] || durationClasses.normal}` : "";
  const transitionClass = type ? ` transition-${type}` : " transition-all";

  return baseClass + transitionClass + duration;
};
// Rounded Class functions
export let roundedClass = (value: ROUNDED = "md", side: ROUNDED_SIDES = "all", type: ROUNDED_ITEM_TYPES = "default"): string => {
  // return "rounded-ee-xl";
  return notRounded(value) ? " rounded-none" : (makeRoundedClass(side, type)[value] || " ");
}
export let fileButtonRoundedClass = (value: ROUNDED, side: ROUNDED_SIDES = "all"): string => roundedClass(value, side, "fileButton");
export let lastItemRoundedClass   = (value: ROUNDED, side: ROUNDED_SIDES = "all"): string => roundedClass(value, side, "last");
export let firstItemRoundedClass  = (value: ROUNDED, side: ROUNDED_SIDES = "all"): string => roundedClass(value, side, "first");
let notRounded = (value: ROUNDED) => !value || value === "none";
let roundedClassPrefix = (type: ROUNDED_ITEM_TYPES = "default") => {
  const prefixes = {default: "rounded", fileButton: "file:rounded", first: "first:rounded", last: "last:rounded"};
  return prefixes[type] || prefixes["default"];
};
let makeRoundedClass = (side: ROUNDED_SIDES, type: ROUNDED_ITEM_TYPES = "default") => {
  let classPrefix = roundedClassPrefix(type);
  const defaultClasses = {
    sm: `${classPrefix}${side == "all" ? "" : `-${roundSides[side]}`}`,
    md: `${classPrefix}${side == "all" ? "" : `-${roundSides[side]}`}-md`,
    lg: `${classPrefix}${side == "all" ? "" : `-${roundSides[side]}`}-lg`,
    xl: `${classPrefix}${side == "all" ? "" : `-${roundSides[side]}`}-xl`,
    full: `${classPrefix}${side == "all" ? "" : `-${roundSides[side]}`}-full`
  };
  return defaultClasses;
};
// Shadow Class functions
export let getShadow = (size?: SHADOW) => {
  const shadowClasses = { md: " shadow-md", sm: " shadow-sm", lg: " shadow-lg", xl: " shadow-xl", "2xl": " shadow-2xl", inner: " shadow-inner", none: " shadow-none"};
  return size ? shadowClasses[size] || " " : " shadow-none";
};
