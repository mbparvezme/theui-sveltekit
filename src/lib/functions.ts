type ANIMATION_PROPERTY_TYPE = 'color' | 'opacity' | 'shadow' | 'transform' | 'all' | 'fileButton';
import type { ANIMATE_SPEED, INPUT_CONFIG, ROUNDED, SHADOW, ROUNDED_SIDES, ROUNDED_ITEM_TYPES } from "$lib/types";
import { roundClasses, shadowClasses, animationSpeed, animationType, fileButtonAnimation, inputTypeClass, inputSizeClass, defaultInputSizeClasses, fileInputSizeClasses, groupInputSizeClasses } from "$lib/vars";
import { twMerge } from "tailwind-merge";

type INPUT_CATEGORY = 'input' | 'file' | 'checkbox' | 'radio' | 'select';

let CONFIG: INPUT_CONFIG;
let ATTRIBUTES: any;

// Generates the base class for the input container based on the type and attributes
export const inputContainerClass = (config: INPUT_CONFIG, attributes: any = {}, type: 'default' | 'group' = "default"): string => {
  CONFIG = config;
  ATTRIBUTES = attributes;

  return config?.reset
    ? "theui-input-container"
    : `theui-input-container ${type === "group" ? groupInputContainerClass() : defaultInputContainerClasses()}`;
};


// Builds the input classes based on the type and properties
export const inputClasses = (config: INPUT_CONFIG, attr: any, type: INPUT_CATEGORY = "input", propsClass: string): string => {
  CONFIG = config;
  ATTRIBUTES = attr;

  const baseClass = `${inputTypeClass[type || "input"]} ${inputSizeClass[config.size || "md"]}`;

  if (config?.reset) return baseClass;

  let cls = `${inputSizeClasses(type)}${commonInputTheme(type)}${attributesClasses()}`;
  cls += (type === "input" || type === "select") ? ` ${defaultInputClasses()}` : " ";
  cls += type === "file" ? fileInputClasses() : " ";
  cls += (type === "checkbox" || type === "radio") ? groupInputClasses() : " ";

  return twMerge(baseClass, cls, propsClass);
};

// Helper functions

// Adds classes based on whether the input container should grow
const defaultInputContainerClasses = (): string => `flex flex-col gap-2 ${CONFIG?.grow ? "flex-grow" : ""}`;

// Determines the cursor and pointer events based on disabled/read-only states
const groupInputContainerClass = (): string => {
  const disabledClass = ATTRIBUTES?.disabled ? " cursor-not-allowed opacity-50 select-none" : "";
  const readonlyClass = ATTRIBUTES?.readonly ? " pointer-events-none" : "";

  return `cursor-pointer${disabledClass || readonlyClass}`;
};

// Assigns size classes based on type and size configuration
const inputSizeClasses = (type: INPUT_CATEGORY = "input"): string => {
  if (type === "file") return fileInputSizeClasses[CONFIG.size ?? "md"];
  if (type === "checkbox" || type === "radio") return groupInputSizeClasses[CONFIG.size ?? "md"];

  return defaultInputSizeClasses[CONFIG.variant === "flat" ? "flat" : "nonFlat"][CONFIG.size ?? "md"];
};

// Applies the theme based on the type and variant
const commonInputTheme = (type: INPUT_CATEGORY): string => {
  const themes = {
    bordered: "border border-gray-100 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-primary-500 focus:border-brand-primary-500",
    filled: "bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-brand-primary-500 focus:border-brand-primary-500",
    flat: type !== "file" ? "border-0 border-b-2 border-gray-100 dark:border-gray-700 bg-transparent focus:ring-0" : "border-0 focus:ring-0"
  };
  const theme = themes[CONFIG.variant ?? "bordered"];

  return ` ${theme}${type === "radio" ? roundedClass("full") : roundedClass(CONFIG.rounded)}`;
};

// Returns default classes with animation
const defaultInputClasses = (): string => `outline-transparent ring-transparent block w-full ${animationClass(CONFIG.animate)}`;

// Sets classes based on disabled/read-only state
const attributesClasses = (): string => {
  if (ATTRIBUTES?.disabled) return " disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none";
  if (ATTRIBUTES?.readonly) return " read-only:bg-gray-100 dark:read-only:bg-gray-800 read-only:pointer-events-none read-only:opacity-50";

  return "";
};

// File input-specific classes
const fileInputClasses = (): string => ` file:mr-4 file:bg-brand-primary-50 file:text-brand-primary-600 dark:file:bg-brand-primary-700 dark:file:text-brand-primary-100 file:cursor-pointer cursor-pointer file:border-0 ${roundedClass(CONFIG?.rounded, "all", "fileButton")}${roundedClass(CONFIG?.rounded)}`;

// Group input-specific classes
const groupInputClasses = (): string => " bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-200/20 text-brand-primary-500 focus-within:ring-brand-primary-500 !ring-offset-primary";

// Checks for key existence in an object
export const isKeyExist = (obj: Record<string, any>, key: string): any => key in obj ? obj[key] : false;

// Generates a random number between min and max
export const generateRandomNum = (min: number = 10, max: number = 99): number => Math.floor(Math.random() * (max - min + 1)) + min;

// Generates an alphanumeric token/ID
export const generateToken = (prefix: string = "_id"): string => prefix + (Date.now() + 1).toString(36) + generateRandomNum();

// Animation Class function
export const animationClass = (animate: ANIMATE_SPEED, type: ANIMATION_PROPERTY_TYPE = "all"): string => {
  if (!animate) return " theui-no-animate";

  const baseClass = " theui-animate ease-in-out";
  return type === "fileButton"
    ? ` ${baseClass}${fileButtonAnimation?.[animate] || " "}`
    : `${baseClass} ${animationSpeed?.[animate] || ""} ${animationType?.[type] || ""}`;
};

// Rounded Class function
export const roundedClass = (value: ROUNDED = "md", side: ROUNDED_SIDES = "all", type: ROUNDED_ITEM_TYPES = "default"): string =>
  (!value || value === "none") ? " rounded-none" : (roundClasses[type]?.[side]?.[value] || " ");

// Shadow Class function
export const shadowClass = (size?: SHADOW) => (!size || size === "none") ? " shadow-none" : (shadowClasses[size] || " ");