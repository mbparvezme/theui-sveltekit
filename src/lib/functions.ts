import type { ANIMATE_SPEED, INPUT_CONFIG, ROUNDED, SHADOW} from "$lib/types"
import { twMerge } from "tailwind-merge"

// Input Functions
export let getInputContainerClass = (config: INPUT_CONFIG, type: string = "input"): string => {
    let size = config.size
    let cls = "tui-form-control " + (config?.reset ? "tui-reset " : ("flex flex-col gap-2 " + (config?.inputGrow ? "flex-grow " : "")))

    if (type == "file") cls += " input-file "
    if (type == "checkbox" || type == "radio") cls += (" input-" + type + " ")

    cls += (size == "sm" ? " input-sm " : size == "md" ? " input-md " : size == "lg" ? " input-lg " : size == "xl" ? " input-xl " : "")
    cls += config.variant + "-input "

    return cls
}

export let getInputBoxClass = (config: INPUT_CONFIG, attr: any, type: string = "input") => {
    let cls = "input-box relative inline-flex overflow-hidden " + ((config?.variant == "flat") ? getRounded("none") : getRounded(config.rounded))
    cls += config.variant == "filled" ? " bg-gray-50 dark:bg-gray-800 border border-gray-50 dark:border-gray-800" :
        config.variant == "bordered" ? " border border-gray-100 dark:border-gray-700 bg-transparent" :
            config.variant == "flat" ? (type!== "file" ? " border-b-2 border-gray-100 dark:border-gray-700 bg-transparent" : "") : ""
    cls += attr?.disabled || attr?.readonly ? " opacity-50" : ""
    return cls
}

export let getFormControlStyle = (config: INPUT_CONFIG, restAttr: any, propsClass: string, type: string = "input", slots: any = null): string => {
    let cls = `tui-control tui-${type} ${getInputSize(config.size, type)} `

    if (type == "input" || type == "select") {
        cls += inputClass(config, restAttr, type, slots)
    } else if (type == "file") {
        cls += fileInputCls(config, restAttr)
    } else if (type == "checkbox" || type == "radio") {
        cls += checkboxRadioClass(config, type, restAttr)
    }

    return twMerge(cls, propsClass)
}

export let getInputSize = (size: "none" | "sm" | "md" | "lg" | "xl" | undefined, type: string = "input"): string => {
    if (type == "file") {
        return size == "sm" ? " input-sm file:px-4 file:py-2 file:text-sm" : size == "md" ? " input-md file:px-6 file:py-3" : size == "lg" ? " input-lg file:px-6 file:py-4 file:text-xl" : size == "xl" ? " input-xl file:px-8 file:py-5 file:text-2xl" : ""
    }
    if (type == "checkbox" || type == "radio") {
        return type + (size == "sm" ? "-sm h-3 w-3" : size == "md" ? "-md h-4 w-4" : size == "lg" ? "-md h-6 w-6" : size == "xl" ? "-md h-8 w-8" : "")
    }
    return size == "sm" ? " input-sm p-2 text-sm" : size == "md" ? " p-3" : size == "lg" ? " p-4 text-xl" : size == "xl" ? " p-5 text-2xl" : ""
}

export let inputClass = (config: INPUT_CONFIG, attr: any, type: "input" | "select" = "input", slots: any): string => {
    if (config?.reset) return ""
    let cls = "text-default border-transparent " + (type == "input" ? "bg-transparent" : "bg-secondary")
    cls += getAnimate(config?.animate) + " focus:ring-brand focus:border-brand w-full "

    if (attr?.disabled) {
        cls += " disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none"
    }
    if (attr?.readonly) {
        cls += " read-only:bg-gray-100 dark:read-only:bg-gray-800 read-only:pointer-events-none read-only:opacity-50"
    }

    if (!slots?.left && !slots?.right && config.variant != "flat") {
        cls += getRounded(config.rounded)
    }

    return cls
}

export let fileInputCls = (config: INPUT_CONFIG, attr: any): string => {
    if (config?.reset) return ""

    let cls = config.variant == "filled" ? "bg-gray-50 dark:bg-gray-800 text-default border border-gray-50 dark:border-gray-800 focus:border-brand" :
        config.variant == "bordered" ? "border border-gray-100 dark:border-gray-700 text-default focus:border-brand bg-transparent focus:ring-brand" :
            config.variant == "flat" ? "border-0 text-default" : ""
    cls += getAnimate(config?.animate) + " focus:ring-brand focus:border-brand focus:outline-brand text-gray-500/70 " + getRoundedFileBtn(config?.rounded)

    if (attr?.disabled) cls += " disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none"
    if (attr?.readonly) cls += " read-only:pointer-events-none read-only:opacity-50"

    return cls + " file:mr-4 file:bg-brand/5 file:text-brand file:cursor-pointer cursor-pointer file:border-0"
}

