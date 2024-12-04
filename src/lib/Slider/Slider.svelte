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
    if (!ST_SLIDER.slides?.length) {
      console.error("ST_SLIDER.slides is not defined or empty.")
      return
    }

    cloneSlides();

    if (!ST_SLIDER.activeSlide) {
      ST_SLIDER.activeSlide = ST_SLIDER.slides[1]
    }
  })

  let cloneSlides = () => {
    const itemsContainer = document.getElementById(`${id}-items`);
    if (itemsContainer) {
      const firstSlide = itemsContainer.children[0];
      const lastSlide = itemsContainer.children[itemsContainer.children.length - 1];
      if (firstSlide && lastSlide) {
        const firstClone = firstSlide.cloneNode(true) as HTMLElement;
        const lastClone = lastSlide.cloneNode(true) as HTMLElement;

        firstClone.setAttribute("data-clone", "true");
        lastClone.setAttribute("data-clone", "true");

        itemsContainer.appendChild(firstClone);
        itemsContainer.insertBefore(lastClone, firstSlide);
      }
    }
  }

  let updateTrackPosition = () => {
    const track = document.getElementById(`${id}-items`);
    const slideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide);
    if (track) {
      const translateValue = -slideIndex * track.offsetWidth; // Adjust to match the current slide
      track.style.transform = `translateX(${translateValue}px)`;
      track.style.transition = "none"; // Instantly position the track
    }
  }

  let slideTransition = () => {
    const track = document.getElementById(`${id}-items`)
    const slideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide)
    if (track) {
      const translateValue = -slideIndex * track.offsetWidth
      track.style.transform = `translateX(${translateValue}px)`
      track.style.transition = "transform 0.5s ease"

      // Handle seamless looping
      track.addEventListener(
        "transitionend",
        () => {
          if (ST_SLIDER.activeSlide === ST_SLIDER.slides[0]) {
            ST_SLIDER.activeSlide = ST_SLIDER.slides[ST_SLIDER.slides.length - 1]
            updateTrackPosition()
          } else if (
            ST_SLIDER.activeSlide ===
            ST_SLIDER.slides[ST_SLIDER.slides.length - 1]
          ) {
            // If at the last cloned slide, jump to the real first slide
            ST_SLIDER.activeSlide = ST_SLIDER.slides[0]
            updateTrackPosition()
          }
        },
        { once: true }
      )
    }
  }

  let calculateNextSlideIndex = (updateType: 'next' | 'prev') => {
    const totalSlides = ST_SLIDER.slides.length
    const currentSlide = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide)
    return (currentSlide + (updateType === "next" ? 1 : -1) + totalSlides) % totalSlides
  }

  let changeSlide = (updateType: 'next' | 'prev') => {
    const newIndex = calculateNextSlideIndex(updateType)
    ST_SLIDER.activeSlide = ST_SLIDER.slides[newIndex]
    slideTransition()
  }


  setContext('SLIDER', ST_SLIDER)
</script>

{#if children}
<div {id} class="slider relative overflow-hidden w-full">
  <div id={`${id}-items`} class="list flex transition-transform duration-500">
    {@render children()}
  </div>

  <button id="{id}-prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 w-10 h-10 rounded-full" onclick={()=>changeSlide("prev")}>
    ←
  </button>
  <button id="{id}-next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 w-10 h-10 rounded-full" onclick={()=>changeSlide("next")}>
    →
  </button>
</div>
{/if}