<script lang="ts">
  import { twMerge } from "tailwind-merge"
  import {TR} from "$lib"
	import type { Snippet } from "svelte"

  interface Props{children?: Snippet, headers?: string[]|Record<string, unknown>, keys?: string[], [key: string]: unknown}
  let {children, headers, keys, ...props} : Props = $props()
</script>

{#if headers}
<thead {...props} class={twMerge('bg-gray-300 dark:bg-gray-700 text-left uppercase font-bold', props?.class as string)}>
  {#if headers}
    <TR data={headers} {keys} tableHeader={true} />
  {:else if children}
    {@render children()}
  {/if}
</thead>
{/if}