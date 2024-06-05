<script context="module" lang="ts">
	export const FAB: any = {};
</script>

<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types"
  import { generateToken, getAnimate } from "$lib/functions"
  import { twMerge } from "tailwind-merge";
  import { onMount, setContext } from "svelte";

  export let animate: ANIMATE_SPEED = "normal"
  export let size: 'sm' | 'md' | 'lg' | 'xl' = "md"
  export let shape: 'circle' | 'rounded' | 'square' = "circle"
  export let position: 'left' | 'right' = "right"
  export let href: string|undefined = undefined
  export let trigger: 'click' | 'hover' = "hover"
  export let iconClass: string = ""
  export let direction: 'horizontal' | 'vertical' = "vertical"

  let id: string = `${generateToken()}-fab-trigger`

  onMount(() => {
    let elem = document.getElementById(id)
    if(trigger == "hover"){
      elem?.addEventListener("mouseenter", () => elem.classList.add("open"))
      elem?.addEventListener("mouseleave", () => elem.classList.remove("open"))
    }
    if(trigger == "click"){
      elem?.addEventListener("click", () => elem.classList.toggle("open"))
    }
  });

  let corner = () => {
    if(shape == "circle") return "rounded-full";
    if(shape == "rounded"){
      if(size == "xl") return "rounded-lg";
      if(size == "lg") return "rounded-lg";
      if(size == "md") return "rounded-md";
      return "rounded-md";
    }
    return "";
  };

  let btnSizeClass = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
    xl: "w-16 h-16"
  };

  let iconSizeClass = {
    sm: "w-[1.5em] h-[1.5em]",
    md: "w-[1.5em] h-[1.5em]",
    lg: "w-[1.75em] h-[1.75em]",
    xl: "w-[2em] h-[2em]"
  };

  let positionClass = {
    left: "left-6 bottom-6 fab-left",
    right: "right-6 bottom-6 fab-right"
  };

  let fabBoxClass = () => `theui-fab-box fixed flex ${positionClass[position]} ${getAnimate(animate)} ${direction=="horizontal" ? "flex-row" : "flex-col"}`;
  let fabButtonClass = () => `theui-fab static flex items-center justify-center ${btnSizeClass[size]} ${twMerge(`${corner()} ${getAnimate(animate)} bg-primary shadow-2xl hover:bg-secondary`, $$props?.class)}`;
  let fabIconClass = () => `fab-icon ${twMerge(iconSizeClass[size], iconClass)}`;

  setContext(FAB, {btnClass: fabButtonClass(), iconClass: fabIconClass()});
</script>

<div {id} class={fabBoxClass()}>
  <div class="theui-fab-items {getAnimate(animate)}" class:fab-vertical={direction == "vertical"} class:fab-horizontal={direction == "horizontal"}>
    <slot />
  </div>
  <svelte:element {id} this={href ? "a" : "button"} {href}
    class={fabButtonClass()}
    role={href ? "link" : "button"}
    aria-label={"button"}
    on:click on:keydown on:keyup on:touchstart|passive on:touchend on:touchcancel on:mouseenter on:mouseleave
  >
    <span class={fabIconClass()}>
      <slot name="icon">
        <svg viewBox="64 64 896 896" focusable="false" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
      </slot>
    </span>
  </svelte:element>
</div>

<style lang="postcss">
  .theui-fab-items{
    @apply flex gap-4 opacity-0;
  }
  .theui-fab-items.fab-vertical{
    @apply flex-col pb-4 translate-y-2;
  }
  .theui-fab-items.fab-horizontal{
    @apply flex-row pr-4 translate-x-2;
  }

  .theui-fab-box.open .theui-fab-items.fab-vertical, .theui-fab-box.open .theui-fab-items.fab-horizontal{
    @apply opacity-100 ease-out;
  }
  .theui-fab-box.open .theui-fab-items.fab-vertical{
    @apply translate-y-0;
  }
  .theui-fab-box.open .theui-fab-items.fab-horizontal{
    @apply translate-x-0;
  }
</style>