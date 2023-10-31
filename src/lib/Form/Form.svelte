<script context="module">
	export const FORM = {}
</script>

<script lang="ts">
	import { setContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { generateToken } from "$lib/functions"
  
  // Input attributes
  export let id : string = generateToken()
  export let inputGrow : boolean = true
  export let reset : boolean = false
  export let size : 'none' | 'sm' | 'md' | 'lg' | 'xl' = "md"
  export let variant : 'filled' | 'bordered' | 'flat' = "bordered"
  export let labelStyle  : string|undefined = undefined

  setContext(FORM, {formConfig: {variant, inputGrow, size, labelStyle, reset}, formID: id})
</script>

<form method="POST" {...$$restProps} class={twMerge("flex flex-col gap-4", $$props.class)} on:submit>
  <slot/>
</form>