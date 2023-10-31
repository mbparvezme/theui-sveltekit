<script lang="ts">
  import { getContext } from "svelte"
  import { NAV } from "$lib"
  const { config } = getContext(NAV)
  export let align: 'left' | 'right' | 'center' = "left"

  let classes = config.responsive == "xl" ? "xl:flex-row" : config.responsive == "md" ? "md:flex-row " : "lg:flex-row "
      classes +=  (align == "right" ?
                    (config.responsive == "xl" ? "xl:ml-auto" : config.responsive == "md" ? "md:ml-auto" : "lg:ml-auto") :
                  align == "center" ?
                    (config.responsive == "xl" ? "xl:mx-auto" : config.responsive == "md" ? "md:mx-auto" : "lg:mx-auto") :
                    (config.responsive == "xl" ? "xl:mr-auto" : config.responsive == "md" ? "md:mr-auto" : "lg:mr-auto"))
</script>

<div class="nav-links flex {config.responsive!==false ? classes + " flex-col" : "items-center flex-row"} {$$props.class||""}">
  <slot />
</div>