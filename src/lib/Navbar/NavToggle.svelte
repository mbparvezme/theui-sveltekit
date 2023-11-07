<script lang="ts">
  import { getContext } from "svelte"
  import { NAV, Svg } from "$lib"
  import { twMerge } from "tailwind-merge"
  const { config, id, mobileNav } = getContext(NAV)

  let toggle = () => {
    if ($mobileNav.includes(id)) {
      let D = $mobileNav.filter((i: any) => i !== id)
			mobileNav.update(() => D)
    }else{
      mobileNav.update((d: any)=> [...d, id])
    }
  }
  let getClass = () => "nav-toggle border border-gray-200 rounded-md w-12 h-12 flex items-center justify-center " + (config.mobileNavOn == "sm" ? "md:hidden" : config.mobileNavOn == "md" ? "lg:hidden" : config.mobileNavOn == "lg" ? "xl:hidden" : config.mobileNavOn == "xl" ? "2xl:hidden" : "hidden")
</script>

{#if config.mobileNavOn !== false}
<button on:click={()=>toggle()} class={twMerge(getClass(), $$props?.class)} aria-label="Toggle nav bar">
  <slot name="menuIcon">
    <Svg size={1.25}>
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </Svg>
  </slot>
</button>
{/if}