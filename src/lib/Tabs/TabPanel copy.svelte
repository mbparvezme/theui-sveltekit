<script lang="ts">
	import { getContext, type Snippet } from "svelte"
	import { twMerge } from "tailwind-merge"
	import { fade } from "svelte/transition"
	import { selectedPanel } from "$lib/state.svelte"
	import { generateToken } from "$lib/functions"

  let {children, ...props} : {children : Snippet, [key: string] : unknown} = $props()
	const { registerPanel, config } = getContext("TAB") as any
  const id: string = generateToken()
	registerPanel(id)
</script>

{#if selectedPanel.value === id}
	{#if config.animate}
		<div class="theui-tab-panel {twMerge(config.tabPanelClasses, props?.class as string)}" in:fade={{duration:150}}>
      {@render children?.()}
    </div>
	{:else}
		<div class="theui-tab-panel {twMerge(config.tabPanelClasses, props?.class as string)}">
      {@render children?.()}
    </div>
	{/if}
{/if}
