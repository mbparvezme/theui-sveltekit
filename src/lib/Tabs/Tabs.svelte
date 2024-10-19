<script context="module">
	export const TABS = {}
</script>

<script lang="ts">
	import type { ANIMATE_SPEED, TABS_CONTEXT, TAB_CONFIG, SHADOW } from "$lib/types"
	import { setContext, onDestroy } from "svelte"
	import { writable } from "svelte/store"
	import { generateToken } from "$lib/functions"
	import { twMerge } from "tailwind-merge"

	export let id : string = generateToken()
	export let border : boolean = true
	export let animate : ANIMATE_SPEED = "normal"
	export let activeTabClasses : string = ""
	export let inactiveTabClasses : string = ""
	export let tabPanelClasses: string = ""
	export let variant : 'tabs' | 'pills' = "pills"

	let activeTabClassesDefault = (variant==="pills" ? "bg-brand-primary-500 text-white" : "border-0 border-b-2 border-brand-primary-500 text-brand-primary-500")
	let inactiveTabClassesDefault = (variant==="pills" ? "hover:bg-brand-primary-500 hover:text-on-brand-primary-500" : "border-0 border-b-2 border-transparent")

	let config: TAB_CONFIG = {
		activeTabClasses : twMerge(activeTabClassesDefault, activeTabClasses),
		inactiveTabClasses : twMerge(inactiveTabClassesDefault, inactiveTabClasses),
		animate,
		border,
		tabPanelClasses,
		variant,
	}

	let tabs: Array<HTMLElement> = []
	let panels: Array<HTMLElement> = []
	let selectedTab = writable<HTMLElement>()
	let selectedPanel = writable<HTMLElement>()

	let ctx: TABS_CONTEXT = {
		registerTab: (tab: HTMLElement) => {
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
		config
	}

	setContext(TABS, ctx)
</script>

<div {id} class="theui-tabs -mb-0.5 {twMerge("", $$props.class)}">
	<slot></slot>
</div>