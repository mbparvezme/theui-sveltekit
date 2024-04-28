<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { getAnimate, getRounded, getRoundedFirst, getRoundedLast, generateToken } from "$lib/functions"
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { ACCORDION_GROUP } from "$lib"

  const ctx: any = getContext( ACCORDION_GROUP || {} )

  export let title: string|undefined = undefined
  export let content: string|undefined = undefined
  export let ariaLabel: string = (title||"") +" Accordion"
  export let isOpen: boolean = false
  export let id: string = generateToken()

  export let isFlush: boolean = false
  export let animationSpeed : ANIMATE_SPEED = "fast"
  export let containerClass : string  =  ""
  export let containerActiveClass : string = ""
  export let contentClass : string = ""
  export let contentActiveClass : string = ""
  export let rounded : ROUNDED = "md"
  export let size : "compact" | "default" | "large" = ctx?.size || "default"
  export let titleClass : string = ""
  export let titleActiveClass : string = ""

  let isOpened: boolean
  
  let makeAccordionOpen = (accordion: HTMLElement) => {
    isOpened = true
    accordion?.classList.add('open')
    if(animationSpeed) accordion.style.height = (accordion.scrollHeight + 20) + "px"
  }

  let toggle = (id: string) => {
    let currentAccordion = document.getElementById(id)
    if(currentAccordion?.classList.contains('open')){
      isOpened = false
      currentAccordion?.classList.remove('open')
      if(animationSpeed){
        (currentAccordion as HTMLElement).style.height = "0px";
        (currentAccordion as HTMLElement).classList.add("overflow-hidden");
      }
    }else{
      makeAccordionOpen(currentAccordion as HTMLElement)
    }
  }

  if (isOpen){
    makeAccordionOpen(document.getElementById(id) as HTMLElement)
  }

  $: getContainerClasses = () => {
    let cls = "theui-accordion " + (isFlush ? "accordion-flush " : "accordion-default ") + `space-${size}` + (isOpened ? " accordion-active " : " ")
    if(isFlush){
      cls += (isOpened ? "accordion-active " : "") + "border-b "
    }else{
      cls += ctx?.group ? ("border-x border-t last:border-b" + getRoundedFirst(rounded, "top") + getRoundedLast(rounded, "bottom")) : ("border" + getRounded(rounded))
    }
    cls += " border-gray-300 dark:border-gray-700 overflow-hidden "
    return isOpened ? twMerge(cls, containerActiveClass) : twMerge(cls, containerClass)
  }

  $: getTitleClasses = () => {
    let cls = "accordion-title flex items-center w-full "
    if(isFlush){
      cls += isOpened ? "border-b border-brand/50 bg-brand/10 text-brand dark:text-on-brand " : "border-b border-gray-300 dark:border-gray-700 "
    }else{
      cls += isOpened ? "bg-brand text-on-brand " : " "
    }
    return isOpened ? twMerge(cls, titleActiveClass) : twMerge(cls, titleClass)
  }

  $: getContentClasses = () => {
    let cls = "accordion-content " + (!isFlush ? getRounded(rounded, "bottom") : "") + " h-full "
    return isOpened ? twMerge(cls, contentActiveClass) : twMerge(cls, contentClass)
  }
</script>

<div class={getContainerClasses()}>
  <div
    id='{id}Heading'
    class='accordion-title'
    aria-controls={id}
    aria-label={ariaLabel}
    aria-expanded={isOpened}
  >
    <button
      class={getTitleClasses()}
      class:accordion-active={isOpened}
      on:click={()=>toggle(id)}>
      <slot name="title">{@html title || ""}</slot>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-auto" class:transition-transform={animationSpeed} class:transform={!animationSpeed} class:-rotate-180={isOpened} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  <div
    {id}
    class='accordion-body{getAnimate(animationSpeed)}'
    aria-labelledby='{id}Heading'
    aria-hidden={!isOpened}
    class:accordion-close={!isOpened}
  >
    <div class={getContentClasses()}>
      <slot>{@html content || ""}</slot>
    </div>
  </div>
</div>

<style lang='postcss'>
  .theui-accordion.space-compact:not(.accordion-flush) .accordion-title button, .theui-accordion.space-compact .accordion-content{
    @apply p-3;
  }
  .theui-accordion.space-compact.accordion-flush .accordion-title button{
    @apply py-3 px-2;
  }
  .theui-accordion.space-default:not(.accordion-flush) .accordion-title button, .theui-accordion.space-default .accordion-content{
    @apply p-4;
  }
  .theui-accordion.space-default.accordion-flush .accordion-title button{
    @apply py-4 px-3;
  }
  .theui-accordion.space-large:not(.accordion-flush) .accordion-title button, .theui-accordion.space-large .accordion-content{
    @apply p-5;
  }
  .theui-accordion.space-large.accordion-flush .accordion-title button{
    @apply py-5 px-3;
  }
  .theui-accordion.space-default.accordion-flush .accordion-content{
    @apply py-3;
  }
  .theui-accordion.space-default.accordion-flush .accordion-content{
    @apply py-4;
  }
  .theui-accordion.space-large.accordion-flush .accordion-content{
    @apply py-5;
  }
  .accordion-body{
    @apply overflow-hidden;
  }
  .accordion-body.accordion-close {
    @apply h-0;
  }
</style>