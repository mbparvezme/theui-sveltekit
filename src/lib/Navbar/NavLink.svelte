<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, roundedClass } from "$lib/functions"

  interface Props {children?: Snippet, text?: string, href?: string|null, active?: string|boolean, [key: string]: unknown}
  let {children, text, href = null, active = false, ...props}: Props = $props()

  const { config, id, mobileNav } = getContext('NAV') as any

  let linkCls = `nav-link flex items-center ${twMerge((active ? config.activeLinkStyle : config.linkStyle), props.class as string)}${roundedClass(config?.rounded)}${animationClass(config?.animate)}`

  let closeMobileNav = () => {
    if ($mobileNav.includes(id)) {
      let D = $mobileNav.filter((i:any) => i !== id)
			mobileNav.update(() => D)
    }
  }
</script>

{#snippet content()}
  {#if text}
    {@html text}
  {:else if children}
    {@render children()}
  {/if}
{/snippet}

{#if href}
  <a {href} class={linkCls} onclick={()=>closeMobileNav()}>{@render content()}</a>
{:else}
  <span class="cursor-pointer {linkCls}">{@render content()}</span>
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