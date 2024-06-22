<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types";
  import { getAnimate, getRounded, getRoundedFirst, getRoundedLast, generateToken } from "$lib/functions";
  import { getContext, onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { ACCORDION_GROUP } from "./Accordion.svelte";

  const ctx: any = getContext( ACCORDION_GROUP || {} );

  export let title: string|undefined = undefined;
  export let content: string|undefined = undefined;
  export let ariaLabel: string = `${title||""} Accordion`;
  export let id: string = generateToken();
  
  export let animationSpeed : ANIMATE_SPEED = "fast";
  export let containerClass : string  =  "";
  export let containerActiveClass : string = "";
  export let contentClass : string = "";
  export let contentActiveClass : string = "";
  export let rounded : ROUNDED = "md";
  export let size : "compact" | "default" | "large" = ctx?.size || "default";
  export let titleClass : string = "";
  export let titleActiveClass : string = "";

  let isOpened: boolean;
  let isFlush: boolean = ctx?.flush || $$props?.flush;
 
  let getSize = (spaceFor: 'title' | 'content') => {
    let accordionSize = ctx?.size || size;
    if(spaceFor == "title"){
      return isFlush ? accordionSize == "compact" ? "py-3 px-2" : accordionSize == "large" ? "py-5 px-3" : "py-4 px-3" :
        accordionSize == "compact" ? "p-3" : accordionSize == "large" ? "p-5" : "p-4"
    }
    if(spaceFor == "content"){
       return accordionSize == "compact" ? "p-3" : accordionSize == "large" ? "p-5" : "p-4"
    }
  }
  
  let makeAccordionOpen = (accordion: HTMLElement | null) => {
    isOpened = true;
    accordion?.classList.add('open');
    if(animationSpeed) (accordion as HTMLElement).style.height = `${(accordion as HTMLElement).scrollHeight + 20}px`;
  }

  let toggle = (id: string) => {
    let currentAccordion = document.getElementById(id);
    if(currentAccordion?.classList.contains('open')){
      isOpened = false;
      currentAccordion?.classList.remove('open');
      if(animationSpeed){
        (currentAccordion as HTMLElement).style.height = "0px";
        (currentAccordion as HTMLElement).classList.add("overflow-hidden");
      }
    }else{
      makeAccordionOpen(currentAccordion as HTMLElement);
    }
  }

  onMount(() => {
    if ($$props?.open){
      makeAccordionOpen(document.getElementById(id) as HTMLElement);
    }
  })

  $: getContainerClasses = () => {
    let cls = `theui-accordion ${(isFlush ? "accordion-flush" : "accordion-default")} ${(isOpened ? "accordion-active" : "")} border-gray-300 dark:border-gray-700 overflow-hidden `;
    if(isFlush){
      cls += `${isOpened ? "accordion-active " : ""} border-b `;
    }else{
      cls += ctx?.group ? `border-x border-t last:border-b ${getRoundedFirst(rounded, "top")} ${getRoundedLast(rounded, "bottom")}` : (`border ${getRounded(rounded)}`);
    }
    return isOpened ? twMerge(cls, containerActiveClass) : twMerge(cls, containerClass);
  }

  $: getTitleClasses = () => {
    let cls = `accordion-title flex items-center justify-between w-full bg-primary${getAnimate(animationSpeed)}${!isFlush?getRounded(rounded):""} focus-visible:outline-brand-500 `;
    if(isFlush){
      cls += isOpened ? "border-b border-brand-200 dark:border-brand-700 bg-brand-100 dark:bg-brand-900 text-brand-500 dark:text-on-brand-500 " : "border-b border-gray-300 dark:border-gray-700 ";
    }else{
      cls += isOpened ? `bg-brand-500 text-on-brand-500 ` : ` `;
    }
    return twMerge(`${cls} ${getSize("title")}`, (isOpened ? titleActiveClass : titleClass));
  }

  $: getContentClasses = () => {
    let cls = `accordion-content bg-primary ${(!isFlush ? getRounded(rounded, "bottom") : "")} h-full`;
    return twMerge(`${cls} ${getSize("content")}`, (isOpened ? contentActiveClass : contentClass));
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
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" class:transition-transform={animationSpeed} class:transform={!animationSpeed} class:-rotate-180={isOpened} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </slot>
    </button>
  </div>

  <div
    {id}
    class='accordion-body overflow-hidden {getAnimate(animationSpeed)}'
    aria-labelledby='{id}Heading'
    aria-hidden={!isOpened}
    class:h-0={!isOpened}
  >
    <div class={getContentClasses()}>
      <slot>{@html content || ""}</slot>
    </div>
  </div>
</div>