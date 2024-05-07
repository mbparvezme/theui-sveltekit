<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions"
  import { FORM_CTX, Label, HelperText } from "$lib"

  // Slot: disabled, readonly, custom, reverse, override, reset

  // Input attributes
  export let name : string
  export let helperText : string | undefined = undefined
  export let id : string = generateToken()
  export let label : string | undefined = undefined
  export let value : any = ""

  export let animate: INPUT_CONFIG["animate"] = "normal"
  export let labelClasses: INPUT_CONFIG["labelClasses"] = ""
  export let rounded: INPUT_CONFIG["rounded"] = "md"
  export let size: INPUT_CONFIG["size"] = "md"
  export let variant: INPUT_CONFIG["variant"] = "bordered"

  const ctx: any = getContext(FORM_CTX || {})
  let C:INPUT_CONFIG = {animate, labelClasses, rounded, size, variant, grow: !!$$restProps?.grow, reset: !!$$restProps?.reset}
  if(!$$restProps?.override) Object.assign(C, ctx?.formConfig)
</script>

<div class={getInputBoxClasses(C, $$restProps)}>
  {#if label}
    <Label {id} {label}/>
  {/if}

  <textarea {...$$restProps} {id} {name} class={getInputClasses(C, $$restProps, "input", $$props?.class)}
    bind:value
    on:blur
    on:change
    on:click
    on:contextmenu
    on:dblclick
    on:focus
    on:input
    on:invalid
    on:keydown
    on:keypress
    on:keyup
    on:mousedown
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:mouseout
    on:mouseover
    on:mouseup
    on:paste
  ></textarea>

  {#if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>

<!-- <style lang="postcss">
  :global(.textarea-box [slot=left], .textarea-box [slot=right]){
    @apply flex items-center justify-center z-[-1] text-gray-500 bg-gray-100;
  }
  :global(.input-sm .textarea-box [slot=left], .input-sm .textarea-box [slot=right]){
    @apply px-2;
  }
  :global(.input-md .textarea-box [slot=left], .input-md .textarea-box [slot=right]){
    @apply px-3;
  }
  :global(.input-lg .textarea-box [slot=left], .input-lg .textarea-box [slot=right]){
    @apply px-4;
  }
  :global(.input-xl .textarea-box [slot=left], .input-xl .textarea-box [slot=right]){
    @apply px-5;
  }
</style> -->

<!--
@component
[Go to docs](https://www.theui.dev/r/skcl)
## Props
@prop export let config : INPUT_CONFIG = {}
  export let helperText : string | undefined = undefined
  export let id     : string = generateToken()
  export let label  : string|undefined = undefined
  export let name   : string
  export let value  : any = ""
-->
