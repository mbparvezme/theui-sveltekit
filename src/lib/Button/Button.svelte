<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED, SHADOW, BUTTON_SIZE } from "$lib/types";
  import { getContext } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { getAnimate, getRounded, getRoundedFirst, getRoundedLast, getShadow } from "$lib/functions";
  import { BUTTON_GROUP } from "./ButtonGroup.svelte";
  import { Svg } from "$lib";

  const ctx: any = getContext( BUTTON_GROUP );

  // Functional props
  export let label            : string;
  export let href             : string|undefined = undefined;
  export let preload          : 'hover' | 'tap' | undefined = href ? "hover" : undefined;
  export let type             : 'button' | 'submit' | 'reset' = "button";

  // Style props
  export let animationSpeed   : ANIMATE_SPEED = "normal";
  export let ariaLabel        : string = "Button";
  export let rounded          : ROUNDED = ctx?.rounded ?? "md";
  export let shadow           : SHADOW = "md";
  export let size             : BUTTON_SIZE = ctx?.size ?? "md";
  export let style            : 'elevated' | 'outline' | 'text' | 'default' = ctx?.style ?? "default";
  export let variant          : 'error' | 'info' | 'success' | 'warning' | 'none' = "none";

  let sizeClasses = new Map<BUTTON_SIZE, string>([
    ["sm",  "px-3 py-2 text-sm "],
    ["xs",  "py-1 px-2 text-xs "],
    ["md",  "px-4 py-2.5 text-base "],
    ["lg",  "px-6 py-3 text-lg "],
    ["xl",  "px-8 py-4 text-xl "],
    ["0",   "p-0 "],
  ]);

  let themeClasses = new Map<string, string>([
    ["error",  style == "outline" ? "border border-error text-error hover:bg-error hover:text-red-50" : "bg-error text-red-50"],
    ["success",  style == "outline" ? "border border-success text-success hover:bg-success hover:text-red-50" : "bg-success text-green-50"],
    ["info",  style == "outline" ? "border border-info text-info hover:bg-info hover:text-indigo-50" : "bg-info text-indigo-50"],
    ["warning",  style == "outline" ? "border border-warning text-warning hover:bg-warning hover:text-yellow-800" : "bg-warning text-yellow-800"]
  ]);

  let btnDefaultClass   = () => `${(href ? "theui-link inline-block" : "theui-button")} inline-flex items-center gap-2 focus-visible:ring-brand-200 dark:focus-visible:ring-brand-700 ${sizeClasses.get(size)}${getAnimate(animationSpeed)}`;
  let defaultBtnClass   = () => `${btnDefaultClass()} ${$$props?.active ? "bg-brand-active" : "bg-brand hover:bg-brand-active"} focus:bg-brand-active text-on-brand `;
  let elevatedBtnClass  = () => `${btnDefaultClass()} ${$$props?.active ? "bg-brand/40" : "bg-brand/20 hover:bg-brand/40"} focus:bg-brand/40 text-brand font-base ${!ctx?.group ? getShadow(shadow) : ""} `;
  let outlineBtnClass   = (border: string = "") => `${btnDefaultClass()} ${$$props?.active ? "bg-brand text-on-brand" : "hover:bg-brand hover:text-on-brand text-brand"} focus:bg-brand focus:text-on-brand ${border} border-brand `;
  let textBtnClass      = () => `${btnDefaultClass()} bg-transparent text-default `;
  
  let getButtonClass = () => {
    if(ctx?.group){
      let cls = `${getRoundedFirst(rounded, ctx.stacked ? "top" : "left")} ${getRoundedLast(rounded, ctx.stacked ? "bottom" : "right")}`;
      if(style == "outline"){
        return `${outlineBtnClass(ctx?.stacked ? "border-x border-t last:border-b" : "border-y border-l last:border-r")} ${cls}`
      }else{
        return `${style == "elevated" ? elevatedBtnClass() : style == "text" ? textBtnClass() : defaultBtnClass()} ${cls}`;
      }
    }else{
      return `${(variant != "none") ? `${btnDefaultClass()} ${themeClasses.get(variant)}` : (style == "elevated" ? elevatedBtnClass() : style == "outline" ? outlineBtnClass("border") : style == "text" ? textBtnClass() : defaultBtnClass())} ${getRounded(rounded)}`;
    }
  }
</script>

<svelte:element this={href ? "a" : "button"} {href} {...$$restProps} data-sveltekit-preload-data={preload}
  class={twMerge(getButtonClass(), $$props?.class)} type={href ? undefined : type}
  role={href ? "link" : "button"} aria-disabled={$$restProps?.disabled==true} aria-label={ariaLabel}
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