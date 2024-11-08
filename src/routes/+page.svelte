<script lang="ts">
  import { onMount } from 'svelte';

  let el: HTMLDetailsElement | null = null;
  let animation: Animation | null = null;
  let isClosing = false;
  let isExpanding = false;

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!el) return;
    el.classList.add('overflow-hidden'); // Tailwind class for overflow hidden

    if (isClosing || !el.open) {
      open();
    } else if (isExpanding || el.open) {
      shrink();
    }
  };

  const shrink = () => {
    if (!el) return;
    isClosing = true;
    const startHeight = `${el.offsetHeight}px`;
    const endHeight = `${el.querySelector('summary')?.offsetHeight}px`;

    if (animation) animation.cancel();

    animation = el.animate(
      { height: [startHeight, endHeight] },
      { duration: 400, easing: 'ease-out' }
    );

    animation.onfinish = () => onAnimationFinish(false);
    animation.oncancel = () => (isClosing = false);
  };

  const open = () => {
    if (!el) return;
    el.style.height = `${el.offsetHeight}px`;
    el.open = true;
    requestAnimationFrame(expand);
  };

  const expand = () => {
    if (!el) return;
    isExpanding = true;
    const summaryHeight = el.querySelector('summary')?.offsetHeight || 0;
    const contentHeight = el.querySelector('details > div')?.offsetHeight || 0;
    const startHeight = `${el.offsetHeight}px`;
    const endHeight = `${summaryHeight + contentHeight}px`;

    if (animation) animation.cancel();

    animation = el.animate(
      { height: [startHeight, endHeight] },
      { duration: 400, easing: 'ease-out' }
    );

    animation.onfinish = () => onAnimationFinish(true);
    animation.oncancel = () => (isExpanding = false);
  };

  const onAnimationFinish = (open: boolean) => {
    if (!el) return;
    el.open = open;
    animation = null;
    isClosing = false;
    isExpanding = false;
    el.style.height = '';
    el.classList.remove('overflow-hidden');
  };

  onMount(() => {
    if (el) el.querySelector('summary')?.addEventListener('click', handleClick);
    return () => {
      if (el) el.querySelector('summary')?.removeEventListener('click', handleClick);
    };
  });


  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { generateToken, roundedClass, animationClass } from "$lib/functions"
  import {stores} from "$lib/state.svelte"

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
  } : {
    title: string|Snippet|undefined,
    content: string|Snippet|undefined,
    id: string,
    animationSpeed : ANIMATE_SPEED,
    rounded : ROUNDED,
    size : "compact" | "default" | "large",
    containerClass : string,
    containerActiveClass : string,
    contentClass : string,
    contentActiveClass : string,
    titleClass : string,
    titleActiveClass : string,
    props: Record<string, any>[] | null
  } = $props()

  let isOpened: boolean = $state(false)

  let toggle = () => {
    const accordion = document.getElementById(id)
    if (!accordion) return

    isOpened = !isOpened
    if(isOpened){
      stores.activeAccordion = id;
    }
    accordion.style.height = isOpened ? `${accordion.scrollHeight + 20}px` : '0px'
    accordion.classList.toggle('overflow-hidden', !isOpened)
  }

  onMount(() => {
    if(props?.open){
      isOpened = true
      stores.activeAccordion = id
    }
  })

  let getContainerClasses = () => {
    let cls = `theui-accordion ${props?.flush ? "accordion-flush " : "accordion-default "} space-${size} ${isOpened ? " accordion-active " : " "}`;
    if(props?.flush){
      cls += `${isOpened ? "accordion-active " : ""} border-b `;
    }else{
      cls += `${CTX?.group ? `border-x border-t last:border-b ${roundedClass(rounded, "top", "first")} ${roundedClass(rounded, "bottom", "last")}` : `border ${roundedClass(rounded)}`}`;
    }
    cls += " border-gray-300 dark:border-gray-700 overflow-hidden ";
    return isOpened ? twMerge(cls, containerActiveClass) : twMerge(cls, containerClass);
  }

  let getTitleClasses = () => {
    let cls = `accordion-title flex items-center w-full${animationClass(animationSpeed)} `;
    if(props?.flush){
      cls += isOpened ? "border-b border-brand-primary-200 bg-brand-primary-50 text-brand-primary-500 dark:text-on-brand-primary-500 " : "border-b border-gray-300 dark:border-gray-700 ";
    }else{
      cls += isOpened ? "bg-brand-primary-500 text-on-brand-primary-500 " : " ";
    }
    return isOpened ? twMerge(cls, titleActiveClass) : twMerge(cls, titleClass);
  }

  let getContentClasses = () => {
    let cls = "accordion-content " + (!props?.flush ? roundedClass(rounded, "bottom") : "") + " h-full ";
    return isOpened ? twMerge(cls, contentActiveClass) : twMerge(cls, contentClass);
  }


</script>

<details class={getContainerClasses()} bind:this={el}>
  <summary class={getTitleClasses()}>How do you comfort a JavaScript bug? <span>VV</span></summary>
  <div class={getContentClasses()}>
    Last summer at Tailwind Connect I shared a preview of Oxide — a new high-performance engine for Tailwind CSS that we’ve been working on, designed to simplify the developer experience and take advantage of how the web platform has evolved in recent years. The new engine was originally going to ship as a v3.x release, but even though we’re committed to backwards compatibility, this feels so clearly like a new generation of the framework that it deserves to be v4.0.
  </div>
</details>



<style lang="postcss">
  details > summary {
  list-style: none;
  @apply px-4 py-3 cursor-pointer;
}
  .theui-accordion.space-compact:not(.accordion-flush) .accordion-title summary, .theui-accordion.space-compact .accordion-content{
    @apply p-3;
  }
  .theui-accordion.space-compact.accordion-flush .accordion-title summary{
    @apply py-3 px-2;
  }
  .theui-accordion.space-default:not(.accordion-flush) .accordion-title summary, .theui-accordion.space-default .accordion-content{
    @apply p-4;
  }
  .theui-accordion.space-default.accordion-flush .accordion-title summary{
    @apply py-4 px-3;
  }
  .theui-accordion.space-large:not(.accordion-flush) .accordion-title summary, .theui-accordion.space-large .accordion-content{
    @apply p-5;
  }
  .theui-accordion.space-large.accordion-flush .accordion-title summary{
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
