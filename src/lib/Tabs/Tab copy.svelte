<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, generateToken, roundedClass } from "$lib/functions"
	import { selectedTab } from "$lib/state.svelte"

  let {children, ...props} : {children : Snippet, [key: string] : unknown} = $props()
  const { registerTab, selectTab, config } = getContext('TAB') as any

  const id: string = generateToken()
  registerTab(id)

  let getClass = $derived(`${(config.variant == "pills" ? "theui-tab-pill" : "theui-tab")} px-8 py-3 text-center font-medium ${(selectedTab.value == id ? config?.activeTabClasses : config?.tabClasses)} ${roundedClass("md", (config.variant == "tabs" ? "top" : (config.borderClasses ? "top" : "all")))} ${animationClass(config.animate)}`)
</script>

<button class={twMerge(getClass, props?.class as string)} class:theui-tab-selected={selectedTab.value === id} onclick={() => selectTab(id)}>
  {@render children?.()}
</button>