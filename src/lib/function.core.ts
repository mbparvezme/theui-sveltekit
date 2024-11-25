export type ANIMATION_PROPERTY_TYPE = 'color' | 'opacity' | 'shadow' | 'transform' | 'all' | 'fileButton'
export type NOTIFICATION_POSITION = "top-end" | "top-center" | "top-start" | "bottom-end" | "bottom-center" | "bottom-start"

type RoundClassesType = {
  [type in ROUNDED_ITEM_TYPES]: {
    [side in ROUNDED_SIDES]: {
      [size in Exclude<ROUNDED, "none" | undefined>]: string;
    }
  }
}

import type {ANIMATE_SPEED, ROUNDED, SHADOW, ROUNDED_SIDES, ROUNDED_ITEM_TYPES, NOTIFY_CONFIG, NOTIFICATION_TYPE} from "$lib/types"
import { twMerge } from "tailwind-merge"

let roundClasses: RoundClassesType = {
  default: {
    all: {
      sm: " rounded",
      md: " rounded-md",
      lg: " rounded-lg",
      xl: " rounded-xl",
      full: " rounded-full",
    },
    top: {
      sm: " rounded-t",
      md: " rounded-t-md",
      lg: " rounded-t-lg",
      xl: " rounded-t-xl",
      full: " rounded-t-full",
    },
    end: {
      sm: " rounded-e",
      md: " rounded-e-md",
      lg: " rounded-e-lg",
      xl: " rounded-e-xl",
      full: " rounded-e-full",
    },
    bottom: {
      sm: " rounded-b",
      md: " rounded-b-md",
      lg: " rounded-b-lg",
      xl: " rounded-b-xl",
      full: " rounded-b-full",
    },
    start: {
      sm: " rounded-s",
      md: " rounded-s-md",
      lg: " rounded-s-lg",
      xl: " rounded-s-xl",
      full: " rounded-s-full",
    },
    topStart: {
      sm: " rounded-ss",
      md: " rounded-ss-md",
      lg: " rounded-ss-lg",
      xl: " rounded-ss-xl",
      full: " rounded-ss-full",
    },
    topEnd: {
      sm: " rounded-se",
      md: " rounded-se-md",
      lg: " rounded-se-lg",
      xl: " rounded-se-xl",
      full: " rounded-se-full",
    },
    bottomStart: {
      sm: " rounded-es",
      md: " rounded-es-md",
      lg: " rounded-es-lg",
      xl: " rounded-es-xl",
      full: " rounded-es-full",
    },
    bottomEnd: {
      sm: " rounded-ee",
      md: " rounded-ee-md",
      lg: " rounded-ee-lg",
      xl: " rounded-ee-xl",
      full: " rounded-ee-full",
    },
  },
  fileButton: {
    all: {
      sm: " file:rounded",
      md: " file:rounded-md",
      lg: " file:rounded-lg",
      xl: " file:rounded-xl",
      full: " file:rounded-full",
    },
    top: {
      sm: " file:rounded-t",
      md: " file:rounded-t-md",
      lg: " file:rounded-t-lg",
      xl: " file:rounded-t-xl",
      full: " file:rounded-t-full",
    },
    end: {
      sm: " file:rounded-e",
      md: " file:rounded-e-md",
      lg: " file:rounded-e-lg",
      xl: " file:rounded-e-xl",
      full: " file:rounded-e-full",
    },
    bottom: {
      sm: " file:rounded-b",
      md: " file:rounded-b-md",
      lg: " file:rounded-b-lg",
      xl: " file:rounded-b-xl",
      full: " file:rounded-b-full",
    },
    start: {
      sm: " file:rounded-s",
      md: " file:rounded-s-md",
      lg: " file:rounded-s-lg",
      xl: " file:rounded-s-xl",
      full: " file:rounded-s-full",
    },
    topStart: {
      sm: " file:rounded-ss",
      md: " file:rounded-ss-md",
      lg: " file:rounded-ss-lg",
      xl: " file:rounded-ss-xl",
      full: " file:rounded-ss-full",
    },
    topEnd: {
      sm: " file:rounded-se",
      md: " file:rounded-se-md",
      lg: " file:rounded-se-lg",
      xl: " file:rounded-se-xl",
      full: " file:rounded-se-full",
    },
    bottomStart: {
      sm: " file:rounded-es",
      md: " file:rounded-es-md",
      lg: " file:rounded-es-lg",
      xl: " file:rounded-es-xl",
      full: " file:rounded-es-full",
    },
    bottomEnd: {
      sm: " file:rounded-ee",
      md: " file:rounded-ee-md",
      lg: " file:rounded-ee-lg",
      xl: " file:rounded-ee-xl",
      full: " file:rounded-ee-full",
    },
  },
  first: {
    all: {
      sm: " first:rounded",
      md: " first:rounded-md",
      lg: " first:rounded-lg",
      xl: " first:rounded-xl",
      full: " first:rounded-full",
    },
    top: {
      sm: " first:rounded-t",
      md: " first:rounded-t-md",
      lg: " first:rounded-t-lg",
      xl: " first:rounded-t-xl",
      full: " first:rounded-t-full",
    },
    end: {
      sm: " first:rounded-e",
      md: " first:rounded-e-md",
      lg: " first:rounded-e-lg",
      xl: " first:rounded-e-xl",
      full: " first:rounded-e-full",
    },
    bottom: {
      sm: " first:rounded-b",
      md: " first:rounded-b-md",
      lg: " first:rounded-b-lg",
      xl: " first:rounded-b-xl",
      full: " first:rounded-b-full",
    },
    start: {
      sm: " first:rounded-s",
      md: " first:rounded-s-md",
      lg: " first:rounded-s-lg",
      xl: " first:rounded-s-xl",
      full: " first:rounded-s-full",
    },
    topStart: {
      sm: " first:rounded-ss",
      md: " first:rounded-ss-md",
      lg: " first:rounded-ss-lg",
      xl: " first:rounded-ss-xl",
      full: " first:rounded-ss-full",
    },
    topEnd: {
      sm: " first:rounded-se",
      md: " first:rounded-se-md",
      lg: " first:rounded-se-lg",
      xl: " first:rounded-se-xl",
      full: " first:rounded-se-full",
    },
    bottomStart: {
      sm: " first:rounded-es",
      md: " first:rounded-es-md",
      lg: " first:rounded-es-lg",
      xl: " first:rounded-es-xl",
      full: " first:rounded-es-full",
    },
    bottomEnd: {
      sm: " first:rounded-ee",
      md: " first:rounded-ee-md",
      lg: " first:rounded-ee-lg",
      xl: " first:rounded-ee-xl",
      full: " first:rounded-ee-full",
    }
  },
  last: {
    all: {
      sm: " last:rounded",
      md: " last:rounded-md",
      lg: " last:rounded-lg",
      xl: " last:rounded-xl",
      full: " last:rounded-full",
    },
    top: {
      sm: " last:rounded-t",
      md: " last:rounded-t-md",
      lg: " last:rounded-t-lg",
      xl: " last:rounded-t-xl",
      full: " last:rounded-t-full",
    },
    end: {
      sm: " last:rounded-e",
      md: " last:rounded-e-md",
      lg: " last:rounded-e-lg",
      xl: " last:rounded-e-xl",
      full: " last:rounded-e-full",
    },
    bottom: {
      sm: " last:rounded-b",
      md: " last:rounded-b-md",
      lg: " last:rounded-b-lg",
      xl: " last:rounded-b-xl",
      full: " last:rounded-b-full",
    },
    start: {
      sm: " last:rounded-s",
      md: " last:rounded-s-md",
      lg: " last:rounded-s-lg",
      xl: " last:rounded-s-xl",
      full: " last:rounded-s-full",
    },
    topStart: {
      sm: " last:rounded-ss",
      md: " last:rounded-ss-md",
      lg: " last:rounded-ss-lg",
      xl: " last:rounded-ss-xl",
      full: " last:rounded-ss-full",
    },
    topEnd: {
      sm: " last:rounded-se",
      md: " last:rounded-se-md",
      lg: " last:rounded-se-lg",
      xl: " last:rounded-se-xl",
      full: " last:rounded-se-full",
    },
    bottomStart: {
      sm: " last:rounded-es",
      md: " last:rounded-es-md",
      lg: " last:rounded-es-lg",
      xl: " last:rounded-es-xl",
      full: " last:rounded-es-full",
    },
    bottomEnd: {
      sm: " last:rounded-ee",
      md: " last:rounded-ee-md",
      lg: " last:rounded-ee-lg",
      xl: " last:rounded-ee-xl",
      full: " last:rounded-ee-full",
    },
  }
}

