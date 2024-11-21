<script lang="ts">
	import type { Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  let {children, title, ...props} : {children : Snippet, title ?: string, [key: string] : unknown} = $props()
</script>

<fieldset class={twMerge("", props.class as string)}>
	<legend class="sr-only">{title}</legend>
  {@render children?.()}
</fieldset>