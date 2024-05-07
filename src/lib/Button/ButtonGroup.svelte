<script context="module">
	export const BUTTON_GROUP = {}
</script>

<script lang="ts">
  import type { BUTTON_SIZE, ROUNDED } from "$lib/types"
  import { setContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"

  export let label    : string = "Button group"
  export let round    : ROUNDED = "md"
  export let size     : BUTTON_SIZE = "md"
  export let stacked  : boolean = false
  export let outline  : boolean = false
  export let btnClass : string = "border border-black/10"
  export let variant  : 'bordered' | 'flat' = "bordered"

  setContext(BUTTON_GROUP, {group: true, stacked, variant, btnClass, outline, size})
</script>

<div class={twMerge(("theui-btn-group inline-flex" + getRounded(round)), $$props?.class)} class:flex-col={stacked} class:theui-btn-stacked={stacked} role="group" aria-label={label}>
  <slot {size}></slot>
</div>