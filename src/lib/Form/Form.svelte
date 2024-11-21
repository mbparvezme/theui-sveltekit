<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
	import { setContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  interface Props {
    children : Snippet,
    method : 'GET' | 'POST',
    onsubmit ?: any,
    onreset ?: any,
    onchange ?: any,
    oninput ?: any,
    [key: string] : unknown
  }

  let {
    children,
    method = "POST",
    animate = "normal",
    inputGrow = true,
    labelClasses = undefined,
    rounded = "md",
    inputSize = "md",
    inputVariant = "bordered",
    ...props
  } : Props & INPUT_CONFIG = $props()

  setContext('FORM', {animate, size: inputSize, labelClasses, rounded, variant: inputVariant, grow: inputGrow})
</script>

<form {...props} {method} class={twMerge("flex flex-col gap-4", props?.class as string)}>
  {@render children?.()}
</form>