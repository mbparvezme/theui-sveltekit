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
    activeSlide?: number,
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
    activeSlide = 1,
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
    let activeSlideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide);
    activeSlideIndex = (activeSlideIndex + 1) % totalSlides;
    ST_SLIDER.activeSlide = ST_SLIDER.slides[activeSlideIndex];
    slideTransition();
  }

  let handlePrevious = () => {
    const totalSlides = ST_SLIDER.slides.length;
    let activeSlideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide);
    slideTransition();
    activeSlideIndex = (activeSlideIndex - 1 + totalSlides) % totalSlides;
    ST_SLIDER.activeSlide = ST_SLIDER.slides[activeSlideIndex];
  }

  let slideTransition = () => {
    let currentItem = document.getElementById(ST_SLIDER.activeSlide as string);
    let translate = currentItem?.getAttribute("data-translate");
    let track = document.getElementById(`${id}-items`);

    console.log(ST_SLIDER.activeSlide, translate);
    if (track && translate) {
      const translateValue = parseFloat(translate);
      if (!isNaN(translateValue)) {
        track.style.transform = `translateX(${translateValue}px)`;
        track.style.transition = "transform 0.3s ease";
      } else {
        console.warn("Invalid translate value:", translate);
      }
    }
  }

	setContext('SLIDER', ST_SLIDER)
</script>

{#if children}
<div {id} class="slider relative overflow-hidden w-full">
  <div id={`${id}-items`} class="list flex transition-transform duration-500">
    {@render children()}
  </div>

  <button id="{id}-prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 w-10 h-10 rounded-full" onclick={()=>handlePrevious()}>
    ←
  </button>
  <button id="{id}-next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 w-10 h-10 rounded-full" onclick={()=>handleNext()}>
    →
  </button>
</div>
{/if}