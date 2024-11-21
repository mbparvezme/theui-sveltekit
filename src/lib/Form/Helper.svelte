<script lang="ts">
	import type { Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  let {children, text, ...props} : {children : Snippet, text ?: string, [key: string] : unknown} = $props()
</script>

<p {...props} class={twMerge("text-xs text-gray-500 dark:text-gray-700", props?.class as string)}>
  {#if text} {@html text} {/if}
</p>