let animationSpeed: { [speed in Exclude<ANIMATE_SPEED, "none">]: string } = {
  slower: "duration-700",
  slow: "duration-500",
  normal: "duration-300",
  fast: "duration-150",
  faster: "duration-100",
}

let animationType: any = {
  color: "transition-colors",
  opacity: "transition-opacity",
  shadow: "transition-shadow",
  transform: "transition-transform",
  all: "transition-all",
}

let fileButtonAnimation: { [speed in Exclude<ANIMATE_SPEED, "none">]: string } = {
  slower: "file:duration-700 transition-all",
  slow: "file:duration-500 transition-all",
  normal: "file:duration-300 transition-all",
  fast: "file:duration-150 transition-all",
  faster: "file:duration-100 transition-all",
}

let shadowClasses: { [size in Exclude<SHADOW, "none">]: string } = {
  xs: " shadow-sm",
  sm: " shadow",
  md: " shadow-md",
  lg: " shadow-lg",
  xl: " shadow-xl",
  "2xl": " shadow-2xl",
  inner: " shadow-inner"
}

export let messageTheme = {
  default: {
    brand: "bg-brand-primary-500 text-on-brand-primary-500",
    error: "bg-error-400 text-error-50 dark:bg-error-600",
    info: "bg-info-600 text-info-50 dark:bg-info-700",
    success: "bg-success-600 text-success-50 dark:bg-success-700",
    warning: "bg-warning-300 dark:bg-warning-600 text-warning-900 dark:text-warning-50",
  },
  light: {
    brand: "bg-brand-primary-100 text-brand-primary-800",
    error: "bg-error-100 text-error-900 dark:bg-error-800 dark:text-error-200",
    info: "bg-info-100 text-info-900 dark:bg-info-900 dark:text-info-200",
    success: "bg-success-100 text-success-900 dark:bg-success-900 dark:text-success-200",
    warning: "bg-warning-100 text-warning-900 dark:bg-warning-900 dark:text-warning-200",
  }
}

