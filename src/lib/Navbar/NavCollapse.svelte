<script lang="ts">
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"
  import { NAV } from "$lib"
  const { config, id, mobileNav } = getContext(NAV)

  let commonCls = "navbar-collapse flex-grow z-[1]"
  let nonResCls = "flex-row items-center relative overflow-visible"
  let resCls =  "flex-col basis-full absolute left-0 right-0 top-full order-last lg:order-none shadow-lg px-8 py-4 " + 
                (config.mobileNavOn == "xl"   ?
                  "xl-collapse 2xl:flex-row 2xl:items-center 2xl:basis-auto 2xl:static 2xl:left-auto 2xl:right-auto 2xl:top-auto 2xl:flex 2xl:overflow-visible 2xl:shadow-none 2xl:px-0 2xl:py-0 2xl:bg-transparent " :
                config.mobileNavOn == "md"   ?
                  "md-collapse lg:flex-row lg:items-center lg:basis-auto lg:static lg:left-auto lg:right-auto lg:top-auto lg:flex lg:overflow-visible lg:shadow-none lg:py-0 lg:bg-transparent lg:px-0 " :
                config.mobileNavOn == "lg"   ?
                  "lg-collapse xl:flex-row xl:items-center xl:basis-auto xl:static xl:left-auto xl:right-auto xl:top-auto xl:flex xl:overflow-visible xl:shadow-none xl:px-0 xl:py-0 xl:bg-transparent " : "")

    let getClass = () => (commonCls + " " + twMerge(("max-h-[80vh] bg-primary" + getRounded(config?.rounded, "bottom")), $$props?.class) + " " + (config.mobileNavOn != false ? resCls : nonResCls))
</script>

<div
    class={getClass()}
    class:flex={!config.mobileNavOn == false || $mobileNav.includes(id)}
    class:hidden={config.mobileNavOn != false && !$mobileNav.includes(id)}
    class:overflow-hidden={config.mobileNavOn != false && !$mobileNav.includes(id)}
    class:overflow-auto={config.mobileNavOn != false && $mobileNav.includes(id)}>
  <slot />
</div>
