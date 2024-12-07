<script lang="ts">
	import { setContext, type Snippet, onMount } from "svelte"
  import { ST_SLIDER } from "$lib/state.svelte"
	import { Slider } from "./slider"
	import { twMerge } from "tailwind-merge";

  interface Props {
    children: Snippet,
    prevButton?: Snippet,
    nextButton?: Snippet,
    autoPlay?: boolean,
    stopOnHover?: boolean,
    slideDuration?: number,
    transitionDuration?: number,
    activeSlide?: number,
    controls?: boolean,
    indicator?: boolean,
    timer?: boolean,
    indicatorClasses?: string,
    indicatorActiveClasses?: string,

    slideContainerClasses?: string,
    slideClasses?: string,
    controlButtonClasses?: string,
    indicatorContainerClasses?: string,
    timerClasses?: string,

    [key: string] : unknown
  }

  let {
    children,
    prevButton,
    nextButton,
    autoPlay = true,
    stopOnHover = true,
    slideDuration = 3000,
    transitionDuration = 500,
    activeSlide = 1,
    indicatorClasses = "",
    indicatorActiveClasses = "",

    controls = false,
    timer = true,
    indicator = false,
    slideContainerClasses = "",
    slideClasses = "",
    controlButtonClasses = "",
    indicatorContainerClasses = "",
    timerClasses = "",
    ...props
  } : Props = $props()

  const obj = new Slider({
    autoPlay,
    stopOnHover,
    slideDuration,
    transitionDuration,
    activeSlide,
    indicatorClasses,
    indicatorActiveClasses
  });

  onMount(() => {
    if (!ST_SLIDER.slides?.length) {
      console.error("ST_SLIDER.slides is not defined or empty.")
      return
    }
    obj.createIndicator()
    obj.cloneSlides()
    if (!ST_SLIDER.activeSlide) {
      ST_SLIDER.activeSlide = ST_SLIDER.slides[activeSlide]
    }
    obj.updateActiveIndicator(activeSlide-1)
    obj.updateTrackPosition()
    if(obj.config.autoPlay){
      obj.startTimerAnimation()
      obj.startAutoPlay()
    }
  })

  setContext('SLIDER', {...ST_SLIDER, slideClasses})
</script>

{#if children}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id={obj.id} class="slider relative overflow-hidden w-full" onmouseenter={()=>obj.handleMouseEnter()} onmouseleave={()=>obj.handleMouseLeave()}>
  <div id={`${obj.id}-items`} class="slides flex {props?.class ?? ""}">
    {@render children()}
  </div>

  {#if !controls}
  <button id="{obj.id}-prev" class="prev-slide-button {obj.getButtonClasses(controlButtonClasses, "prev")}" onclick={()=>obj.changeSlide("prev")}>
    {#if prevButton}
      {@render prevButton()}
    {:else}
      ←
    {/if}
  </button>
  <button id="{obj.id}-next" class="next-slide-button {obj.getButtonClasses(controlButtonClasses, "next")}" onclick={()=>obj.changeSlide("next")}>
    {#if nextButton}
      {@render nextButton()}
    {:else}
      →
    {/if}
  </button>
  {/if}

  {#if timer}
  <div id="{obj.id}-timer" class="slide-timer absolute {twMerge("top-0 start-0 h-1 bg-gray-500 opacity-50", timerClasses)}"></div>
  {/if}

  {#if !indicator}
    <div id="{obj.id}-indicators" class="slide-indicators z-[1] bg-gray-100 {obj.getIndicatorContainerClasses(indicatorContainerClasses)}"></div>
  {/if}

</div>
{/if}