export let messageBorderTheme = {
  default: {
    brand: "border-brand-primary-200 dark:border-brand-primary-800",
    error: "border-error-200 dark:border-error-800",
    info: "border-info-200 dark:border-info-800",
    success: "border-success-200 dark:border-success-800",
    warning: "border-warning-500 dark:border-warning-700",
  },
  light: {
    brand: "border-brand-primary-300 dark:border-brand-primary-700",
    error: "border-error-300 dark:border-error-700",
    info: "border-info-300 dark:border-info-800",
    success: "border-success-300 dark:border-success-800",
    warning: "border-warning-500 dark:border-warning-800",
  },
}

/**
 * Checks if a key exists in an object and returns a boolean indicating its presence.
 * 
 * @param obj - The object to check.
 * @param key - The key to verify.
 * @returns `true` if the key exists in the object, otherwise `false`.
 * 
 * @example
 * const data = { name: "Alice", age: 30 };
 * isKeyExist(data, "name"); // Returns true
 * isKeyExist(data, "height"); // Returns false
 */
export const isKeyExist = (obj: Record<string, any>, key: string): boolean => key in obj


/**
 * Generates a random integer within a given range.
 * 
 * @param min - The minimum value (inclusive). Defaults to 10.
 * @param max - The maximum value (inclusive). Defaults to 99.
 * @returns A random integer between `min` and `max`, inclusive.
 * 
 * @example
 * generateRandomNum(1, 100); // Random number between 1 and 100
 * generateRandomNum(); // Random number between 10 and 99
 */
export const generateRandomNum = (min = 10, max = 99): number => Math.floor(Math.random() * (max - min + 1)) + min


