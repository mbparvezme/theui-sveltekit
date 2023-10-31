<script lang="ts">
	import { getContext } from "svelte"
	import { twMerge } from "tailwind-merge"
	import { TABS } from "$lib"
	import { fade } from "svelte/transition"

	const panel = {}
	const { registerPanel, selectedPanel, config } = getContext(TABS)
	registerPanel(panel)
</script>

{#if $selectedPanel === panel}
	{#if config.animate}
		<div class="tab-panel {twMerge("", $$props.class)}" in:fade={{duration:150}}><slot></slot></div>
	{:else}
		<div class="tab-panel {twMerge("", $$props.class)}"><slot></slot></div>
	{/if}
{/if}

