export interface EditorData {
    [key: string]: any;
}

// Custom types
export type ANIMATE_SPEED = undefined | false | 'slower' | 'slow' | 'normal' | 'fast' | 'faster'
export type ROUNDED = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none' | undefined
export type SHADOW = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none' | undefined
export type PRELOAD = '' | 'off' | 'tap' | 'hover'
export type TABLE_ROW = object | (object | string | string[])[] | undefined
export type BUTTON_SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '0'
export type INPUT_VARIANT = 'filled' | 'bordered' | 'flat'
export type BREADCRUMB_DATA = Array<{text: string, url?: string}>
export type DROPDOWN_ITEM = { active?: boolean, url?: string, text?: string, type?: 'link' | 'divider' | 'header', preload?: PRELOAD }
export type DROPDOWN_ITEM_CONFIG = { activeClass?: string, linkClass?: string, dividerClass?: string, headerClass?: string }
export type NOTIFICATION = 'error' | 'info' | 'success' | 'warning'

export type SITE = {
    siteName: string,
    slogan?: string,
    description: string,
    keywords?: string,
    logoPath?: string,
    imgPath?: string,
    siteSchema?: string,
    businessSchema?: string,
    lang?: string,
    fbAppID?: string,
    pageType?: string,
    twitterCardType?: string,
    twitterID?: string,
    twitterCreatorID?: string,
    video?: string,
    gtmCode?: string
}

export type CORE = {
    isRounded: boolean,
    toggleTheme: boolean | 'system',
    animate: ANIMATE_SPEED,
    reset: boolean,
}

export type INPUT_CONFIG = {
    animate?: ANIMATE_SPEED,
    inputGrow?: boolean,
    labelStyle?: string,
    reset?: boolean,
    rounded?: ROUNDED,
    size?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    variant?: INPUT_VARIANT,
}

export type NOTIFY_CONFIG = {
    removeAfter?: number,
    removeOnClick?: boolean,
    rounded: ROUNDED,
    variant: 'card' | 'flat'
}

export type TABLE_CONFIG = {
    animate: ANIMATE_SPEED,
    border: 'x' | 'y' | 'both' | 'none',
    borderColor: string,
    hover: boolean | string,
    space: 'compact' | 'default' | 'comfortable' | string,
    stripe: boolean | string,
    containerClass: string,
    trClass: string,
}

export type TAB_CONFIG = {
    animate?: ANIMATE_SPEED,
    activeTabClass?: object | string,
    rounded?: ROUNDED,
    shadow?: SHADOW,
    tabClass?: object | string
}