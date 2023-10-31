<script lang="ts">
  import { TD } from "$lib"

  export let data : object|Array<string|number>|undefined = undefined
  export let keys : string[]|null = null
</script>

<TD {data} {keys} tag="th" {...$$restProps}>
  {#if !data}
    <slot />
  {/if}
</TD>