<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED, SHADOW, BUTTON_SIZE } from "$lib/types"
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, roundedClass, shadowClass } from "$lib/functions"
  import { messageTheme } from "$lib/vars"
  import { Svg } from "$lib"
  const CTX: any = getContext( {} )

  interface Props {
    label : string,
    animate : ANIMATE_SPEED,
    ariaLabel : string|undefined,
    externalLinkIcon : boolean,
    href : string|undefined,
    isActive : boolean,
    outline : boolean,
    preload : 'hover' | 'tap' | undefined,
    rounded : ROUNDED,
    shadow : SHADOW,
    size : BUTTON_SIZE,
    square : boolean,
    variant: 'default' | 'light' | 'gradient'
    color: 'brand' | 'error' | 'info' | 'success' | 'warning',
    gradientColors: 'brand' | 'error' | 'info' | 'success' | 'warning',
    type : 'button' | 'submit' | 'reset',
  }

  let {
    label,
    animate = "normal",
    ariaLabel = label,
    externalLinkIcon = true,
    href = undefined,
    isActive = false,
    outline = CTX?.outline ?? false,
    preload = href ? "hover" : undefined,
    rounded = "md",
    shadow = "md",
    size = CTX?.size ?? "md",

    square = false,
    variant = "default",
    color = "brand",
    gradientColors = "brand",
    type = "button",
  } : Props = $props()

  let sizeClasses = {
    default : {
      xs: "btn-xs py-1 px-2 text-xs",
      sm: "btn-sm px-3 py-2 text-sm",
      md: "btn-md px-4 py-2.5 text-base",
      lg: "btn-lg px-6 py-3 text-lg",
      xl: "btn-xl px-8 py-4 text-xl",
      auto: "btn-auto p-0",
    },
    square : {
      xs    : "btn-square-xs flex justify-center items-center p-1 w-6 h-6",
      sm    : "btn-square-sm flex justify-center items-center p-2 w-9 h-9",
      md    : "btn-square-md flex justify-center items-center p-3 w-12 h-12",
      lg    : "btn-square-lg flex justify-center items-center p-3 w-16 h-16",
      xl    : "btn-square-xl flex justify-center items-center p-4 w-24 h-24",
      auto  : "btn-square-auto flex justify-center items-center p-0",
    }
  }

  let defaultOutlineButtonClasses = `btn-outline ${CTX?.group ? (CTX?.stacked ? "border-x border-t last:border-b" : "border-y border-s last:border-e") : "border"}`
  let defaultGradientButtonClasses = `btn-gradient ${CTX?.stacked ? "bg-gradient-to-r hover:bg-gradient-to-tr" : "bg-gradient-to-b hover:bg-gradient-to-br"}`

  let themes = {
    // Active state need to be defined
    default : {
      brand: `${messageTheme["default"]["brand"]} hover:bg-brand-primary-600 focus-visible:ring-brand-primary-500/50`,
      error: `${messageTheme["default"]["error"]} hover:bg-error-500 focus-visible:ring-error-500/50`,
      info: `${messageTheme["default"]["info"]} hover:bg-info-700 dark:hover:bg-info-600 focus-visible:ring-info-500/50`,
      success: `${messageTheme["default"]["success"]} hover:bg-success-700 dark:hover:bg-success-600 focus-visible:ring-success-500/50`,
      warning: `${messageTheme["default"]["warning"]} hover:bg-warning-500 focus-visible:ring-warning-500/50`
    },
    outline: {
      brand : `${defaultOutlineButtonClasses} border-brand-primary-500 text-brand-primary-500 hover:bg-brand-primary-500 hover:text-on-brand-primary-500 focus-visible:ring-brand-primary-500/50`,
      error   : `${defaultOutlineButtonClasses} border-error-500 text-error-500 hover:bg-error-500 hover:text-error-50 focus-visible:ring-error-500/50`,
      info    : `${defaultOutlineButtonClasses} border-info-500 text-info-500 hover:bg-info-500 hover:text-info-50 focus-visible:ring-info-500/50`,
      success : `${defaultOutlineButtonClasses} border-success-500 text-success-500 hover:bg-success-500 hover:text-success-50 focus-visible:ring-success-500/50`,
      warning : `${defaultOutlineButtonClasses} border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-warning-50 focus-visible:ring-warning-500/50`,
    },
    light : {
      brand: "bg-brand-primary-200 text-brand-primary-700 hover:bg-brand-primary-500 hover:text-on-brand-primary-500 focus-visible:ring-brand-primary-500/50",
      error: "bg-error-200 text-error-700 hover:bg-error-500 hover:text-error-800 focus-visible:ring-error-500/50",
      info: "bg-info-200 text-info-700 hover:bg-info-500 hover:text-info-800 focus-visible:ring-info-500/50",
      success: "bg-success-200 text-success-700 hover:bg-success-500 hover:text-success-800 focus-visible:ring-success-500/50",
      warning: "bg-warning-200 text-warning-700 hover:bg-warning-500 hover:text-warning-800 focus-visible:ring-warning-500/50",
    },
    gradient : {
      brand: `${defaultGradientButtonClasses} from-brand-primary-400 via-brand-primary-500 to-brand-primary-600 text-on-brand-primary-500 focus-visible:ring-brand-primary-500/50`,
      error: `${defaultGradientButtonClasses} from-error-400 via-error-500 to-error-600 focus:ring-error-700 dark:focus:ring-error-300 text-error-50 focus-visible:ring-error-500/50`,
      info: `${defaultGradientButtonClasses} from-info-400 via-info-500 to-info-600 focus:ring-info-700 dark:focus:ring-info-300 text-info-50 focus-visible:ring-info-500/50`,
      success: `${defaultGradientButtonClasses} from-success-400 via-success-500 to-success-600 focus:ring-success-700 dark:focus:ring-success-300 text-success-50 focus-visible:ring-success-500/50`,
      warning: `${defaultGradientButtonClasses} from-warning-400 via-warning-500 to-warning-600 focus:ring-warning-700 dark:focus:ring-warning-300 text-warning-50 focus-visible:ring-warning-500/50`,
    },
  }

  let utilityClasses = () => {
    return CTX?.group ? 
      `${roundedClass(rounded, CTX.stacked ? "top" : "start", "first")}${roundedClass(rounded, CTX.stacked ? "bottom" : "end", "last")}`
        : `${roundedClass(rounded)}${shadowClass(shadow)}`
  }

  let getButtonClass = () => {
    let baseClasses = `${(href ? "theui-link inline-block" : "theui-button")} ${sizeClasses[square ? "square" : "default"][size]} ${animationClass(animate)} ${utilityClasses()}`

    if(outline){
      return `${baseClasses} ${themes["outline"][color]}`
    }else{
      if(variant === "light"){
        return `${baseClasses} ${themes["light"][color]}`
      }
      if(variant === "gradient"){
        return `${baseClasses} ${themes["gradient"][gradientColors]}`
      }
      return `${baseClasses} ${themes["default"][color]}`
    }
  }
</script>

<svelte:element this={href ? "a" : "button"} {href} {...$$restProps} data-sveltekit-preload-data={preload}
  class={twMerge(getButtonClass(), $$props.class)} type={href ? undefined : type}
  role={href ? "link" : "button"} aria-disabled={$$restProps?.disabled==true} aria-label={ariaLabel||label||"button"}
  on:click on:keydown on:keyup on:touchstart|passive on:touchend on:touchcancel on:mouseenter on:mouseleave>
  <slot name="beforeLabel"></slot>
  <slot name="label">{@html label}</slot>
  <slot name="afterLabel"></slot>
  {#if externalLinkIcon && $$restProps.target}
    <span class="self-start">
      <Svg size={.6}>
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
      </Svg>
    </span>
  {/if}
</svelte:element>

<style lang="postcss">
  button[disabled]:not(.btn-outline){
    @apply opacity-75 pointer-events-none;
  }
  button[disabled].btn-outline{
    @apply opacity-50 pointer-events-none;
  }
  :global(.theui-btn-group:not(:first-child, :last-child)){
    @apply !rounded-none;
  }
</style>