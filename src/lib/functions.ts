import type { ANIMATE_SPEED, INPUT_CONFIG, ROUNDED, SHADOW } from "$lib/types";
import { twMerge } from "tailwind-merge";
type INPUT_TYPES = 'input' | 'file' | 'checkbox' | 'radio' | 'select';

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
  let cls = `theui-input-box theui-input-${config.variant} ${(config?.reset ? "theui-reset" : "")}`;
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

  if (config?.reset){
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
    cls += radioAndCheckboxClasses(config);
  }

  return defaultClasses + twMerge(cls, propsClass);
};

let getInputSize = (
    config: INPUT_CONFIG,
    type: string = "input",
  ): string => {

  let defaultInputSizes: {[type in 'flat' | 'nonFlat']: {[size in INPUT_CONFIG['size']] : string}} = {
    flat : {
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

  let fileInputSizes: { [size in INPUT_CONFIG['size']]: string } = {
    none: "",
    sm: "file:px-4 file:py-2 file:text-sm",
    md: "file:px-6 file:py-3",
    lg: "file:px-6 file:py-4 file:text-xl",
    xl: "file:px-8 file:py-5 file:text-2xl",
  };

  let binaryInputSizes: { [size in INPUT_CONFIG['size']]: string } = {
    none: "",
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  if (type == "file") {
    return fileInputSizes[config.size];
  }
  if (type == "checkbox" || type == "radio") {
    // console.log(config.size, binaryInputSizes[config.size])
    return binaryInputSizes[config.size];
  }
  return defaultInputSizes[config.variant == "flat" ? "flat" : "nonFlat"][config.size];
};

let getDefaultInputTheme = (config : INPUT_CONFIG, type: INPUT_TYPES) => {
  let theme: { [variant in INPUT_CONFIG['variant']]: string } = {
    bordered: "border border-gray-100 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand focus:border-brand",
    filled: "bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-brand focus:border-brand",
    flat: (type !== "file" ? "border-0 border-b-2 border-gray-100 dark:border-gray-700 bg-transparent focus:ring-0" : "border-0 focus:ring-0")
  }
  return `${theme[config.variant]}${(type == "radio" ? getRounded("full") : (config.variant == "flat" ? getRounded("none") : getRounded(config.rounded)))}`;
}

let defaultInputClasses = (config: INPUT_CONFIG) => ` outline-transparent ring-transparent block w-full${getAnimate(config?.animate)}`

let fileInputClasses = (config: INPUT_CONFIG) => ` file:mr-4 file:bg-brand/10 file:text-brand file:cursor-pointer cursor-pointer file:border-0${getRoundedFileBtn(config?.rounded)}${getRounded(config?.rounded)}`;

let radioAndCheckboxClasses = (config: INPUT_CONFIG) => " bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-200/20 text-brand focus-within:ring-brand dark:checked:bg-brand !ring-offset-primary peer";

export let getAttributesClasses = (attributes: any) => {
  if (attributes?.disabled) {
    return " disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none";
  }
  if (attributes?.readonly) {
    return " read-only:bg-gray-100 dark:read-only:bg-gray-800 read-only:pointer-events-none read-only:opacity-50";
  }
  return ""
}

// Generale Functions
export let getKey = (obj: Record<string, any>, key: string): any =>
  obj[key] || "_NULL_";

export let getRandomNum = (min: number = 10, max: number = 99): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export let generateToken = (prefix: string = "_id"): string => {
  let n = Date.now();
  return prefix + (++n).toString(36) + getRandomNum();
};

// ===================================
// Tailwind CSS class getter
// ===================================
export let getAnimate = (animate: ANIMATE_SPEED, type: string = ""): string => {
  if (type == "file") {
    return (
      " " +
      (!animate
        ? "file:theui-no-animate"
        : "file:theui-animate file:transition-all file:ease-in-out " +
          (animate == "faster"
            ? "file:duration-100"
            : animate == "fast"
              ? "file:duration-150"
              : animate == "slow"
                ? "file:duration-500"
                : animate == "slower"
                  ? "file:duration-700"
                  : "file:duration-300"))
    );
  }

  let duration =
    " theui-animate ease-in-out " +
    (animate == "faster"
      ? "duration-100"
      : animate == "fast"
        ? "duration-150"
        : animate == "slow"
          ? "duration-500"
          : animate == "slower"
            ? "duration-700"
            : "duration-300");

  if (type == "color")
    return !animate ? " theui-no-animate" : duration + " transition-colors";
  if (type == "opacity")
    return !animate ? " theui-no-animate" : duration + " transition-opacity";
  if (type == "shadow")
    return !animate ? " theui-no-animate" : duration + " transition-shadow";
  if (type == "transform")
    return !animate ? " theui-no-animate" : duration + " transition-transform";

  return !animate ? " theui-no-animate" : duration + " transition-all";
};

export let getRounded = (
  value: ROUNDED,
  side: "top" | "right" | "bottom" | "left" | "all" = "all",
): string => {
  if (!value) return " rounded-none";
  if (side == "top") {
    return value == "sm"
      ? " rounded-t"
      : value == "lg"
        ? " rounded-t-lg"
        : value == "md"
          ? " rounded-t-md"
          : value == "xl"
            ? " rounded-t-xl"
            : value == "full"
              ? " rounded-t-full"
              : " ";
  }
  if (side == "right") {
    return value == "sm"
      ? " rounded-r"
      : value == "lg"
        ? " rounded-r-lg"
        : value == "md"
          ? " rounded-r-md"
          : value == "xl"
            ? " rounded-r-xl"
            : value == "full"
              ? " rounded-r-full"
              : " ";
  }
  if (side == "bottom") {
    return value == "sm"
      ? " rounded-b"
      : value == "lg"
        ? " rounded-b-lg"
        : value == "md"
          ? " rounded-b-md"
          : value == "xl"
            ? " rounded-b-xl"
            : value == "full"
              ? " rounded-b-full"
              : " ";
  }
  if (side == "left") {
    return value == "sm"
      ? " rounded-l"
      : value == "lg"
        ? " rounded-l-lg"
        : value == "md"
          ? " rounded-l-md"
          : value == "xl"
            ? " rounded-l-xl"
            : value == "full"
              ? " rounded-l-full"
              : " ";
  }
  if (side == "all") {
    return value == "sm"
      ? " rounded"
      : value == "lg"
        ? " rounded-lg"
        : value == "md"
          ? " rounded-md"
          : value == "xl"
            ? " rounded-xl"
            : value == "full"
              ? " rounded-full"
              : " ";
  }
  return " ";
};

export let getRoundedFileBtn = (
  value: ROUNDED,
  side: "top" | "right" | "bottom" | "left" | "all" = "all",
): string => {
  if (!value) return " !file:rounded-none";
  if (side == "top") {
    return value == "sm"
      ? " file:rounded-t"
      : value == "lg"
        ? " file:rounded-t-lg"
        : value == "md"
          ? " file:rounded-t-md"
          : value == "xl"
            ? " file:rounded-t-xl"
            : value == "full"
              ? " file:rounded-t-full"
              : " ";
  }
  if (side == "right") {
    return value == "sm"
      ? " file:rounded-r"
      : value == "lg"
        ? " file:rounded-r-lg"
        : value == "md"
          ? " file:rounded-r-md"
          : value == "xl"
            ? " file:rounded-r-xl"
            : value == "full"
              ? " file:rounded-r-full"
              : " ";
  }
  if (side == "bottom") {
    return value == "sm"
      ? " file:rounded-b"
      : value == "lg"
        ? " file:rounded-b-lg"
        : value == "md"
          ? " file:rounded-b-md"
          : value == "xl"
            ? " file:rounded-b-xl"
            : value == "full"
              ? " file:rounded-b-full"
              : " ";
  }
  if (side == "left") {
    return value == "sm"
      ? " file:rounded-l"
      : value == "lg"
        ? " file:rounded-l-lg"
        : value == "md"
          ? " file:rounded-l-md"
          : value == "xl"
            ? " file:rounded-l-xl"
            : value == "full"
              ? " file:rounded-l-full"
              : " ";
  }
  if (side == "all") {
    return value == "sm"
      ? " file:rounded"
      : value == "lg"
        ? " file:rounded-lg"
        : value == "md"
          ? " file:rounded-md"
          : value == "xl"
            ? " file:rounded-xl"
            : value == "full"
              ? " file:rounded-full"
              : " ";
  }
  return " ";
};

export let getRoundedFirst = (
  value: ROUNDED,
  side: "top" | "end" | "bottom" | "start" | "all" = "all",
): string => {
  if (!value) return " !first:rounded-none";
  if (side == "top") {
    return value == "sm"
      ? " first:rounded-t"
      : value == "lg"
        ? " first:rounded-t-lg"
        : value == "md"
          ? " first:rounded-t-md"
          : value == "xl"
            ? " first:rounded-t-xl"
            : value == "full"
              ? " first:rounded-t-full"
              : " ";
  }
  if (side == "end") {
    return value == "sm"
      ? " first:rounded-e"
      : value == "lg"
        ? " first:rounded-e-lg"
        : value == "md"
          ? " first:rounded-e-md"
          : value == "xl"
            ? " first:rounded-e-xl"
            : value == "full"
              ? " first:rounded-e-full"
              : " ";
  }
  if (side == "bottom") {
    return value == "sm"
      ? " first:rounded-b"
      : value == "lg"
        ? " first:rounded-b-lg"
        : value == "md"
          ? " first:rounded-b-md"
          : value == "xl"
            ? " first:rounded-b-xl"
            : value == "full"
              ? " first:rounded-b-full"
              : " ";
  }
  if (side == "start") {
    return value == "sm"
      ? " first:rounded-s"
      : value == "lg"
        ? " first:rounded-s-lg"
        : value == "md"
          ? " first:rounded-s-md"
          : value == "xl"
            ? " first:rounded-s-xl"
            : value == "full"
              ? " first:rounded-s-full"
              : " ";
  }
  if (side == "all") {
    return value == "sm"
      ? " rounded"
      : value == "lg"
        ? " first:rounded-lg"
        : value == "md"
          ? " first:rounded-md"
          : value == "xl"
            ? " first:rounded-xl"
            : value == "full"
              ? " first:rounded-full"
              : " ";
  }
  return " ";
};

export let getRoundedLast = (
  value: ROUNDED,
  side: "top" | "end" | "bottom" | "start" | "all" = "all",
): string => {
  if (!value) return " !last:rounded-none";
  if (side == "top") {
    return value == "sm"
      ? " last:rounded-t"
      : value == "lg"
        ? " last:rounded-t-lg"
        : value == "md"
          ? " last:rounded-t-md"
          : value == "xl"
            ? " last:rounded-t-xl"
            : value == "full"
              ? " last:rounded-t-full"
              : " ";
  }
  if (side == "end") {
    return value == "sm"
      ? " last:rounded-e"
      : value == "lg"
        ? " last:rounded-e-lg"
        : value == "md"
          ? " last:rounded-e-md"
          : value == "xl"
            ? " last:rounded-e-xl"
            : value == "full"
              ? " last:rounded-e-full"
              : " ";
  }
  if (side == "bottom") {
    return value == "sm"
      ? " last:rounded-b"
      : value == "lg"
        ? " last:rounded-b-lg"
        : value == "md"
          ? " last:rounded-b-md"
          : value == "xl"
            ? " last:rounded-b-xl"
            : value == "full"
              ? " last:rounded-b-full"
              : " ";
  }
  if (side == "start") {
    return value == "sm"
      ? " last:rounded-s"
      : value == "lg"
        ? " last:rounded-s-lg"
        : value == "md"
          ? " last:rounded-s-md"
          : value == "xl"
            ? " last:rounded-s-xl"
            : value == "full"
              ? " last:rounded-s-full"
              : " ";
  }
  if (side == "all") {
    return value == "sm"
      ? " rounded"
      : value == "lg"
        ? " last:rounded-lg"
        : value == "md"
          ? " last:rounded-md"
          : value == "xl"
            ? " last:rounded-xl"
            : value == "full"
              ? " last:rounded-full"
              : " ";
  }
  return " ";
};

export let getShadow = (size?: SHADOW) => {
  if (!size) return " shadow-none";
  return size === "md"
    ? " shadow-md"
    : size === "sm"
      ? " shadow-sm"
      : size === "lg"
        ? " shadow-lg"
        : size === "xl"
          ? " shadow-xl"
          : size === "2xl"
            ? " shadow-2xl"
            : size === "inner"
              ? " shadow-inner"
              : " ";
};
