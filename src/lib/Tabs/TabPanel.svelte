<script lang="ts">
  import type { TABS_CONTEXT } from "$lib/types"
	import { getContext } from "svelte"
	import { twMerge } from "tailwind-merge"
	import { TABS } from "$lib"
	import { fade } from "svelte/transition"

	const panel: any = {}
	const { registerPanel, selectedPanel, config } = getContext<TABS_CONTEXT>(TABS)
	registerPanel(panel)
</script>

{#if $selectedPanel === panel}
	{#if config.animate}
		<div class="theui-tab-panel {twMerge("", config.tabPanelClasses, $$props.class)}" in:fade={{duration:150}}><slot></slot></div>
	{:else}
		<div class="theui-tab-panel {twMerge("", config.tabPanelClasses, $$props.class)}"><slot></slot></div>
	{/if}
{/if}

