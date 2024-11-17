<script lang="ts">
	import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge"
  import {TR} from "$lib"

  interface Props{
    headers ?: Snippet|ArrayLike<string|object>,
    keys ?: string[]|undefined,
  }

  let{
    headers,
    keys = undefined,
  } : Props = $props()
</script>

<thead>
  {#if typeof headers === "function"}
    {@render headers?.()}
  {:else}
    {#if headers}
      <TR data={headers} headingRow={true} />
    {/if}
{/if}
</thead>

<!-- 
<thead class={twMerge('bg-gray-100 dark:bg-gray-800 text-left uppercase', "")}>
  {#if headers}
    <TR data={headers} {keys} headingRow={true} />
  {/if}
</thead> -->