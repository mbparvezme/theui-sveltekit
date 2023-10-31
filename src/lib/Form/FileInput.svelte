<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getContext } from "svelte"
  import { getRounded, generateToken, getInputContainerClass, getFormControlStyle } from "$lib/functions"
  import { FORM, Label, HelperText } from "$lib"
  const ctx: any = getContext( FORM || {} )

  // Input attributes
  export let id           : string = generateToken()
  export let name         : string
  export let value        : string = ""
  export let files        : FileList | undefined = undefined
  export let label        : string | null = null
  export let helperText   : string | undefined = undefined
  export let labelStyle   : string | undefined = undefined

  export let config       : INPUT_CONFIG = {}
  let C:INPUT_CONFIG = {animate: false, inputGrow: true, variant: "bordered"}

  Object.assign(C, ctx?.formConfig||{}, config)
</script>

<div class={getInputContainerClass(C)}>
  {#if $$slots.label}
    <slot name="label"/>
  {:else if label}
    <Label style={twMerge(C.labelStyle, labelStyle)} {id} {label}/>
  {/if}

  <div class="relative inline-flex overflow-hidden {getRounded(C.rounded)}">
    <input
      {...$$restProps}
      class={getFormControlStyle(C, $$restProps, $$props?.class, "file", $$slots)}
      {id}
      {name}
      type="file"
      bind:value
      bind:files
      on:blur
      on:change
      on:click
      on:focus
      on:keydown
      on:keypress
      on:keyup
      on:mouseenter
      on:mouseleave
      on:mouseover
      on:paste
    />
  </div>

  {#if $$slots.helperText}
    <slot name="helperText"/>
  {:else if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>

<style lang="postcss">
  :global(input){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>