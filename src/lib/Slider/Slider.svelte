<script lang="ts">
	import { setContext, type Snippet, onMount } from "svelte"
	import { twMerge } from "tailwind-merge"
	import { generateToken } from "$lib/function.core"
  import { ST_SLIDER } from "$lib/state.svelte"

  interface Props {
    children : Snippet,
    autoPlay?: boolean,
    stopOnHover?: boolean,
    slideDuration?: number,
    transitionDuration?: number,
    activeSlide?: number,
    slideClasses?: string,
    [key: string] : unknown
  }

  let {
    children,
    autoPlay = true,
    stopOnHover = true,
    slideDuration = 5000,
    transitionDuration = 500,
    activeSlide = 1,
    slideClasses = "",
    ...props
  } : Props = $props()

  const id = generateToken()
  let autoPlayInterval: number

  onMount(() => {
    if (!ST_SLIDER.slides?.length) {
      console.error("ST_SLIDER.slides is not defined or empty.")
      return
    }

    cloneSlides()

    if (!ST_SLIDER.activeSlide) {
      ST_SLIDER.activeSlide = ST_SLIDER.slides[activeSlide]
    }

    updateTrackPosition()
    if(autoPlay){
      startAutoPlay()
    }
  })

  let cloneSlides = () => {
    const itemsContainer = document.getElementById(`${id}-items`)
    if (itemsContainer) {
      const slides = Array.from(itemsContainer.children)
      if (slides.length) {
        const firstSlide = slides[0]
        const lastSlide = slides[slides.length - 1]
        const firstClone = firstSlide.cloneNode(true) as HTMLElement
        const lastClone = lastSlide.cloneNode(true) as HTMLElement

        firstClone.setAttribute("data-clone", "true")
        lastClone.setAttribute("data-clone", "true")

        itemsContainer.appendChild(firstClone)
        itemsContainer.insertBefore(lastClone, firstSlide)

        ST_SLIDER.slides = [...[lastClone], ...slides, ...[firstClone]]
      }
    }
  }

  let addTransitionListener = (track: HTMLElement, callback: Function) => {
    const handler = () => {
      callback();
      track.removeEventListener("transitionend", handler)
    }
    track.addEventListener("transitionend", handler)
  }

  let slideTransition = () => {
    const track = document.getElementById(`${id}-items`)
    const slides = ST_SLIDER.slides
    const totalSlides = slides.length
    const slideIndex = slides.indexOf(ST_SLIDER.activeSlide)

    if (track) {
      const translateValue = -slideIndex * track.clientWidth
      track.style.transform = `translateX(${translateValue}px)`
      track.style.transition = `transform ${transitionDuration}ms ease`

      addTransitionListener(track, () => {
        if (slideIndex === 0) {
          ST_SLIDER.activeSlide = slides[totalSlides - 2]
          updateTrackPosition()
        } else if (slideIndex === totalSlides - 1) {
          ST_SLIDER.activeSlide = slides[1]
          updateTrackPosition()
        }
      })
    }
  }

  let updateTrackPosition = () => {
    const track = document.getElementById(`${id}-items`)
    const slides = ST_SLIDER.slides
    const slideIndex = slides.indexOf(ST_SLIDER.activeSlide)
    if (track) {
      const translateValue = -slideIndex * track.clientWidth
      track.style.transform = `translateX(${translateValue}px)`
      track.style.transition = "none"
    }
  }

  let calculateNextSlideIndex = (updateType: 'next'|'prev') => {
    const totalSlides = ST_SLIDER.slides.length
    const currentSlideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide)
    if (updateType === "next") {
      return (currentSlideIndex + 1) % totalSlides
    } else {
      return (currentSlideIndex - 1 + totalSlides) % totalSlides
    }
  }

  let changeSlide = (updateType: 'next'|'prev') => {
    const newIndex = calculateNextSlideIndex(updateType)
    ST_SLIDER.activeSlide = ST_SLIDER.slides[newIndex]
    slideTransition()
  }

  let startAutoPlay = () => {
    autoPlayInterval = setInterval(() => changeSlide("next"), 5000);
  }

  let stopAutoPlay = () => clearInterval(autoPlayInterval);

  const handleMouseEnter = () => {
    if (stopOnHover && autoPlay) {
      stopAutoPlay()
    }
  }

  const handleMouseLeave = () => {
    if (stopOnHover && autoPlay) {
      startAutoPlay();
    }
  }

  setContext('SLIDER', {...ST_SLIDER, slideClasses})
</script>

{#if children}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div {id} class="slider relative overflow-hidden w-full" onmouseenter={()=>handleMouseEnter()} onmouseleave={()=>handleMouseLeave()}>
  <div id={`${id}-items`} class="slides flex {props?.class ?? ""}">
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