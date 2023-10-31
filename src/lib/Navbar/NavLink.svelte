<script lang="ts">
  import type {PRELOAD} from "$lib/types"
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { getAnimate, getRounded } from "$lib/functions"
  import { NAV } from "$lib"
  const { config, id, mobileNav } = getContext(NAV)

  export let href     : string|null = null
  export let preload  : PRELOAD = "hover"
  export let active   : string|boolean = false

  let linkCls = "nav-link flex items-center " + twMerge((active ? config.activeLinkStyle : config.linkStyle), $$props.class) + getRounded(config?.rounded) + getAnimate(config?.animate)

  let closeMobileNav = () => {
    if ($mobileNav.includes(id)) {
      let D = $mobileNav.filter((i:any) => i !== id)
			// mobileNav.update(d => D)
			mobileNav.update(() => D)
    }
  }

</script>

{#if href}
  <a {href} class={linkCls} data-sveltekit-preload-data={preload} on:click={()=>closeMobileNav()}><slot/></a>
{:else}
  <span class="cursor-pointer {linkCls}"><slot/></span>
{/if}

<style lang="postcss">
  :global(.navbar-collapse .nav-link:not(.nav-dropdown-btn)){
    @apply hover:bg-secondary;
  }
  :global(.navbar-collapse.xl-collapse .nav-links > .nav-link){
    @apply xl:hover:bg-transparent;
  }
  :global(.navbar-collapse.lg-collapse .nav-links > .nav-link){
    @apply lg:hover:bg-transparent;
  }
  :global(.navbar-collapse.md-collapse .nav-links > .nav-link){
    @apply md:hover:bg-transparent;
  }
</style>