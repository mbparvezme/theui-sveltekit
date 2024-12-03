<script lang="ts">
  import { generateToken } from "$lib/function.core";
  import { onMount, onDestroy } from "svelte";

  let slideDuration: number = 3000;
  let stopOnHover: boolean = true;
  let transitionType: "fade" | "slide" = "slide";
  let transitionDuration: number = 150;
  let activeIndex = 1;

  // Private
  let id: string = generateToken();

  let slider: HTMLElement;
  let track: HTMLElement;
  let items: NodeListOf<HTMLElement>;

  let autoSlideInterval: number | null = null; // Required for stopOnHover feature
  let isTransitioning = false; // Required to handle continuous clicking
  let slideWidth: number = 0;
  let totalItems: number = 0;
  let realItemsCount: number = 0;

  const setInitialPosition = () => {
    if (track && items) {
      slideWidth = items[0].clientWidth;
      totalItems = items.length;
      realItemsCount = totalItems - 2;
      setTimeout(() => {
        slider.classList.remove("opacity-0")
      }, 100);
    }
  };

  onMount(() => {
    items = slider?.querySelectorAll<HTMLElement>(".list .item");

    const next = document.getElementById(`${id}-next`);
    const prev = document.getElementById(`${id}-prev`);

    // Initialize slides and create dynamic duplicates
    const initializeSlider = () => {
      if (!slider || !slider.querySelector('.list')) {
        console.error('Slider or track element is missing!');
        return;
      }

      const track = slider.querySelector('.list');
      if (!track) return;

      // // Clone first and last items
      // const firstSlide = items[0].cloneNode(true) as HTMLElement;
      // const lastSlide = items[items.length - 1].cloneNode(true) as HTMLElement;

      // // Append duplicates to the track
      // track.appendChild(firstSlide); // Duplicate last slide
      // track.insertBefore(lastSlide, items[0]); // Duplicate first slide

      // Now the track contains the correct duplicate slides.
      slideWidth = items[0].clientWidth;
      setInitialPosition();
    };

    // Initialize the slider with dynamic duplicates
    initializeSlider();

    const setPosition = (index: number, useTransition = true) => {
      if (!track) {
        console.error("Track element is not available.");
        return;
      }
      const offset = -index * slideWidth;
      if (transitionType === "fade") {
        track.style.transition = useTransition
          ? `opacity ${transitionDuration}ms ease`
          : "none";
        track.style.opacity = "0";
        track.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
          track.style.opacity = "1";
        }, transitionDuration);
      } else {
        track.style.transition = useTransition
          ? `transform ${transitionDuration}ms ease`
          : "none";
        track.style.transform = `translateX(${offset}px)`;
      }
    };

    const handleSliderLoop = () => {
      if (activeIndex > realItemsCount) {
        setPosition(1, false); // Jump from duplicate last to first real
        activeIndex = 1;
      } else if (activeIndex === 0) {
        setPosition(realItemsCount, false); // Jump from duplicate first to last real
        activeIndex = realItemsCount;
      }
    };

    const loadSlide = () => {
      setPosition(activeIndex);
    };

    const handleTransitionEnd = () => {
      isTransitioning = false;
      handleSliderLoop();
    };

    const stopTransitionOnHover = () => stopOnHover && stopAutoSlide();
    const resumeTransitionAfterHover = () => stopOnHover && startAutoSlide();

    if (next && prev) {
      next.addEventListener("click", () => {
        if (isTransitioning) return;
        isTransitioning = true;
        activeIndex++;
        loadSlide();
      });

      prev.addEventListener("click", () => {
        if (isTransitioning) return;
        isTransitioning = true;
        activeIndex--;
        loadSlide();
      });
    }

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        if (!isTransitioning) {
          isTransitioning = true;
          activeIndex++;
          loadSlide();
        }
      }, slideDuration);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    const handleResize = () => {
      slideWidth = items![0].clientWidth;
      setPosition(activeIndex, false);
    };

    window.addEventListener("resize", handleResize);
    track.addEventListener("transitionend", handleTransitionEnd);
    slider.addEventListener("mouseenter", stopTransitionOnHover);
    slider.addEventListener("mouseleave", resumeTransitionAfterHover);

    startAutoSlide();

    onDestroy(() => {
      stopAutoSlide();
      window.removeEventListener("resize", handleResize);
      track!.removeEventListener("transitionend", handleTransitionEnd);
      slider!.removeEventListener("mouseenter", stopTransitionOnHover);
      slider!.removeEventListener("mouseleave", resumeTransitionAfterHover);
      if (next) next.removeEventListener("click", () => {});
      if (prev) prev.removeEventListener("click", () => {});
    });
  });
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div {id} bind:this={slider} class="slider relative overflow-hidden w-full opacity-0">
  <div bind:this={track} class="list flex transition-transform duration-500">
    <div class="item flex-shrink-0 w-full h-64 bg-red-500 flex items-center justify-center text-white">
      Slide 3
    </div>

    <div class="item flex-shrink-0 w-full h-64 bg-blue-500 flex items-center justify-center text-white">
      Slide 1
    </div>
    <div class="item flex-shrink-0 w-full h-64 bg-green-500 flex items-center justify-center text-white">
      Slide 2
    </div>

    <div class="item flex-shrink-0 w-full h-64 bg-red-500 flex items-center justify-center text-white">
      Slide 3
    </div>

    <div class="item flex-shrink-0 w-full h-64 bg-blue-500 flex items-center justify-center text-white">
      Slide 1
    </div>
  </div>

  <button id="{id}-prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
    ←
  </button>
  <button id="{id}-next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
    →
  </button>
</div>
