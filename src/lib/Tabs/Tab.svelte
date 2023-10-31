<script lang="ts">
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { TABS } from "$lib"
  import { getRounded, getShadow } from "$lib/functions"

  const tab = {}
  const { registerTab, selectTab, selectedTab, config, variant } = getContext(TABS)
  registerTab(tab)

  let getClass = (active: boolean) => {
    let cls = " px-8 py-3 text-center focus-within:outline-none font-medium " + (variant == "pills" ? " tab-pill " : " ")
    cls +=  active ? (config?.activeTabClass[variant]||config?.activeTabClass) : (config?.tabClass[variant]||config?.tabClass)
    cls +=  getShadow(config?.shadow||"lg") + getRounded(config?.rounded||"md", (variant == "tabs" ? "top" : "all"))
    return cls
  }
</script>

<button class="tab {twMerge(getClass($selectedTab === tab), $$props?.class)}" class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot/>
</button>