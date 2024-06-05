import type { ANIMATE_SPEED, INPUT_CONFIG, ROUNDED, SHADOW } from "$lib/types";
import { twMerge } from "tailwind-merge";
type DEFAULT_INPUT_TYPES = 'input' | 'textarea' | 'select' | 'file' | 'editor';
type GROUP_INPUT_TYPES = 'checkbox' | 'radio' | 'toggle';

const defaultInputSizes: { [type in 'flat' | 'default']: { [size in NonNullable<INPUT_CONFIG['size']>]: string } } = {
  flat: {
    sm: "px-0 py-2 text-sm",
    md: "px-0 py-3",
    lg: "px-0 py-4 text-xl",
    xl: "px-0 py-5 text-2xl",
  },
  default: {
    sm: "p-2 text-sm",
    md: "p-3",
    lg: "p-4 text-xl",
    xl: "p-5 text-2xl",
  }
};

const fileInputSizes: { [size in NonNullable<INPUT_CONFIG['size']>]: string } = {
  sm: "file:px-4 file:py-2 file:text-sm",
  md: "file:px-6 file:py-3",
  lg: "file:px-6 file:py-4 file:text-xl",
  xl: "file:px-8 file:py-5 file:text-2xl",
};

const groupInputSizes: { [size in NonNullable<INPUT_CONFIG['size']>]: string } = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
}

const roundedStyles: any = {
  top: {
    sm: " rounded-t",
    md: " rounded-t-md",
    lg: " rounded-t-lg",
    xl: " rounded-t-xl",
    full: " rounded-t-full"
  },
  right: {
    sm: " rounded-r",
    md: " rounded-r-md",
    lg: " rounded-r-lg",
    xl: " rounded-r-xl",
    full: " rounded-r-full"
  },
  bottom: {
    sm: " rounded-b",
    md: " rounded-b-md",
    lg: " rounded-b-lg",
    xl: " rounded-b-xl",
    full: " rounded-b-full"
  },
  left: {
    sm: " rounded-l",
    md: " rounded-l-md",
    lg: " rounded-l-lg",
    xl: " rounded-l-xl",
    full: " rounded-l-full"
  },
  all: {
    sm: " rounded",
    md: " rounded-md",
    lg: " rounded-lg",
    xl: " rounded-xl",
    full: " rounded-full"
  },
};

const roundedFileBtnStyles: any = {
  top: {
    sm: " file:rounded-t",
    md: " file:rounded-t-md",
    lg: " file:rounded-t-lg",
    xl: " file:rounded-t-xl",
    full: " file:rounded-t-full",
  },
  right: {
    sm: " file:rounded-r",
    md: " file:rounded-r-md",
    lg: " file:rounded-r-lg",
    xl: " file:rounded-r-xl",
    full: " file:rounded-r-full",
  },
  bottom: {
    sm: " file:rounded-b",
    md: " file:rounded-b-md",
    lg: " file:rounded-b-lg",
    xl: " file:rounded-b-xl",
    full: " file:rounded-b-full",
  },
  left: {
    sm: " file:rounded-l",
    md: " file:rounded-l-md",
    lg: " file:rounded-l-lg",
    xl: " file:rounded-l-xl",
    full: " file:rounded-l-full",
  },
  all: {
    sm: " file:rounded",
    md: " file:rounded-md",
    lg: " file:rounded-lg",
    xl: " file:rounded-xl",
    full: " file:rounded-full",
  },
};

const roundedFirstElemStyles: any = {
  top: {
    sm: " first:rounded-t",
    md: " first:rounded-t-md",
    lg: " first:rounded-t-lg",
    xl: " first:rounded-t-xl",
    full: " first:rounded-t-full"
  },
  right: {
    sm: " first:rounded-r",
    md: " first:rounded-r-md",
    lg: " first:rounded-r-lg",
    xl: " first:rounded-r-xl",
    full: " first:rounded-r-full",
    default: " ",
  },
  bottom: {
    sm: " first:rounded-b",
    md: " first:rounded-b-md",
    lg: " first:rounded-b-lg",
    xl: " first:rounded-b-xl",
    full: " first:rounded-b-full"
  },
  left: {
    sm: " first:rounded-l",
    md: " first:rounded-l-md",
    lg: " first:rounded-l-lg",
    xl: " first:rounded-l-xl",
    full: " first:rounded-l-full"
  },
  all: {
    sm: " first:rounded",
    md: " first:rounded-md",
    lg: " first:rounded-lg",
    xl: " first:rounded-xl",
    full: " first:rounded-full"
  },
};

