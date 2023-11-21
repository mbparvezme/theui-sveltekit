<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getInputContainerClass, getInputBoxClass, getFormControlStyle } from "$lib/functions"
  import { FORM, Label, HelperText } from "$lib"
  const ctx: any = getContext( FORM || {} )

  // Input attributes
  export let id     : string = generateToken()
  export let name   : string
  export let value  : any = ""
  export let type   : string = "text"
  export let helperText : string | undefined = undefined
  export let label  : string|undefined = undefined
  
  export let config : INPUT_CONFIG = {}
  let C:INPUT_CONFIG = {animate: false, inputGrow: true, labelStyle: "", reset: false, rounded : "md", size: "md", variant: "bordered"}
  Object.assign(C, ctx?.formConfig || {}, config)
  let setType = (node: HTMLInputElement) => node.type = type
</script>

<div class={getInputContainerClass(C)}>
  {#if $$slots.label}
    <slot name="label"/>
  {:else if label}
    <Label style={C.labelStyle} {id} {label}/>
  {/if}

  <div class={getInputBoxClass(C, $$restProps)}>
    <slot name="left" class={$$props?.class}/>
    <input {...$$restProps} {id} {name} class={getFormControlStyle(C, $$restProps, $$props?.class, "input", $$slots)}
      bind:value
      use:setType
      on:blur
      on:change
      on:click
      on:focus
      on:keydown
      on:keypress
      on:keyup
      on:mouseover
      on:mouseenter
      on:mouseleave
      on:paste
    />
    <slot name="right" class={$$props?.class}/>
  </div>

  {#if $$slots.helperText}
    <slot name="helperText"/>
  {:else if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>

<style lang="postcss">
  :global(input){
    @apply outline-transparent ring-transparent bg-transparent w-full block;
  }
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
</style>
