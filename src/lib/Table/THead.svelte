<script lang="ts">
	import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge"
  import {TR} from "$lib"

  interface Props{headers?: Snippet|string[]|Record<string, unknown>, keys?: string[], [key: string]: unknown}
  let{headers, keys, ...props} : Props = $props()
</script>

{#if headers}
<thead {...props} class={twMerge('bg-gray-300 dark:bg-gray-700 text-left uppercase font-bold', props?.class as string)}>
  {#if typeof headers === "function"}
    {@render headers?.()}
  {:else}
    <TR data={headers} {keys} tableHeader={true} />
  {/if}
</thead>
{/if}