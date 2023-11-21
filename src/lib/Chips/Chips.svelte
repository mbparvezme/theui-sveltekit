<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"
	import { Close } from "$lib"

  export let close  : boolean = true
  export let fill   : boolean = true
  export let imgUrl : string | undefined = undefined
  export let imgClass : string = ""
  export let imgAlt : string = ""
  export let round  : ROUNDED = "full"
  export let size   : 'sm' | 'md' | 'lg' = "md"
  export let text   : string = ""

	let nodeRef: HTMLSpanElement
  let getClasses  = () => "flex items-center w-max gap-4 cursor-pointer pr-4 " + (fill ? "text-gray-500 bg-tertiary font-semibold text-sm" : "border border-gray-100") + getRounded(round)
  let getImgClass = () => twMerge(("max-w-none " + (size == "sm" ? "w-9 h-9" : size == "lg" ? "w-14 h-14" : "w-11 h-11") + getRounded(round)), imgClass)
  const hideChips = () => nodeRef.parentNode?.removeChild(nodeRef)
</script>

<span class={"theui-chips " + twMerge(getClasses(), $$props?.class)} class:pl-4={!imgUrl} class:py-2={!imgUrl} bind:this={nodeRef}>
  {#if imgUrl}<img class={getImgClass()} alt={imgAlt} src={imgUrl}>{/if}

  <slot>{@html text}</slot>

  {#if close}
    <Close ariaLabel="Hide chips" on:click={hideChips} />
  {/if}
</span>