export let checkboxRadioClass = (config: INPUT_CONFIG, type: "checkbox" | "radio" = "checkbox", attr: any): string => {
    let cls = type + getRounded(type == "radio" ? "full" : config?.rounded) + " bg-gray-50 dark:bg-gray-800 border border-gray-400 dark:border-transparent text-brand focus-within:ring-brand dark:checked:bg-brand !ring-offset-primary peer"
    return cls
}

export let getCheckboxRadioStateClass = (attr: any): string => {
    if (attr?.disabled) return " cursor-not-allowed opacity-50 select-none"
    if (attr?.readonly) return " pointer-events-none opacity-50"
    return ""
}


// Generale Functions
export let getKey = (obj: Record<string, any>, key: string): any => obj[key] || "_NULL_";

export let getRandomNum = (min: number = 10, max: number = 99): number => Math.floor(Math.random() * (max - min + 1)) + min

export let generateToken = (prefix: string = "_id"): string => {
    let n = Date.now()
    return prefix + (++n).toString(36) + getRandomNum()
}

// ===================================
// Tailwind CSS class getter
// ===================================
export let getAnimate = (animate: ANIMATE_SPEED, type: string = ""): string => {
    if (type == "file") {
        return (" ") + (
            !animate ? "file:tui-no-animate" : "file:tui-animate file:transition-all file:ease-in-out " +
                (animate == "faster" ? "file:duration-100" : animate == "fast" ? "file:duration-150" :
                    animate == "slow" ? "file:duration-500" : animate == "slower" ? "file:duration-700" : "file:duration-300")
        )
    }

    let duration = (" tui-animate ease-in-out ") + (animate == "faster" ? "duration-100" : animate == "fast" ? "duration-150" :
        animate == "slow" ? "duration-500" : animate == "slower" ? "duration-700" : "duration-300")

    if (type == "color") return !animate ? " tui-no-animate" : (duration + " transition-colors")
    if (type == "opacity") return !animate ? " tui-no-animate" : (duration + " transition-opacity")
    if (type == "shadow") return !animate ? " tui-no-animate" : (duration + " transition-shadow")
    if (type == "transform") return !animate ? " tui-no-animate" : (duration + " transition-transform")

    return !animate ? " tui-no-animate" : (duration + " transition-all")
}

export let getRounded = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
    if (!value) return " rounded-none"
    if (side == "top") {
        return value == "sm" ? " rounded-t" : value == "lg" ? " rounded-t-lg" : (value == "md") ? " rounded-t-md" :
            value == "xl" ? " rounded-t-xl" : value == "full" ? " rounded-t-full" : " "
    }
    if (side == "right") {
        return value == "sm" ? " rounded-r" : value == "lg" ? " rounded-r-lg" : (value == "md") ? " rounded-r-md" :
            value == "xl" ? " rounded-r-xl" : value == "full" ? " rounded-r-full" : " "
    }
    if (side == "bottom") {
        return value == "sm" ? " rounded-b" : value == "lg" ? " rounded-b-lg" : (value == "md") ? " rounded-b-md" :
            value == "xl" ? " rounded-b-xl" : value == "full" ? " rounded-b-full" : " "
    }
    if (side == "left") {
        return value == "sm" ? " rounded-l" : value == "lg" ? " rounded-l-lg" : (value == "md") ? " rounded-l-md" :
            value == "xl" ? " rounded-l-xl" : value == "full" ? " rounded-l-full" : " "
    }
    if (side == "all") {
        return value == "sm" ? " rounded" : value == "lg" ? " rounded-lg" : (value == "md") ? " rounded-md" :
            value == "xl" ? " rounded-xl" : value == "full" ? " rounded-full" : " "
    }
    return " "
}

