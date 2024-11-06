<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { getContext, onMount, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { generateToken, roundedClass, animationClass } from "$lib/functions"
  import {stores} from "$lib/state.svelte"

  const CTX: any = getContext("ACCORDION_GROUP") ?? {}

  let {
    title = undefined,
    content = undefined,
    id = generateToken(),
    animationSpeed = "fast",
    rounded = "md",
    size = CTX?.size ?? "default",
    containerClass = "",
    containerActiveClass = "",
    contentClass = "",
    contentActiveClass = "",
    titleClass = "",
    titleActiveClass = "",
    ...props
  } : {
    title: string|Snippet|undefined,
    content: string|Snippet|undefined,
    id: string,
    animationSpeed : ANIMATE_SPEED,
    rounded : ROUNDED,
    size : "compact" | "default" | "large",
    containerClass : string,
    containerActiveClass : string,
    contentClass : string,
    contentActiveClass : string,
    titleClass : string,
    titleActiveClass : string,
    props: Record<string, any>[] | null
  } = $props()

  let isOpened: boolean = $state(false)

  let toggle = () => {
    const accordion = document.getElementById(id)
    if (!accordion) return

    isOpened = !isOpened
    if(isOpened){
      stores.activeAccordion = id;
    }
    accordion.style.height = isOpened ? `${accordion.scrollHeight + 20}px` : '0px'
    accordion.classList.toggle('overflow-hidden', !isOpened)
  }

  onMount(() => {
    if(props?.open){
      isOpened = true
      stores.activeAccordion = id
    }
  })

  let getContainerClasses = () => {
    let cls = `theui-accordion ${props?.flush ? "accordion-flush " : "accordion-default "} space-${size} ${isOpened ? " accordion-active " : " "}`;
    if(props?.flush){
      cls += `${isOpened ? "accordion-active " : ""} border-b `;
    }else{
      cls += `${CTX?.group ? `border-x border-t last:border-b ${roundedClass(rounded, "top", "first")} ${roundedClass(rounded, "bottom", "last")}` : `border ${roundedClass(rounded)}`}`;
    }
    cls += " border-gray-300 dark:border-gray-700 overflow-hidden ";
    return isOpened ? twMerge(cls, containerActiveClass) : twMerge(cls, containerClass);
  }

  let getTitleClasses = () => {
    let cls = `accordion-title flex items-center w-full${animationClass(animationSpeed)} `;
    if(props?.flush){
      cls += isOpened ? "border-b border-brand-primary-200 bg-brand-primary-50 text-brand-primary-500 dark:text-on-brand-primary-500 " : "border-b border-gray-300 dark:border-gray-700 ";
    }else{
      cls += isOpened ? "bg-brand-primary-500 text-on-brand-primary-500 " : " ";
    }
    return isOpened ? twMerge(cls, titleActiveClass) : twMerge(cls, titleClass);
  }

  let getContentClasses = () => {
    let cls = "accordion-content " + (!props?.flush ? roundedClass(rounded, "bottom") : "") + " h-full ";
    return isOpened ? twMerge(cls, contentActiveClass) : twMerge(cls, contentClass);
  }
</script>

<div class={getContainerClasses()}>
  <div
    id='{id}Heading'
    class='accordion-title'
    aria-controls={id}
    aria-label={`${title||""} Accordion`}
    aria-expanded={isOpened}
  >

  <button
    class={twMerge(getTitleClasses(), isOpened && 'accordion-active')}
    class:accordion-active={isOpened}
    on:click={()=>toggle()}>
      {#if typeof title === "string"}
        {@html title}
      {:else}
        {@render title?.()}
      {/if}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ms-auto" class:transition-transform={animationSpeed} class:transform={!animationSpeed} class:-rotate-180={isOpened} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  <div
    {id}
    class='accordion-body{animationClass(animationSpeed)}'
    class:accordion-close={!isOpened}
    class:open={isOpened}
    aria-labelledby='{id}Heading'
    aria-hidden={!isOpened}
  >
    <div class={getContentClasses()}>
      {#if typeof content === "string"}
        {@html content}
      {:else}
        {@render content?.()}
      {/if}
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