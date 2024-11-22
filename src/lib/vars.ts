import type {
  ROUNDED,
  SHADOW,
  ANIMATE_SPEED,
  ROUNDED_SIDES,
  ROUNDED_ITEM_TYPES,
  INPUT_SIZE
} from "$lib/types"

export type ANIMATION_PROPERTY_TYPE = 'color' | 'opacity' | 'shadow' | 'transform' | 'all' | 'fileButton'
export type INPUT_CATEGORY = 'input' | 'file' | 'checkbox' | 'radio' | 'select'
export type NOTIFICATION_VARIANT = "card" | "cardLight" | "borderTop" | "borderBottom" | "borderStart"
export type NOTIFICATION_POSITION = "top-end" | "top-center" | "top-start" | "bottom-end" | "bottom-center" | "bottom-start"

type RoundClassesType = {
  [type in ROUNDED_ITEM_TYPES] : {
    [side in ROUNDED_SIDES]: {
      [size in Exclude<ROUNDED, "none" | undefined>]: string;
    };
  }
};

export let roundClasses: RoundClassesType = {
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

export let animationSpeed: { [speed in Exclude<ANIMATE_SPEED, "none">]: string } = {
  slower: " duration-700",
  slow: " duration-500",
  normal: " duration-300",
  fast: " duration-150",
  faster: " duration-100",
};

export let animationType: any = {
  color: " transition-colors",
  opacity: " transition-opacity",
  shadow: " transition-shadow",
  transform: " transition-transform",
  all: " transition-all",
};

export let fileButtonAnimation: { [speed in Exclude<ANIMATE_SPEED, "none">]: string } = {
  slower: " file:duration-700 transition-all",
  slow: " file:duration-500 transition-all",
  normal: " file:duration-300 transition-all",
  fast: " file:duration-150 transition-all",
  faster: " file:duration-100 transition-all",
};

export let shadowClasses: {[size in Exclude<SHADOW, "none">]: string} = {
  xs: " shadow-sm",
  sm: " shadow",
  md: " shadow-md",
  lg: " shadow-lg",
  xl: " shadow-xl",
  "2xl": " shadow-2xl",
  inner: " shadow-inner"
};

export let inputTypeClass: { [type in INPUT_CATEGORY] : string} = {
  input: "theui-input",
  file: "theui-file-input",
  checkbox: "theui-checkbox",
  radio: "theui-radio-button",
  select: "theui-select"
};

export let inputSizeClass: { [size in INPUT_SIZE]: string } = {
  sm: "theui-input-sm",
  md: "theui-input-md",
  lg: "theui-input-lg",
  xl: "theui-input-xl"
};

export let labelSizeClass: { [size in INPUT_SIZE]: string } = {
  sm: "px-2",
  md: "px-3",
  lg: "px-4",
  xl: "px-5"
};

export let defaultInputSizeClasses: { [type in 'flat' | 'nonFlat']: { [size in INPUT_SIZE]: string } } = {
  flat: {
    sm: "px-0 py-2 text-sm",
    md: "px-0 py-3",
    lg: "px-0 py-4 text-xl",
    xl: "px-0 py-5 text-2xl",
  },
  nonFlat: {
    sm: "p-2 text-sm",
    md: "p-3",
    lg: "p-4 text-xl",
    xl: "p-5 text-2xl",
  }
};

export let fileInputSizeClasses: { [size in INPUT_SIZE]: string } = {
  sm: "file:px-4 file:py-2 file:text-sm",
  md: "file:px-6 file:py-3",
  lg: "file:px-6 file:py-4 file:text-xl",
  xl: "file:px-8 file:py-5 file:text-2xl",
};

export let groupInputSizeClasses: { [size in INPUT_SIZE]: string } = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

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