<script context="module">
	export const TABLE = {}
</script>

<script lang="ts">
  import type { ANIMATE_SPEED, TABLE_ROW, TABLE_CONFIG } from "$lib/types"
	import { setContext } from "svelte"
  import { generateToken } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  import { THead, TBody } from "$lib"

  export let id : string = generateToken()
  export let headers : string[]|undefined = undefined
  export let data : TABLE_ROW	= undefined
  export let keys : string[]|undefined = undefined
  export let animate: ANIMATE_SPEED = "normal"
  export let border: 'x' | 'y' | 'both' | 'none' = "both"
  export let borderColor: string = "border-gray-200/80 dark:border-gray-800/80"
  export let hover: boolean | string = false
  export let space: 'compact' | 'default' | 'comfortable' | string = "default"
  export let stripe: boolean | string = false
  export let containerClass: string = ""
  export let trClass: string = ""
  
  let config: TABLE_CONFIG = {
    animate,
    border,
    borderColor,
    hover,
    space,
    stripe,
    containerClass,
    trClass,
  }

  setContext(TABLE, {config})
  let getCls = () => twMerge(("theui-table w-full text-left border-collapse " + (border=="x" ? "border-x " + borderColor : "")), $$props?.class)
</script>

<div class={twMerge("table-container w-full overflow-x-auto", containerClass)}>
  <table {...$$restProps} {id} class={getCls()}>
    {#if !headers && !data}
      <slot />
    {/if}
    {#if headers}
      <THead {headers} {keys}/>
    {/if}
    {#if data}
      <TBody {data} {keys}/>
    {/if}
  </table>
</div>
