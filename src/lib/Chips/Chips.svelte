<script lang="ts">
  import type { ROUNDED } from "$lib/types"
	import type { Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { roundedClass } from "$lib/function.core"
	import { Close } from "$lib"

  interface Props {
    content   ?: Snippet|string|undefined,
    close     ?: boolean,
    fill      ?: boolean,
    imgUrl    ?: string | undefined,
    imgClasses  ?: string,
    imgAlt    ?: string,
    round     ?: ROUNDED,
    size      ?: 'sm' | 'md' | 'lg',
    [key: string]: unknown // dismissible, icon
  }

  let {
    content   = "",
    close  = true,
    fill   = true,
    imgUrl = undefined,
    imgClasses = "",
    imgAlt = "",
    round  = "full",
    size   = "md",
    ...props
  } : Props = $props();

	let nodeRef: HTMLSpanElement

  let chipsClasses = [
    "flex items-center w-max gap-4 cursor-pointer pe-4",
    fill ? "text-gray-500 bg-brand-primary-50 font-semibold text-sm" : "border border-gray-100",
    roundedClass(round)
  ].join(" ");

  let chipsImgClass = twMerge([
    "max-w-none", size === "sm" ? "w-9 h-9" : size === "lg" ? "w-14 h-14" : "w-11 h-11", roundedClass(round)
  ].join(" "), imgClasses);

  const hideChips = () => nodeRef.parentNode?.removeChild(nodeRef)
</script>

<span class={"theui-chips " + twMerge(chipsClasses, (props?.class ?? "") as string)} class:ps-4={!imgUrl} class:py-2={!imgUrl} bind:this={nodeRef}>
  {#if imgUrl}<img class={chipsImgClass} alt={imgAlt} src={imgUrl}>{/if}

  {#if typeof content === "string"}
    {@html content}
  {:else}
    {@render content?.()}
  {/if}

  {#if close}
    <Close ariaLabel="Hide chips" size={1} onclick={hideChips} />
  {/if}
</span>