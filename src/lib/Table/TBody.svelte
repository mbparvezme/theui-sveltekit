<script lang="ts">
  import type { TABLE_ROW } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { TR } from "$lib"

  export let data : TABLE_ROW	= undefined
  export let keys : string[]|undefined = undefined
</script>

<tbody {...$$restProps} class={twMerge("text-left", $$props.class)}>
  {#if data}
    <TR {data} {keys}/>
  {:else}
    <slot/>
  {/if}
</tbody>