<script lang="ts">
  import { getContext } from "svelte"
  import { NAV, Button, Svg } from "$lib"
  import { twMerge } from "tailwind-merge";
  const { config, id, mobileNav } = getContext(NAV)

  let toggle = () => {
    if ($mobileNav.includes(id)) {
      let D = $mobileNav.filter((i: any) => i !== id)
			mobileNav.update(() => D)
    }else{
      mobileNav.update((d: any)=> [...d, id])
    }
  }
</script>

{#if config.responsive !== false}
<Button on:click={()=>toggle()} class="nav-toggle {twMerge("bg-transparent", $$props.class)} {config.responsive == "xl" ? "xl:hidden" : config.responsive == "md" ? "md:hidden" : config.responsive == "lg" ? "lg:hidden" : "hidden"}" ariaLabel="Toggle nav bar" label="">
  <slot name="menuIcon" slot="label">
    <Svg size={1.75} fill="none" viewBox="0 0 24 24" stroke-width="2" class=" stroke-gray-700 dark:stroke-gray-300">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </Svg>
  </slot>
</Button>
{/if}