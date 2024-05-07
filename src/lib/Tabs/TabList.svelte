<script lang="ts">
  import type { TABS_CONTEXT } from "$lib/types"
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { TABS } from "$lib"
  const { config } = getContext<TABS_CONTEXT>(TABS)

  export let borderClasses: string = ""
</script>

<div class="theui-tab-list {twMerge((config.border ? "" : "mb-4") , $$props?.class)}">
	<slot></slot>
</div>

{#if config.border}
<div class="theui-tabs-border -mt-0.5 {twMerge("mb-4 border-b-2 border-gray-500/20", borderClasses)}"></div>
{/if}