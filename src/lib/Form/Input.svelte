<script lang="ts">
  import type { INPUT_CONFIG, INPUT_TYPE } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions"
  import { FORM_CTX, Label, HelperText } from "$lib"

  // Slot: disabled, readonly, custom, reverse, override, reset

  // Input attributes
  export let helperText : string | undefined = undefined
  export let id : string = generateToken()
  export let label : string | undefined = undefined
  export let name : string
  export let type : INPUT_TYPE = "text"
  export let value : any = ""

  export let animate: INPUT_CONFIG["animate"] = "normal"
  export let labelClasses: INPUT_CONFIG["labelClasses"] = ""
  export let rounded: INPUT_CONFIG["rounded"] = "md"
  export let size: INPUT_CONFIG["size"] = "md"
  export let variant: INPUT_CONFIG["variant"] = "bordered"

  const ctx: any = getContext(FORM_CTX || {})
  let C:INPUT_CONFIG = {animate, labelClasses, rounded, size, variant, grow: !!$$restProps?.grow, reset: !!$$restProps?.reset}
  if(!$$restProps?.override) Object.assign(C, ctx?.formConfig)
  let setType: any = (node: HTMLInputElement) => node.type = type
</script>

<div class={getInputBoxClasses(C, $$restProps)}>
  {#if label}
    <Label {id} {label}/>
  {/if}

  <input {...$$restProps} {id} {name} class={getInputClasses(C, $$restProps, "input", $$props?.class)}
    bind:value
    use:setType
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
    on:mousewheel
    on:paste
  />

  {#if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>

<!-- <style lang="postcss">
  :global(.input-box [slot=left], .input-box [slot=right]){
    @apply flex items-center justify-center z-[-1] text-gray-500 bg-gray-100;
  }
  :global(.input-sm .input-box [slot=left], .input-sm .input-box [slot=right]){
    @apply px-2;
  }
  :global(.input-md .input-box [slot=left], .input-md .input-box [slot=right]){
    @apply px-3;
  }
  :global(.input-lg .input-box [slot=left], .input-lg .input-box [slot=right]){
    @apply px-4;
  }
  :global(.input-xl .input-box [slot=left], .input-xl .input-box [slot=right]){
    @apply px-5;
  }
</style> -->

<!--
@component
[Go to docs](https://www.theui.dev/r/skcl)
## Props
@prop export let id     : string = generateToken()
  export let name   : string
  export let value  : any = ""
  export let type   : string = "text"
  export let helperText : string | undefined = undefined
  export let label  : string|undefined = undefined
  export let config : INPUT_CONFIG = {}
-->
