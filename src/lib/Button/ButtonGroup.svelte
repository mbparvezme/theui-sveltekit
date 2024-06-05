<script context="module">
	export const BUTTON_GROUP = {};
</script>

<script lang="ts">
  import type { BUTTON_SIZE, ROUNDED } from "$lib/types";
  import { setContext } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { getRounded } from "$lib/functions";

  export let label    : string = "Button group";
  export let round    : ROUNDED = "md";
  export let size     : BUTTON_SIZE = "md";
  export let btnClass : string = "border border-black/10";
  export let variant  : 'elevated' | 'filled' | 'filledLight' | 'outline' | 'text' = "filled";

  let ctx = {group: true, stacked: $$props?.stacked, variant, btnClass, size, round};
  setContext(BUTTON_GROUP, ctx);
</script>

<div class={twMerge(`theui-btn-group inline-flex ${getRounded(round)}`, $$props?.class)} class:flex-col={ctx.stacked} class:theui-btn-stacked={ctx.stacked} role="group" aria-label={label}>
  <slot {size}></slot>
</div>