const roundedLastElemStyles: any = {
  top: {
    sm: " last:rounded-t",
    md: " last:rounded-t-md",
    lg: " last:rounded-t-lg",
    xl: " last:rounded-t-xl",
    full: " last:rounded-t-full",
  },
  right: {
    sm: " last:rounded-r",
    md: " last:rounded-r-md",
    lg: " last:rounded-r-lg",
    xl: " last:rounded-r-xl",
    full: " last:rounded-r-full",
  },
  bottom: {
    sm: " last:rounded-b",
    md: " last:rounded-b-md",
    lg: " last:rounded-b-lg",
    xl: " last:rounded-b-xl",
    full: " last:rounded-b-full",
  },
  left: {
    sm: " last:rounded-l",
    md: " last:rounded-l-md",
    lg: " last:rounded-l-lg",
    xl: " last:rounded-l-xl",
    full: " last:rounded-l-full",
  },
  all: {
    sm: " rounded",
    md: " last:rounded-md",
    lg: " last:rounded-lg",
    xl: " last:rounded-xl",
    full: " last:rounded-full",
  },
};

// Get container classes
export const getInputBoxClasses = (config: INPUT_CONFIG, attributes: any = {}, type: 'default' | 'group' = "default"): string => {
  const baseClass = `theui-input-box`;
  if (attributes?.reset){
    return `${baseClass} theui-reset`;
  }
  return `${baseClass} ${type == "default" ? defaultInputBoxClasses(config) : type == "group" ? groupInputBoxClasses(config, attributes) : baseClass}`;
};

export const getInputClasses = (
  config: INPUT_CONFIG,
  attributes: any,
  type: DEFAULT_INPUT_TYPES | GROUP_INPUT_TYPES = "input"
): string => {
  const defaultClasses = `${type == "input" ? `theui-input` : `theui-${type}-input`} theui-input-${config.size}`;
  if (config?.reset) {
    return defaultClasses;
  }
  if ((type != "checkbox" && type != "radio") && !config?.variant) {
    return "";
  }

  if (type == "input" || type == "select" || type == "editor" || type == "textarea") {
    return `${defaultClasses} ${twMerge(defaultInputClasses(config, attributes, type), attributes?.class)}`;
  }

  if (type == "file") {
    return `${defaultClasses} ${twMerge(getFileInputClasses(config, attributes), attributes?.class)}`;
  }

  if (type == "checkbox" || type == "radio") {
    return `${defaultClasses} ${twMerge(getGroupInputClasses(config, attributes, type), attributes?.class)}`;
  }

  return `${defaultClasses} ${attributes?.class}`;
};

// Get container classes for input, textarea and select
let defaultInputBoxClasses = (config: INPUT_CONFIG): string => `flex flex-col gap-2 ${(config?.grow ? "flex-grow" : "")}`;

// Get container classes for checkbox and radio
const groupInputBoxClasses = (config: INPUT_CONFIG, attributes: any): string => {
  const baseClass = `theui-input-box ${config?.reset ? "theui-reset" : ""}`;
  if (attributes?.disabled) {
    return `${baseClass} cursor-not-allowed opacity-50 select-none`;
  }
  if (attributes?.readonly) {
    return `${baseClass} pointer-events-none opacity-50`;
  }
  return baseClass;
};

const defaultInputClasses = (config: INPUT_CONFIG, attr: any, type: DEFAULT_INPUT_TYPES): string => {
  let size =  defaultInputSizes[config.variant == "flat" ? "flat" : "default"][config?.size ?? "md"];

  return `block ${size}${getAnimate(config?.animate)}${config?.variant == "flat" ? getRounded("none") : getRounded(config.rounded)} ${getInputTheme(config?.variant, type)} ${getAttributesClasses(attr)}`
};

const getFileInputClasses = (config: INPUT_CONFIG, attr: any): string => {
  return ` ${fileInputSizes[config?.size ?? "md"]} file:mr-4 file:bg-brand/10 file:text-brand file:cursor-pointer cursor-pointer file:border-0${getRoundedFileBtn(config?.rounded)}${getRounded(config?.rounded)} ${getInputTheme(config?.variant, "input")} ${getAttributesClasses(attr)}`
};

