<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { getAnimate, getRounded, getRoundedFirst, getRoundedLast, generateToken } from "$lib/functions"
  import { activeAccordionID } from "$lib/stores"
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
  export let size : "compact" | "default" | "large" = "default"
  export let titleClass : string = ""
  export let titleActiveClass : string = ""

  let toggle = (id: string) => {
    if($activeAccordionID!=""){
      let accordions = document.querySelectorAll(".accordion-body")
      accordions.forEach(accordion => {
        if(animationSpeed){
          (accordion as HTMLElement).style.height = "0px";
          (accordion as HTMLElement).classList.add("overflow-hidden");
        }
      })
    }
    if($activeAccordionID==id){
      activeAccordionID.update((v: string) => v = "")
      return
    }else{
      let element = document.getElementById(id) as HTMLElement;
      activeAccordionID.set(id)
      if(animationSpeed) element.style.height = (element.scrollHeight + 20) + "px"
    }
  }

  if (isOpen) activeAccordionID.set(id)

  let getContainerClasses = (active_ID: string) => {
    let cls = "theui-accordion " + (isFlush ? "accordion-flush " : "accordion-default ") + `space-${size}` + (active_ID == id ? " accordion-active " : " ")
    if(isFlush){
      cls += (active_ID == id ? "accordion-active " : "") + "border-b "
    }else{
      cls += ctx?.group ? ("border-x border-t last:border-b" + getRoundedFirst(rounded, "top") + getRoundedLast(rounded, "bottom")) : ("border" + getRounded(rounded))
    }
    cls += " border-gray-300 dark:border-gray-700 overflow-hidden "
    return active_ID == id ? twMerge(cls, containerActiveClass) : twMerge(cls, containerClass)
  }

  let getTitleClasses = (active_ID: string) => {
    let cls = "accordion-title flex items-center w-full "
    if(isFlush){
      cls += active_ID == id ? "border-b border-brand/50 bg-brand/5 text-brand dark:text-on-brand " : "border-b border-gray-300 dark:border-gray-700 "
    }else{
      cls += active_ID == id ? "bg-brand text-on-brand " : " "
    }
    return active_ID == id ? twMerge(cls, titleActiveClass) : twMerge(cls, titleClass)
  }

  let getContentClasses = (active_ID: string) => {
    let cls = "accordion-content " + (!isFlush ? getRounded(rounded, "bottom") : "") + " h-full "
    return active_ID == id ? twMerge(cls, contentActiveClass) : twMerge(cls, contentClass)
  }
</script>

<div class={getContainerClasses($activeAccordionID)}>
  <div
    id='{id}Heading'
    class='accordion-title'
    aria-controls={id}
    aria-label={ariaLabel}
    aria-expanded={$activeAccordionID==id}
  >
    <button
      class={getTitleClasses($activeAccordionID)}
      class:accordion-active={$activeAccordionID==id}
      on:click={()=>toggle(id)}>
      <slot name="title">{@html title || ""}</slot>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-auto" class:transition-transform={animationSpeed} class:transform={!animationSpeed} class:-rotate-180={$activeAccordionID==id} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  <div
    {id}
    class='accordion-body{getAnimate(animationSpeed)}'
    aria-labelledby='{id}Heading'
    aria-hidden={$activeAccordionID!=id}
    class:accordion-close={$activeAccordionID!=id}
  >
    <div class={getContentClasses($activeAccordionID)}>
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