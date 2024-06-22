<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED, SHADOW, BUTTON_SIZE, BUTTON_VARIANT } from "$lib/types";
  import { getContext } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { getAnimate, getRounded, getRoundedFirst, getRoundedLast, getShadow } from "$lib/functions";
  import { BUTTON_GROUP } from "./ButtonGroup.svelte";
  import { Svg } from "$lib";

  const ctx: any = getContext( BUTTON_GROUP );

  // Functional props
  export let label            : string;
  export let href             : string|undefined = undefined;
  export let preload          : 'hover' | 'tap' | false = href ? "hover" : false;
  export let type             : 'button' | 'submit' | 'reset' = "button";

  // Style props
  export let animationSpeed   : ANIMATE_SPEED = "normal";
  export let ariaLabel        : string = "Button";
  export let rounded          : ROUNDED = ctx?.rounded ?? "md";
  export let shadow           : SHADOW = "md";
  export let size             : BUTTON_SIZE = ctx?.size ?? "md";
  export let variant          : BUTTON_VARIANT = ctx?.variant ?? "filled";
  export let theme            : 'error' | 'info' | 'success' | 'warning' | 'none' = "none";

  let sizeClasses = new Map<BUTTON_SIZE, string>([
    ["sm",  "px-3 py-2 text-sm "],
    ["xs",  "py-1 px-2 text-xs "],
    ["md",  "px-4 py-2.5 text-base "],
    ["lg",  "px-6 py-3 text-lg "],
    ["xl",  "px-8 py-4 text-xl "],
    ["0",   "p-0 "],
  ]);

  let themeClasses = new Map<string, string>([
    ["error",  variant == "outline" ? "border border-error-500 text-error-500 hover:bg-error-500 hover:text-error-50 focus:bg-error-600 focus:text-error-50" : "bg-error-500 hover:bg-error-600 focus:bg-error-700 text-error-50"],
    ["success",  variant == "outline" ? "border border-success-500 text-success-500 hover:bg-success-500 hover:text-success-50 focus:bg-success-600 focus:text-success-50" : "bg-success-500 hover:bg-success-600 focus:bg-success-700 text-success-50"],
    ["info",  variant == "outline" ? "border border-info-500 text-info-500 hover:bg-info-500 hover:text-info-50 focus:bg-info-600 focus:text-info-50" : "bg-info-500 hover:bg-info-600 focus:bg-info-700 text-info-50"],
    ["warning",  variant == "outline" ? "border border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-warning-800 focus:bg-warning-600 focus:text-warning-50" : "bg-warning-500 hover:bg-warning-600 focus:bg-warning-700 text-warning-800 focus:text-warning-50"]
  ]);

  let btnDefaultClass   = () => `${(href ? "theui-link inline-block" : "theui-button")} inline-flex items-center gap-2 focus-visible:ring-brand-200 dark:focus-visible:ring-brand-700 ${sizeClasses.get(size)}${getAnimate(animationSpeed)} ${$$props?.disabled ? ((variant == "elevated" || variant == "outline")  ? "opacity-60 cursor-not-allowed" : "opacity-75 cursor-not-allowed") : ""}`;

  let filledBtnClass   = () => `btn-filled ${btnDefaultClass()} ${$$props?.active ? "bg-brand-700" : "bg-brand-500 hover:bg-brand-600"} focus:bg-brand-700 text-on-brand-500 `;

  let elevatedBtnClass  = () => `btn-elevated ${btnDefaultClass()} ${$$props?.active ? "bg-brand-100 dark:bg-brand-900" : ""} hover:bg-brand-50 dark:hover:bg-brand-900 focus:bg-brand-100 dark:focus:bg-brand-800 text-brand-500 font-base ${!ctx?.group ? getShadow(shadow) : ""} `;

  let outlineBtnClass   = (border: string = "") => `btn-outline ${btnDefaultClass()} ${$$props?.active ? "bg-brand-500 text-on-brand-500" : "hover:bg-brand-500 hover:text-on-brand-500 text-brand-500"} focus:bg-brand-500 focus:text-on-brand-500 ${border} border-brand-500 `;

  let textBtnClass      = () => `${btnDefaultClass()} bg-transparent text-default `;
  
  let getButtonClass = () => {
    if(ctx?.group){
      let cls = `${getRoundedFirst(rounded, ctx.stacked ? "top" : "left")} ${getRoundedLast(rounded, ctx.stacked ? "bottom" : "right")}`;
      if(variant == "outline"){
        return `${outlineBtnClass(ctx?.stacked ? "border-x border-t last:border-b" : "border-y border-l last:border-r")} ${cls}`
      }else{
        return `${variant == "elevated" ? elevatedBtnClass() : variant == "text" ? textBtnClass() : filledBtnClass()} ${cls}`;
      }
    }else{
      return `${(theme != "none") ? `${btnDefaultClass()} ${themeClasses.get(theme)}` : (variant == "elevated" ? elevatedBtnClass() : variant == "outline" ? outlineBtnClass("border") : variant == "text" ? textBtnClass() : filledBtnClass())} ${getRounded(rounded)}`;
    }
  }
</script>

<svelte:element this={href ? "a" : "button"} {href} {...$$restProps} data-sveltekit-preload-data={preload}
  class={twMerge(getButtonClass(), $$props?.class)} type={href ? undefined : type}
  role={href ? "link" : "button"} aria-disabled={$$restProps?.disabled} aria-label={ariaLabel}
  on:click on:keydown on:keyup on:touchstart|passive on:touchend on:touchcancel on:mouseenter on:mouseleave>
  <slot name="beforeLabel"></slot>
  <slot>{@html label??""}</slot>
  <slot name="afterLabel"></slot>
  {#if $$restProps?.target && !$$props?.noExternalLinkIcon}
    <span class="self-start">
      <Svg size={.6}>
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
      </Svg>
    </span>
  {/if}
</svelte:element>