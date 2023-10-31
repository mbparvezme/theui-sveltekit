<script context="module">
	export const TABS = {}
</script>

<script lang="ts">
	import type { ANIMATE_SPEED, TAB_CONFIG } from "$lib/types"
	import { setContext, onDestroy } from "svelte"
	import { writable } from "svelte/store"
  	import { generateToken } from "$lib/functions"
    import { twMerge } from "tailwind-merge"

	export let id : string = generateToken()
	export let variant : 'tabs' | 'pills' = "tabs"
	export let animate : ANIMATE_SPEED = "normal"
	export let activeTabClass : object | string = (variant==="pills" ? "bg-brand text-white" : "border-0 border-b-2 border-brand text-brand bg-primary")
	export let tabClass : object | string = (variant==="pills" ? "bg-secondary hover:bg-brand" : "border-0 border-b-2 border-secondary bg-primary")

	let config: TAB_CONFIG = {
		animate,
		activeTabClass,
		tabClass
	}

	const tabs: any = []
	const panels: any = []
	const selectedTab = writable(null)
	const selectedPanel = writable(null)

	setContext(TABS, {
		registerTab: (tab:any) => {
			tabs.push(tab)
			selectedTab.update(current => current || tab)
			onDestroy(() => {
				const i = tabs.indexOf(tab)
				tabs.splice(i, 1)
				selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current)
			})
		},
		registerPanel: (panel:any) => {
			panels.push(panel)
			selectedPanel.update(current => current || panel)
			onDestroy(() => {
				const i = panels.indexOf(panel)
				panels.splice(i, 1)
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current)
			})
		},
		selectTab: (tab:any) => {
			const i = tabs.indexOf(tab)
			selectedTab.set(tab)
			selectedPanel.set(panels[i])
		},
		selectedTab,
		selectedPanel,
		config,
		variant,
	})
</script>

<div {id} class="theui-tabs {twMerge("", $$props.class)}">
	<slot></slot>
</div>