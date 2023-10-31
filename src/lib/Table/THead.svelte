<script lang="ts">
  import { twMerge } from "tailwind-merge"
  import {TR} from "$lib"

  export let headers : object|string[]|undefined = undefined
  export let keys : string[]|undefined = undefined
</script>

<thead {...$$restProps} class={twMerge('bg-gray-100 dark:bg-gray-800 text-left uppercase', $$props.class)}>
  {#if headers}
    <TR data={headers} {keys} headingRow={true} />
  {:else}
    <slot/>
  {/if}
</thead>