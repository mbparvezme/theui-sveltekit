<script lang="ts">
  import type { TABS_CONTEXT } from "$lib/types"
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { TABS } from "$lib"
  import { getAnimate, getRounded } from "$lib/functions"

  const tab: any = {}
  const { registerTab, selectTab, selectedTab, config } = getContext<TABS_CONTEXT>(TABS)
  registerTab(tab)

  let baseClasses   = (config.variant == "pills" ? "theui-tab-pill " : "theui-tab ")
  let getClass = (active: boolean) => {
    let theUIClasses  = "px-8 py-3 text-center font-medium " + (active ? config?.activeTabClasses : config?.inactiveTabClasses)
    let roundType: any = (config.variant == "tabs" ? "top" : (config.border ? "top" : "all"))
    return twMerge(getAnimate(config.animate) + getRounded("md", roundType), theUIClasses)
  }
</script>

<button class="{baseClasses} {getClass($selectedTab === tab)}" class:theui-tab-selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot/>
</button>