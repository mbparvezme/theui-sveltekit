<script lang="ts">
  import type { INPUT_CONFIG, INPUT_VARIANT } from "$lib/types"
	import { setContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  interface Props {
    children : Snippet,
    method : 'GET' | 'POST',
    animate: INPUT_CONFIG["animate"],
    inputGrow : boolean,
    labelClasses  : string|undefined,
    inputReset : boolean,
    rounded: INPUT_CONFIG["rounded"],
    inputSize : 'none' | 'sm' | 'md' | 'lg' | 'xl',
    inputVariant : INPUT_VARIANT,
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
    inputReset = false,
    rounded = "md",
    inputSize = "md",
    inputVariant = "bordered",
    onsubmit,
    onreset,
    onchange,
    oninput,
    ...props
  } : Props = $props()

  setContext('FORM', {animate, size: inputSize, labelClasses, reset: inputReset, rounded, variant: inputVariant, grow: inputGrow})
</script>

<form {...props} {method} class={twMerge("flex flex-col gap-4", props?.class as string)} {onsubmit} {onreset} {onchange} {oninput}>
  {@render children?.()}
</form>