<script lang="ts">
	import type { Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  let {children, text, ...props} : {text ?: string|Snippet, [key: string] : unknown} = $props()
</script>

<p {...props} class={twMerge("text-sm text-gray-500 dark:text-gray-700", props?.class as string)}>
  {#if text}
    {#if typeof text == "string"}
      {@html text}
    {/if}
    {#if typeof text == "function"}
      {@render text?.()}
    {/if}
  {/if}
</p>