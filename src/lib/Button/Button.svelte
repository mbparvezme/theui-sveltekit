<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED, SHADOW, BUTTON_SIZE } from "$lib/types"
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { getAnimate, getRounded, getRoundedFirst, getRoundedLast, getShadow } from "$lib/functions"
  import { Svg, BUTTON_GROUP } from "$lib"

  const ctx: any = getContext( BUTTON_GROUP )

  export let label        : string
  export let animate      : ANIMATE_SPEED = "normal"
  export let ariaLabel    : string = label
  export let externalIcon : boolean = true
  export let href         : string|undefined = undefined
  export let isActive     : boolean = false
  export let outline      : boolean = false
  export let preload      : 'hover' | 'tap' | undefined = href ? "hover" : undefined
  export let rounded      : ROUNDED = "md"
  export let shadow       : SHADOW = "md"
  export let size         : BUTTON_SIZE = "md"
  export let type         : 'button' | 'submit' | 'reset' = "button"

  let sizeClasses = new Map<BUTTON_SIZE, string>([
    ["xs",  "btn-xs py-1 px-2 text-xs "],
    ["sm",  "btn-sm px-3 py-2 text-sm "],
    ["md",  "btn-md px-4 py-2.5 text-base "],
    ["lg",  "btn-lg px-6 py-3 text-lg "],
    ["xl",  "btn-xl px-8 py-4 text-xl "],
    ["0",     "btn-0 p-0 "],
  ])

  let btnClass = () => {
    let defaultBtnClass = " bg-brand text-on-brand hover:bg-brand-active " + (ctx?.group ? "border border-black/10 " : "")
    let outlineBtnClass = " btn-outline border-brand text-brand hover:bg-brand-active hover:text-on-brand " + (ctx?.group ? (ctx?.stacked ? "border-x border-t last:border-b" : "border-y border-l last:border-r") : "border")
    let btnActiveClass  = " bg-brand-active text-on-brand "

    let cls = (href ? "theui-link inline-block" : "theui-button") + " focus-visible:ring-brand-200 dark:focus-visible:ring-brand-700 " + sizeClasses.get(size) + getAnimate(animate) + (ctx?.group ? getRoundedFirst(rounded, ctx.stacked ? "top" : "left") + getRoundedLast(rounded, ctx.stacked ? "bottom" : "right") : getRounded(rounded) + getShadow(shadow))

    if(isActive) return cls + btnActiveClass
    if(outline) return cls + outlineBtnClass
    return cls + defaultBtnClass    
  }
</script>

<svelte:element this={href ? "a" : "button"} {href} {...$$restProps} data-sveltekit-preload-data={preload}
  class={twMerge(btnClass(), $$props.class)} type={href ? undefined : type}
  role={href ? "link" : "button"} aria-disabled={$$restProps?.disabled==true} aria-label={ariaLabel||label||"button"}
  on:click on:keydown on:keyup on:touchstart|passive on:touchend on:touchcancel on:mouseenter on:mouseleave>
  <slot name="beforeLabel"></slot>
  <slot name="label">{@html label}</slot>
  <slot name="afterLabel"></slot>
  {#if externalIcon && $$restProps.target}
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