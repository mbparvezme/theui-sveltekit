<script lang="ts">
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"
  import { NAV } from "$lib"
  const { config, id, mobileNav } = getContext(NAV)

  let commonCls = "navbar-collapse flex-grow z-[1]" + getRounded(config?.rounded, "bottom")
  let defaultCls = twMerge("max-h-[80vh] bg-primary", $$props.class)
  let nonResCls = "flex-row items-center relative overflow-visible"
  let resCls = "flex-col basis-full absolute left-0 right-0 top-full order-last lg:order-none shadow-lg px-8 py-4 "
  
  resCls += config.responsive == "xl"   ?
              "xl-collapse xl:flex-row xl:items-center xl:basis-auto xl:static xl:left-auto xl:right-auto xl:top-auto xl:flex xl:overflow-visible xl:shadow-none xl:px-0 xl:py-0 xl:bg-transparent " :
            config.responsive == "md"   ?
              "md-collapse md:flex-row md:items-center md:basis-auto md:static md:left-auto md:right-auto md:top-auto md:flex md:overflow-visible md:shadow-none xl:px-0 md:py-0 md:bg-transparent " :
            config.responsive == "lg"   ?
              "lg-collapse lg:flex-row lg:items-center lg:basis-auto lg:static lg:left-auto lg:right-auto lg:top-auto lg:flex lg:overflow-visible lg:shadow-none xl:px-0 lg:py-0 lg:bg-transparent " : ""
</script>

<div
    class={commonCls + " " + defaultCls + " " + (config.responsive != false ? resCls : nonResCls)}
    class:flex={config.responsive == false || $mobileNav.includes(id)}
    class:hidden={config.responsive != false && !$mobileNav.includes(id)}
    class:overflow-hidden={config.responsive != false && !$mobileNav.includes(id)}
    class:overflow-auto={config.responsive != false && $mobileNav.includes(id)}>
  <slot />
</div>
