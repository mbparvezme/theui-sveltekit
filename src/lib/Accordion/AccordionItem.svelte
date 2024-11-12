<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { getContext, onMount, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { generateToken, roundedClass, animationClass } from "$lib/functions"
  import {activeAccordions} from "$lib/state.svelte"

  interface Props {
    title: string|Snippet|undefined,
    content: string|Snippet|undefined,
    id: string,
    animationSpeed: ANIMATE_SPEED,
    rounded: ROUNDED,
    size: "compact" | "default" | "large",
    containerClass: string,
    containerActiveClass: string,
    contentClass: string,
    contentActiveClass: string,
    titleClass: string,
    titleActiveClass: string,
    [key: string]: unknown // open, flush
	}

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
  } : Props = $props()

  let toggle = () => {
    const accordion = document.getElementById(id)
    if (!accordion) return

    if(CTX?.standalone){
      if(activeAccordions.value.includes(id)){
        activeAccordions.value = activeAccordions.value.filter(item => item !== id)
        accordion.style.height = '0px'
        accordion.classList.add('overflow-hidden')
      }else{
        activeAccordions.value.forEach((accordionID) => {
          if(accordionID !== ""){
            let activeAccordionEL = document.querySelector(`#${CTX?.id} #${accordionID}`) as HTMLElement
            if(!activeAccordionEL) return;
            activeAccordions.value = activeAccordions.value.filter(item => item !== accordionID)
            activeAccordionEL.style.height = `0px`
            activeAccordionEL.classList.add('overflow-hidden')
          }
        })

        activeAccordions.value.push(id)
        accordion.style.height = `${accordion.scrollHeight + 20}px`
        accordion.classList.remove('overflow-hidden')
      }
    }else{
      if(activeAccordions.value.includes(id)){
        activeAccordions.value = activeAccordions.value.filter(item => item !== id)
        accordion.style.height = '0px'
        accordion.classList.add('overflow-hidden')
      }else{
        activeAccordions.value.push(id)
        accordion.style.height = `${accordion.scrollHeight + 20}px`
        accordion.classList.remove('overflow-hidden')
      }
    }
  }

  onMount(() => {
    if(props?.open){
      if(CTX?.standalone) activeAccordions.value = [""]
      activeAccordions.value.push(id)
    }
  })

  let getContainerClasses = () => {
    let cls = `theui-accordion ${props?.flush ? "accordion-flush " : "accordion-default "} space-${size} ${activeAccordions.value.includes(id) ? " accordion-active " : " "}`;
    if(props?.flush){
      cls += `${activeAccordions.value.includes(id) ? "accordion-active " : ""} border-b `;
    }else{
      cls += `${CTX?.group ? `border-x border-t last:border-b ${roundedClass(rounded, "top", "first")} ${roundedClass(rounded, "bottom", "last")}` : `border ${roundedClass(rounded)}`}`;
    }
    cls += " border-gray-300 dark:border-gray-700 overflow-hidden ";
    return activeAccordions.value.includes(id) ? twMerge(cls, containerActiveClass) : twMerge(cls, containerClass);
  }

  let getTitleClasses = () => {
    let cls = `accordion-title flex items-center w-full${animationClass(animationSpeed)} `;
    if(props?.flush){
      cls += activeAccordions.value.includes(id) ? "border-b border-brand-primary-200 bg-brand-primary-50 text-brand-primary-500 dark:text-on-brand-primary-500 " : "border-b border-gray-300 dark:border-gray-700 ";
    }else{
      cls += activeAccordions.value.includes(id) ? "bg-brand-primary-500 text-on-brand-primary-500 " : " ";
    }
    return activeAccordions.value.includes(id) ? twMerge(cls, titleActiveClass) : twMerge(cls, titleClass);
  }

  let getContentClasses = () => {
    let cls = "accordion-content " + (!props?.flush ? roundedClass(rounded, "bottom") : "") + " h-full ";
    return activeAccordions.value.includes(id) ? twMerge(cls, contentActiveClass) : twMerge(cls, contentClass);
  }
</script>

<div class={getContainerClasses()}>
  <div
    id='{id}Heading'
    class='accordion-title'
    aria-controls={id}
    aria-label={`${title||""} Accordion`}
    aria-expanded={activeAccordions.value.includes(id)}
  >

  <button
    class={twMerge(getTitleClasses(), activeAccordions.value.includes(id) && 'accordion-active')}
    class:accordion-active={activeAccordions.value.includes(id)}
    on:click={()=>toggle()}>
      {#if typeof title === "string"}
        {@html title}
      {:else}
        {@render title?.()}
      {/if}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ms-auto" class:transition-transform={animationSpeed} class:transform={!animationSpeed} class:-rotate-180={activeAccordions.value.includes(id)} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  <div
    {id}
    class='accordion-body{animationClass(animationSpeed)}'
    class:accordion-close={!activeAccordions.value.includes(id)}
    class:open={activeAccordions.value.includes(id)}
    aria-labelledby='{id}Heading'
    aria-hidden={!activeAccordions.value.includes(id)}
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