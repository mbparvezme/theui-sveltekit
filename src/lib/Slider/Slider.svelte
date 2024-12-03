<script lang="ts">
	import type { ANIMATE_SPEED } from "$lib/types"
	import { setContext, type Snippet, onMount } from "svelte"
	import { twMerge } from "tailwind-merge"
	import { generateToken } from "$lib/function.core"
  import { ST_SLIDER } from "$lib/state.svelte"

  interface Props {
    children : Snippet,
    slideDuration?: number,
    stopOnHover?: boolean,
    transitionType?: 'fade'|'slide',
    activeIndex?: number,
    animate?: ANIMATE_SPEED,
    [key: string] : unknown
  }

  let {
    children,
    borderClasses = true,
    animate = "normal",
    slideDuration = 5000,
    stopOnHover = true,
    transitionType = 'fade',
    activeIndex = 1,
    ...props
  } : Props = $props()
  
  const id = generateToken()

  onMount(() => {
    if(!ST_SLIDER.activeSlide){
      ST_SLIDER.activeSlide = ST_SLIDER.slides[0]
    }
  })

  let handleNext = () => {
    const totalSlides = ST_SLIDER.slides.length;

    const activeSlideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide);

    const previousSlideIndex = (activeSlideIndex === 0) ? totalSlides - 1 : activeSlideIndex - 1;
    const nextSlideIndex = (activeSlideIndex + 1) % totalSlides;

    ST_SLIDER.activeSlide = ST_SLIDER.slides[nextSlideIndex];
    
    ST_SLIDER.previousSlide = ST_SLIDER.slides[previousSlideIndex];
    ST_SLIDER.nextSlide = ST_SLIDER.slides[nextSlideIndex];
  }

	setContext('SLIDER', ST_SLIDER)
</script>

{#if children}
<div {id} class="slider relative overflow-hidden w-full">
  <div class="list flex transition-transform duration-500">
    {@render children()}
  </div>

  <button id="{id}-prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
    ←
  </button>
  <button id="{id}-next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full" onclick={()=>handleNext()}>
    →
  </button>
</div>
{/if}