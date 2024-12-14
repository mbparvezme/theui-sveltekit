<script lang="ts">
	import type { Snippet } from "svelte"
	import type { ROUNDED, ROUNDED_SIDES, SHADOW } from "$lib/types"
	import { roundedClass, shadowClass } from "$lib/function"
	import { twMerge } from "tailwind-merge"

  interface Props {
    children?: Snippet,
    title?: Snippet | string,
    rounded?: ROUNDED,
    shadow?: SHADOW,
    topImage?: Snippet | {class?: string, src?: string, alt?: string, [key: string]: unknown}
    bottomImage?: Snippet | {class?: string, src?: string, alt?: string, [key: string]: unknown}
    contentClasses?: string,
    titleClasses?: string,
    horizontal?: boolean,
    [key: string]: unknown
  }

  let {
    children,
    title,
    rounded = "md",
    topImage,
    shadow = "md",
    bottomImage,
    contentClasses = "",
    titleClasses = "",
    horizontal,
    ...props
  }: Props = $props()

  let cardContainerClasses = `${!horizontal?"flex-col":""}${roundedClass(rounded)}${shadowClass(shadow)}`;
  let imgClasses = (side: ROUNDED_SIDES) => `block w-full ${horizontal?"max-w-[30%]":""}${roundedClass(rounded, side)}`
</script>

<div class="card {twMerge("flex bg-primary", props?.class as string)} {cardContainerClasses}">

  {#if topImage}
    {#if typeof topImage === "function"}
      {@render topImage?.()}
    {:else if topImage.src}
      <img class={twMerge(imgClasses(horizontal?"start":"top"), topImage?.class as string)} src={topImage?.src} alt={topImage?.alt}>
    {/if}
  {/if}

  {#if children || title}
  <div class="card-content {twMerge("flex flex-col gap-2 p-4", contentClasses)}">
    {#if title}
      {#if typeof title === "string"}
        <h4 class={twMerge("text-xl font-semibold", titleClasses)}>{@html title}</h4>
      {:else}
        {@render title?.()}
      {/if}
    {/if}

    {@render children?.()}
  </div>
  {/if}

  {#if bottomImage}
    {#if typeof bottomImage === "function"}
      {@render bottomImage?.()}
    {:else if bottomImage.src}
      <img class={twMerge(imgClasses(horizontal?"end":"bottom"), bottomImage?.class as string)} src={bottomImage?.src} alt={bottomImage?.alt}>
    {/if}
  {/if}

</div>