<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getRounded, getInputContainerClass, getFormControlStyle } from "$lib/functions"
  import { FORM, Label, HelperText } from "$lib"
  const ctx: any = getContext( FORM || {} )

  // Input attributes
  export let config : INPUT_CONFIG = {}
  export let helperText : string | undefined = undefined
  export let id     : string = generateToken()
  export let label  : string|undefined = undefined
  export let name   : string
  export let value  : any = ""

  let C:INPUT_CONFIG = {animate: false, inputGrow: true, labelStyle: "", reset: false, rounded : "md", size: "md", variant: "bordered"}
  Object.assign(C, ctx?.formConfig||{}, config)
</script>

<div class={getInputContainerClass(C)}>

  {#if $$slots.label}
    <slot name="label"/>
  {:else if label}
    <Label style={C.labelStyle} {id} {label}/>
  {/if}

  <div class="textarea-box relative inline-flex p-px {getRounded(C.rounded)}" class:overflow-hidden={$$slots?.left || $$slots?.right}>
    <slot name="left" class={$$props?.class}/>
    <textarea {...$$restProps} class={getFormControlStyle(C, $$restProps, $$props?.class, "input", $$slots)} {id} {name} bind:value
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
    ></textarea>
    <slot name="right" class={$$props?.class}/>
  </div>
  {#if $$slots.helperText}
    <slot name="helperText"/>
  {:else if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>


<style lang="postcss">
  :global(textarea){
    @apply outline-transparent ring-transparent bg-transparent w-full block;
  }
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
</style>