export let getRoundedFileBtn = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
    if (!value) return " !file:rounded-none"
    if (side == "top") {
        return value == "sm" ? " file:rounded-t" : value == "lg" ? " file:rounded-t-lg" : (value == "md") ? " file:rounded-t-md" :
            value == "xl" ? " file:rounded-t-xl" : value == "full" ? " file:rounded-t-full" : " "
    }
    if (side == "right") {
        return value == "sm" ? " file:rounded-r" : value == "lg" ? " file:rounded-r-lg" : (value == "md") ? " file:rounded-r-md" :
            value == "xl" ? " file:rounded-r-xl" : value == "full" ? " file:rounded-r-full" : " "
    }
    if (side == "bottom") {
        return value == "sm" ? " file:rounded-b" : value == "lg" ? " file:rounded-b-lg" : (value == "md") ? " file:rounded-b-md" :
            value == "xl" ? " file:rounded-b-xl" : value == "full" ? " file:rounded-b-full" : " "
    }
    if (side == "left") {
        return value == "sm" ? " file:rounded-l" : value == "lg" ? " file:rounded-l-lg" : (value == "md") ? " file:rounded-l-md" :
            value == "xl" ? " file:rounded-l-xl" : value == "full" ? " file:rounded-l-full" : " "
    }
    if (side == "all") {
        return value == "sm" ? " file:rounded" : value == "lg" ? " file:rounded-lg" : (value == "md") ? " file:rounded-md" :
            value == "xl" ? " file:rounded-xl" : value == "full" ? " file:rounded-full" : " "
    }
    return " "
}

export let getRoundedFirst = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
    if (!value) return " !first:rounded-none"
    if (side == "top") {
        return value == "sm" ? " first:rounded-t" : value == "lg" ? " first:rounded-t-lg" : (value == "md") ? " first:rounded-t-md" :
            value == "xl" ? " first:rounded-t-xl" : value == "full" ? " first:rounded-t-full" : " "
    }
    if (side == "right") {
        return value == "sm" ? " first:rounded-r" : value == "lg" ? " first:rounded-r-lg" : (value == "md") ? " first:rounded-r-md" :
            value == "xl" ? " first:rounded-r-xl" : value == "full" ? " first:rounded-r-full" : " "
    }
    if (side == "bottom") {
        return value == "sm" ? " first:rounded-b" : value == "lg" ? " first:rounded-b-lg" : (value == "md") ? " first:rounded-b-md" :
            value == "xl" ? " first:rounded-b-xl" : value == "full" ? " first:rounded-b-full" : " "
    }
    if (side == "left") {
        return value == "sm" ? " first:rounded-l" : value == "lg" ? " first:rounded-l-lg" : (value == "md") ? " first:rounded-l-md" :
            value == "xl" ? " first:rounded-l-xl" : value == "full" ? " first:rounded-l-full" : " "
    }
    if (side == "all") {
        return value == "sm" ? " rounded" : value == "lg" ? " first:rounded-lg" : (value == "md") ? " first:rounded-md" :
            value == "xl" ? " first:rounded-xl" : value == "full" ? " first:rounded-full" : " "
    }
    return " "
}

export let getRoundedLast = (value: ROUNDED, side: "top" | "right" | "bottom" | "left" | "all" = "all"): string => {
    if (!value) return " !last:rounded-none"
    if (side == "top") {
        return value == "sm" ? " last:rounded-t" : value == "lg" ? " last:rounded-t-lg" : (value == "md") ? " last:rounded-t-md" :
            value == "xl" ? " last:rounded-t-xl" : value == "full" ? " last:rounded-t-full" : " "
    }
    if (side == "right") {
        return value == "sm" ? " last:rounded-r" : value == "lg" ? " last:rounded-r-lg" : (value == "md") ? " last:rounded-r-md" :
            value == "xl" ? " last:rounded-r-xl" : value == "full" ? " last:rounded-r-full" : " "
    }
    if (side == "bottom") {
        return value == "sm" ? " last:rounded-b" : value == "lg" ? " last:rounded-b-lg" : (value == "md") ? " last:rounded-b-md" :
            value == "xl" ? " last:rounded-b-xl" : value == "full" ? " last:rounded-b-full" : " "
    }
    if (side == "left") {
        return value == "sm" ? " last:rounded-l" : value == "lg" ? " last:rounded-l-lg" : (value == "md") ? " last:rounded-l-md" :
            value == "xl" ? " last:rounded-l-xl" : value == "full" ? " last:rounded-l-full" : " "
    }
    if (side == "all") {
        return value == "sm" ? " rounded" : value == "lg" ? " last:rounded-lg" : (value == "md") ? " last:rounded-md" :
            value == "xl" ? " last:rounded-xl" : value == "full" ? " last:rounded-full" : " "
    }
    return " "
}

export let getShadow = (size?: SHADOW) => {
    if (!size) return " shadow-none"
    return (size === "md") ? " shadow-md" : (size === "sm") ? " shadow-sm" :
        (size === "lg") ? " shadow-lg" : (size === "xl") ? " shadow-xl" :
            (size === "2xl") ? " shadow-2xl" : (size === "inner") ? " shadow-inner" : " "
}