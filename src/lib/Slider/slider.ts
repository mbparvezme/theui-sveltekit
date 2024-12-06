import { generateToken } from "$lib/function.core";
import { ST_SLIDER } from "$lib/state.svelte"
import { twMerge } from "tailwind-merge"

export class Slider {
  autoPlay: boolean;
  stopOnHover: boolean;
  slideDuration: number;
  transitionDuration: number;
  activeSlide: number;
  slideClasses: string;

  id: string = generateToken();

  autoPlayInterval!: number;

  constructor(
    autoPlay: boolean,
    stopOnHover: boolean,
    slideDuration: number,
    transitionDuration: number,
    activeSlide: number,
    slideClasses: string
  ) {
    this.autoPlay = autoPlay;
    this.stopOnHover = stopOnHover;
    this.slideDuration = slideDuration;
    this.transitionDuration = transitionDuration;
    this.activeSlide = activeSlide;
    this.slideClasses = slideClasses;
  }

  cloneSlides() {
    const itemsContainer = document.getElementById(`${this.id}-items`)
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

  changeSlide(updateType: 'next' | 'prev') {
    const newIndex = this.calculateNextSlideIndex(updateType)
    ST_SLIDER.activeSlide = ST_SLIDER.slides[newIndex]
    this.slideTransition()
  }

  slideTransition() {
    const track = document.getElementById(`${this.id}-items`)
    const slides = ST_SLIDER.slides
    const totalSlides = slides.length
    const slideIndex = slides.indexOf(ST_SLIDER.activeSlide)

    if (track) {
      const translateValue = -slideIndex * track.clientWidth
      track.style.transform = `translateX(${translateValue}px)`
      track.style.transition = `transform ${this.transitionDuration}ms ease`

      this.addTransitionListener(track, () => {
        if (slideIndex === 0) {
          ST_SLIDER.activeSlide = slides[totalSlides - 2]
          this.updateTrackPosition()
        } else if (slideIndex === totalSlides - 1) {
          ST_SLIDER.activeSlide = slides[1]
          this.updateTrackPosition()
        }
      })
    }
  }

  addTransitionListener (track: HTMLElement, callback: Function) {
    const handler = () => {
      callback();
      track.removeEventListener("transitionend", handler)
    }
    track.addEventListener("transitionend", handler)
  }

  calculateNextSlideIndex (updateType: 'next' | 'prev') {
    const totalSlides = ST_SLIDER.slides.length
    const currentSlideIndex = ST_SLIDER.slides.indexOf(ST_SLIDER.activeSlide)
    if (updateType === "next") {
      return (currentSlideIndex + 1) % totalSlides
    } else {
      return (currentSlideIndex - 1 + totalSlides) % totalSlides
    }
  }

  updateTrackPosition () {
    const track = document.getElementById(`${this.id}-items`)
    const slides = ST_SLIDER.slides
    const slideIndex = slides.indexOf(ST_SLIDER.activeSlide)
    if (track) {
      const translateValue = -slideIndex * track.clientWidth
      track.style.transform = `translateX(${translateValue}px)`
      track.style.transition = "none"
    }
  }

  handleMouseEnter () {
    if (this.stopOnHover && this.autoPlay) {
      this.stopAutoPlay()
    }
  }

  handleMouseLeave (){
    if (this.stopOnHover && this.autoPlay) {
      this.startAutoPlay();
    }
  }

  startAutoPlay (){
    this.autoPlayInterval = setInterval(() => this.changeSlide("next"), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  getSliderClasses() {

  }

  getSlideClasses() {

  }

  getImageClasses() {

  }

  getButtonClasses() {

  }

  getIndicatorContainerClasses() {

  }

  getIndicatorClasses() {

  }
}


