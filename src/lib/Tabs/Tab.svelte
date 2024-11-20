<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, generateToken, roundedClass } from "$lib/functions"
	import { ST_TABS } from "$lib/state.svelte"

  let {children, ...props} : {children : Snippet, [key: string] : unknown} = $props()
  const CTX = getContext('TAB') as any
  const id: string = generateToken()
  ST_TABS.tabs.push(id)

  let selectTabL = (tab: string) => {
    const i = ST_TABS.tabs.indexOf(tab)
    ST_TABS.selectedTab = tab
    ST_TABS.selectedPanel = ST_TABS.panels[i]
  }

  let getClass = $derived(`${(CTX.variant == "pills" ? "theui-tab-pill" : "theui-tab")} px-8 py-3 text-center font-medium ${(ST_TABS.selectedTab == id ? CTX?.activeTabClasses : CTX?.tabClasses)} ${roundedClass("md", (CTX.variant == "tabs" ? "top" : (CTX.borderClasses ? "top" : "all")))} ${animationClass(CTX.animate)}`)
</script>

<button class={twMerge(getClass, props?.class as string)} class:theui-tab-selected={ST_TABS.selectedTab === id} onclick={() => selectTabL(id)}>
  {@render children?.()}
</button>