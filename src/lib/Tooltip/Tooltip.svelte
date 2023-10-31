<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"

  export let text: string|undefined = undefined

  export let animate   : ANIMATE_SPEED = "normal"
  export let animation : 'fade' | 'slide' | 'zoom-in' | 'zoom-out' = "fade"
  export let bgColor   : string = "#1F2937"
  export let position  : 'left' | 'top' | 'right' | 'bottom' = "top"
  export let rounded   : ROUNDED = "md"
  export let triggerBy : 'hover' | 'click' | string = "hover"

  let tooltip: HTMLSpanElement
  let tooltipClasses: any
  $: tooltipClasses = () => " theui-tooltip z-[60] absolute min-w-[150px] max-w-xs inline-block text-sm text-center p-2 text-white" + (position === "left" ? " tooltip-left" : position === "right" ? " tooltip-right" : position === "bottom" ?   " tooltip-bottom" : " tooltip-top") + getRounded(rounded||"sm")

  onMount(() => {
    let triggerElement: HTMLElement[]|[]
    triggerElement = [...document.querySelectorAll<HTMLElement>("[data-tooltip]")] || []
    if (!triggerElement.length) {
      console.error("No tooltip found.");
    }

    triggerElement.forEach((element: HTMLElement) => {
      if (element.tabIndex < 0) element.tabIndex = 0; // trigger must be focusable
    })

    triggerElement.forEach((element: HTMLElement) => {
      if (element) {
        // Setting relative class if not available
        if(!element.classList.contains("relative")){
          element.classList.add("relative")
        }
        // Getting trigger event
        let triggerEvent = element.getAttribute("data-trigger-by")||triggerBy
        // Click trigger event
        if(triggerEvent == "click"){
          element.addEventListener("click", (e) => {
            if(element.classList.contains("tooltip-shown")) removeTooltip(element)
            else createTooltip(element, e)
          })
          element.onblur = () => element.classList.remove("tooltip-shown")
        }
        // Hover trigger event
        else{
          element.addEventListener("mouseenter", (e) => createTooltip(element, e))
          element.onmouseleave = () => removeTooltip(element)
        }
      }
    })

    let createTooltip = (element: HTMLElement, e: MouseEvent) => {
      element.appendChild(tooltip)
      text = e?.target?.dataset?.tooltip || ""
      position = e?.target?.dataset.tooltipPosition || position
      element.classList.add("tooltip-shown")
    }

    let removeTooltip = (element: HTMLElement) => {
      element.classList.remove("tooltip-shown")
      element.removeChild(tooltip)
    }

  })
</script>

<span bind:this={tooltip} class={twMerge(tooltipClasses(), $$props?.class)} style="--bg-color: {bgColor};">
  {@html text}
</span>

<style lang="postcss">
  .theui-tooltip {
    background-color: var(--bg-color);
    @apply hidden;
  }
  .theui-tooltip.tooltip-top {
    @apply -top-3 left-1/2 -translate-x-1/2 -translate-y-full;
  }
  .theui-tooltip.tooltip-right {
    @apply -right-3 top-1/2 translate-x-full -translate-y-1/2;
  }
  .theui-tooltip.tooltip-bottom {
    @apply -bottom-3 left-1/2 -translate-x-1/2 translate-y-full;
  }
  .theui-tooltip.tooltip-left {
    @apply -left-3 top-1/2 -translate-x-full -translate-y-1/2;
  }
  /* Arrow */
  .theui-tooltip::after {
    content: " ";
    @apply absolute h-0 w-0 transform border-transparent border-8;
  }
  .theui-tooltip.tooltip-top::after {
    border-top-color: var(--bg-color);
    @apply border-b-0 -bottom-2 left-1/2 -translate-x-1/2;
  }
  .theui-tooltip.tooltip-right::after {
    border-right-color: var(--bg-color);
    @apply border-l-0 -left-[7px] top-1/2 -translate-y-1/2;
  }
  .theui-tooltip.tooltip-bottom::after {
    border-bottom-color: var(--bg-color);
    @apply border-t-0 -top-2 left-1/2 -translate-x-1/2;
  }
  .theui-tooltip.tooltip-left::after {
    border-left-color: var(--bg-color);
    @apply border-r-0 -right-[7px] top-1/2 -translate-y-1/2;
  }
  :global(.tooltip-shown .theui-tooltip){
    @apply inline-block;
  }
</style>