const getGroupInputClasses = (config: INPUT_CONFIG, attr: any, type: 'checkbox' | 'radio') => {
  let roundedSize: ROUNDED
  if (type == "radio"){
    roundedSize = (config.size == "sm" || config.size == "md") ? "sm" : "md";
  }
  return ` bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-200/20 text-brand focus-within:ring-brand dark:checked:bg-brand !ring-offset-primary peer ${groupInputSizes[config?.size ?? "md"]} ${type == "radio" ? getRounded("full") : getRounded(roundedSize??"sm")} ${getAttributesClasses(attr)}`;
}

let getInputTheme = (variant: 'bordered' | 'filled' | 'flat' = "bordered", type: any) => {
  let common = `outline-none ring-1 ring-transparent ${type == "editor" ? "focus-within:outline-none focus-within:ring-brand" : "focus:outline-none focus:ring-brand"}`;
  const theme: Record<NonNullable<INPUT_CONFIG['variant']>, string> = {
    bordered: "border border-gray-100 dark:border-gray-700 focus:border-brand bg-transparent",
    filled: "border-0 bg-gray-50 dark:bg-gray-800",
    flat: type != "file" ? "border-0 border-b-2 border-gray-100 dark:border-gray-700 bg-transparent" : "border-0"
  };
  return `${common} ${theme[variant??"bordered"]}`;
}

let getAttributesClasses = (attributes: any) => {
  if (attributes?.disabled) {
    return " disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none";
  }
  if (attributes?.readonly) {
    return " read-only:bg-gray-100 dark:read-only:bg-gray-800 read-only:pointer-events-none read-only:opacity-50";
  }
  return ""
}

// Generale Functions
export let getKey = (obj: Record<string, any>, key: string): any => obj[key] || "_NULL_";

export let getRandomNum = (min: number = 10, max: number = 99): number => Math.floor(Math.random() * (max - min + 1)) + min;

export let generateToken = (prefix: string = "_id"): string => {
  let n = Date.now();
  return prefix + (++n).toString(36) + getRandomNum();
};

// ===================================
// Tailwind CSS class getter
// ===================================
export let getAnimate = (animate: ANIMATE_SPEED, type: string = "nonFile"): string => {
  if (!animate){
    return " theui-no-animate";
  }

  if (type == "file") {
    return ` theui-animate file:transition-all file:ease-in-out ${animateDuration(animate, 'file')}`;
  }

  return ` theui-animate ease-in-out ${animationType(type)} ${animateDuration(animate, type)}`;
};

let animateDuration = (animate: ANIMATE_SPEED, type: string) => {
  const duration: any = {
    file: {
      fastest: "file:duration-100",
      fast: "file:duration-150",
      normal: "file:duration-300",
      slow: "file:duration-500",
      slower: "file:duration-700"
    },
    nonFile: {
      fastest: "duration-100",
      fast: "duration-150",
      normal: "duration-300",
      slow: "duration-500",
      slower: "duration-700"
    }
  }
  return animate ? duration[type][animate] : ""
}

let animationType = (type: string = "default") => {
  const animationType: any = {
    color: "transition-color",
    opacity: "transition-opacity",
    shadow: "transition-shadow",
    transform: "transition-transform",
    default: "transition-all"
  }
  return animationType[type] ?? animationType['default']
}

export let getRounded = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
  if (!value) return " rounded-none";
  return (roundedStyles[side] && roundedStyles[side][value]) ? roundedStyles[side][value] : " ";
};

export let getRoundedFileBtn = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
  if (!value) return " !file:rounded-none";
  return (roundedFileBtnStyles[side] && roundedFileBtnStyles[side][value]) ? roundedFileBtnStyles[side][value] : " ";
};

export let getRoundedFirst = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
  if (!value) return " !first:rounded-none";
  return (roundedFirstElemStyles[side] && roundedFirstElemStyles[side][value]) ? roundedFirstElemStyles[side][value] : " ";
};

export let getRoundedLast = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
  if (!value) return " !last:rounded-none";
  return (roundedLastElemStyles[side] && roundedLastElemStyles[side][value]) ? roundedLastElemStyles[side][value] : " ";
};

export let getShadow = (size?: SHADOW) => {
  if (!size) return " shadow-none";
  const shadowStyles: any = {
    md: " shadow-md",
    sm: " shadow-sm",
    lg: " shadow-lg",
    xl: " shadow-xl",
    "2xl": " shadow-2xl",
    inner: " shadow-inner",
    default: " ",
  };
  return shadowStyles[size] || shadowStyles.default;
};
