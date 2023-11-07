<script lang="ts">
  import { getContext } from "svelte"
  import { NAV } from "$lib"
  import { twMerge } from "tailwind-merge"
  const { config } = getContext(NAV)

  export let align: 'left' | 'right' | 'center' = "left"

  let classes =   "flex-col " + (config.mobileNavOn == "sm" ? "md:flex-row " : config.mobileNavOn == "md" ? "lg:flex-row " : config.mobileNavOn == "lg" ? "xl:flex-row " : config.mobileNavOn ==  "xl" ? "2xl:flex-row " : "flex-row ") +
                  (align == "right" ?
                    (config.mobileNavOn == "sm" ? "md:ml-auto" : config.mobileNavOn == "md" ? "lg:ml-auto" : config.mobileNavOn == "lg" ? "xl:ml-auto" : config.mobileNavOn == "xl" ? "2xl:ml-auto" : "") :
                  align == "center" ?
                    (config.mobileNavOn == "sm" ? "md:mx-auto" : config.mobileNavOn == "md" ? "lg:mx-auto" : config.mobileNavOn == "lg" ? "xl:mx-auto" : config.mobileNavOn == "xl" ? "2xl:mx-auto" : "") :
                  (config.mobileNavOn == "sm" ? "md:mr-auto" : config.mobileNavOn == "md" ? "lg:mr-auto" : config.mobileNavOn == "lg" ? "xl:mr-auto" : config.mobileNavOn == "xl" ? "2xl:mr-auto" : ""))
</script>

<div class="nav-links flex {twMerge((config.mobileNavOn !== false ? classes : "items-center flex-row"), $$props?.class)}">
  <slot />
</div>