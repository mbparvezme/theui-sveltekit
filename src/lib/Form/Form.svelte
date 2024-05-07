<script context="module" lang="ts">
	export const FORM_CTX: INPUT_CONFIG = {size: "md", variant: "bordered"}
</script>

<script lang="ts">
  import type { INPUT_CONFIG, INPUT_VARIANT } from "$lib/types";
	import { setContext } from "svelte"
  import { twMerge } from "tailwind-merge"

  // Form prop
  export let method : 'GET' | 'POST' = "POST"
  // Input props (Context)
  export let animate: INPUT_CONFIG["animate"] = "normal"
  export let inputGrow : boolean = true
  export let labelClasses  : string|undefined = undefined
  export let inputReset : boolean = false
  export let rounded: INPUT_CONFIG["rounded"] = "md"
  export let inputSize : 'none' | 'sm' | 'md' | 'lg' | 'xl' = "md"
  export let inputVariant : INPUT_VARIANT = "bordered"

  setContext(FORM_CTX, {formConfig: {animate, size: inputSize, labelClasses, reset: inputReset, rounded, variant: inputVariant, grow: inputGrow}})
</script>

<form {method} {...$$restProps} class={twMerge("flex flex-col gap-4", $$props?.class)} on:submit on:reset on:change on:input>
  <slot/>
</form>