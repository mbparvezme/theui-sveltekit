<script lang="ts">
	import { setContext, type Snippet, onMount } from "svelte"
  import { ST_SLIDER } from "$lib/state.svelte"
	import { Slider } from "./slider"

  interface Props {
    children: Snippet,
    prevButton?: Snippet,
    nextButton?: Snippet,
    autoPlay?: boolean,
    stopOnHover?: boolean,
    slideDuration?: number,
    transitionDuration?: number,
    activeSlide?: number,
    slideClasses?: string,

    controlButtonClasses?: string,
    indicatorContainerClasses?: string,
    indicatorClasses?: string,

    [key: string] : unknown
  }

  let {
    children,
    prevButton,
    nextButton,
    autoPlay = true,
    stopOnHover = true,
    slideDuration = 5000,
    transitionDuration = 500,
    activeSlide = 1,
    slideClasses = "",

    controlButtonClasses = "",
    indicatorContainerClasses = "",
    indicatorClasses = "",
    ...props
  } : Props = $props()

  const obj = new Slider(autoPlay, stopOnHover, slideDuration, transitionDuration, activeSlide, slideClasses);

  onMount(() => {
    if (!ST_SLIDER.slides?.length) {
      console.error("ST_SLIDER.slides is not defined or empty.")
      return
    }

    obj.cloneSlides()

    if (!ST_SLIDER.activeSlide) {
      ST_SLIDER.activeSlide = ST_SLIDER.slides[activeSlide]
    }

    obj.updateTrackPosition()

    if(obj.autoPlay){
      obj.startAutoPlay()
    }
  })

  setContext('SLIDER', {...ST_SLIDER, slideClasses: obj.slideClasses})
</script>

{#if children}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id={obj.id} class="slider relative overflow-hidden w-full" onmouseenter={()=>obj.handleMouseEnter()} onmouseleave={()=>obj.handleMouseLeave()}>
  <div id={`${obj.id}-items`} class="slides flex {props?.class ?? ""}">
    {@render children()}
  </div>

  <button id="{obj.id}-prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 w-10 h-10 rounded-full" onclick={()=>obj.changeSlide("prev")}>
    ←
  </button>
  <button id="{obj.id}-next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 w-10 h-10 rounded-full" onclick={()=>obj.changeSlide("next")}>
    →
  </button>
</div>
{/if}