/**
 * Generates a unique alphanumeric token with a prefix, timestamp, and random number.
 * 
 * @param prefix - Optional string prefix for the token, defaults to "_id".
 * @returns A unique token string combining the prefix, current timestamp, and randomness.
 * 
 * @example
 * generateToken("user_"); // Example output: "user_lk9vby43j24"
 * generateToken();        // Example output: "_id_k9vmzct08f"
 */
export const generateToken = (prefix: string = "_id"): string => `${prefix}${(Date.now() + 1).toString(36)}${generateRandomNum()}`


/**
 * Generates CSS classes for animations based on the speed and property type.
 *
 * @param animate - Animation speed (e.g., "slow", "fast"), or undefined to disable animation.
 * @param type - Animation property type (e.g., "all", "color"), defaults to "all".
 * @returns A string with the computed CSS animation classes.
 */
export const animationClass = (animate: ANIMATE_SPEED | undefined, type: ANIMATION_PROPERTY_TYPE = "all"): string => {
  if (!animate || animate === "none") return " "
  return  ` theui-animate ease-in-out ${type === "fileButton" ?
            (fileButtonAnimation?.[animate] || "") : `${animationSpeed?.[animate] || ""} ${animationType?.[type] || ""}`}`
}


/**
 * Generates CSS classes for rounded corners based on size, side, and item type.
 *
 * @param value - Rounded size (e.g., "sm", "lg"), defaults to "md". Use "none" to disable rounding.
 * @param side - Sides to apply the rounding (e.g., "all", "top"), defaults to "all".
 * @param type - Item type (e.g., "default", "fileButton"), defaults to "default".
 * @returns A string with the computed Tailwind CSS rounded classes.
 */
export const roundedClass = (value: ROUNDED = "md", side: ROUNDED_SIDES = "all", type: ROUNDED_ITEM_TYPES = "default"): string =>
  value && value !== "none" ? roundClasses[type]?.[side]?.[value] || " " : " "


/**
 * Generates CSS classes for shadow effects based on the shadow size.
 *
 * @param size - Shadow intensity (e.g., "sm", "lg"), optional. Use "none" or leave undefined to disable shadow.
 * @returns A string with the computed Tailwind CSS shadow classes.
 */
export const shadowClass = (size?: SHADOW): string => size && size !== "none" ? shadowClasses[size] || "" : ""


/**
 * Checks if a given URL belongs to the same origin as the current window location.
 *
 * @param url - The URL to check.
 * @returns `true` if the URL is local, otherwise `false`.
 */
export const isLocalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url, window.location.origin)
    return parsedUrl.origin === window.location.origin
  } catch {
    return false
  }
}


/**
 * Generates CSS classes for notifications based on configuration, type, and additional properties.
 *
 * @param config - Notification configuration, including theme, rounded corners, and variant.
 * @param type - Notification type (e.g., `error`, `success`). Defaults to `error`.
 * @param props - Additional properties, such as a custom class.
 * @returns A string of merged classes for the notification.
 */
export const notificationClasses = (config: NOTIFY_CONFIG, type: NOTIFICATION_TYPE = "error", props: Record<string, any> = {}): string => {
  const theme = config?.theme || "default"
  const baseClass = `theui-notification px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer ${messageTheme[theme][type]}`

  const variantClasses: Record<string, string> = {
    card: roundedClass(config?.rounded || "md"),
    borderTop: `${roundedClass(config?.rounded || "md", "bottom")} ${messageBorderTheme[theme][type]} border-t-4`,
    borderBottom: `${roundedClass(config?.rounded || "md", "top")} ${messageBorderTheme[theme][type]} border-b-4`,
    borderStart: `${roundedClass(config?.rounded || "md")} ${messageBorderTheme[theme][type]} border-s-4`,
  }

  return twMerge(baseClass, variantClasses[config?.variant || "card"], props.class || "")
}


/**
 * Generates CSS classes for a backdrop element.
 *
 * @param backdrop - A string for custom classes or a boolean for default styling.
 * @returns A string of merged classes for the backdrop.
 */
export const backdropClasses = (backdrop: string | boolean): string => {
  const defaultClasses = "backdrop fixed inset-0 bg-black/50 z-[-1]"
  const customClasses = typeof backdrop === "string" ? backdrop : ""
  return twMerge(defaultClasses, customClasses)
}