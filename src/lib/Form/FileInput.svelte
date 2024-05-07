<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions"
  import { FORM_CTX, Label, HelperText } from "$lib"

  // Slot: disabled, readonly, custom, reverse, override, reset

  // Input attributes
  export let helperText : string | undefined = undefined
  export let id : string = generateToken()
  export let label : string | undefined = undefined
  export let name : string
  export let value : any = ""
  export let files : any = ""

  export let animate: INPUT_CONFIG["animate"] = "normal"
  export let labelClasses: INPUT_CONFIG["labelClasses"] = ""
  export let rounded: INPUT_CONFIG["rounded"] = "md"
  export let size: INPUT_CONFIG["size"] = "md"
  export let variant: INPUT_CONFIG["variant"] = "bordered"

  const ctx: any = getContext(FORM_CTX || {})
  let C:INPUT_CONFIG = {animate, labelClasses, rounded, size, variant, grow: !!$$restProps?.grow, reset: !!$$restProps?.reset}
  if(!$$restProps?.override) Object.assign(C, ctx?.formConfig)
</script>

<div class={getInputBoxClasses(C)}>
  {#if label}
    <Label {id} {label}/>
  {/if}
  <input
    {...$$restProps}
    class={getInputClasses(C, $$restProps, "file", $$props?.class)}
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
{#if helperText}
  <HelperText>{@html helperText}</HelperText>
{/if}

<!--
@component
[Go to docs](https://www.theui.dev/r/skcl)
## Props
@prop export let id : string = generateToken()
  export let name : string
  export let value : string = ""
  export let files : FileList | undefined = undefined
  export let helperText : string | undefined = undefined
  export let label : string | null = null
  export let config : INPUT_CONFIG = {}
-->
