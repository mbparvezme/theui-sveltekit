<script lang="ts">
  import type { ROUNDED } from "$lib/types"
	import type { Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { roundedClass } from "$lib/function"
	import { Close } from "$lib"

  interface Props {
    children?: Snippet,
    content?: string,
    close?: boolean,
    fill?: boolean,
    imgUrl?: string | undefined,
    imgClasses?: string,
    imgAlt?: string,
    rounded?: ROUNDED,
    size?: 'sm' | 'md' | 'lg',
    [key: string]: unknown // dismissible, icon
  }

  let {
    children,
    content,
    close  = true,
    fill   = true,
    imgUrl = undefined,
    imgClasses = "",
    imgAlt = "",
    rounded  = "full",
    size   = "md",
    ...props
  } : Props = $props();

	let nodeRef: HTMLSpanElement

  let chipsClasses = [
    "flex items-center w-max gap-4 cursor-pointer pe-4",
    fill ? "text-gray-500 bg-brand-primary-50 font-semibold text-sm" : "border border-gray-100",
    roundedClass(rounded)
  ].join(" ");

  let chipsImgClass = twMerge([
    "max-w-none", size === "sm" ? "w-9 h-9" : size === "lg" ? "w-14 h-14" : "w-11 h-11", roundedClass(rounded)
  ].join(" "), imgClasses);

  const hideChips = () => nodeRef.parentNode?.removeChild(nodeRef)
</script>

<span class={"theui-chips " + twMerge(chipsClasses, (props?.class ?? "") as string)} class:ps-4={!imgUrl} class:py-2={!imgUrl} bind:this={nodeRef}>
  {#if imgUrl}<img class={chipsImgClass} alt={imgAlt} src={imgUrl}>{/if}

	{#if content}
		{@html content}
	{:else if children}
		{@render children()}
	{/if}

  {#if close}
    <Close ariaLabel="Hide chips" size={1} onclick={hideChips} />
  {/if}
</span>