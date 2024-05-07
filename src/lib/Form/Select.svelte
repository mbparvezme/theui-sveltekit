<script lang="ts">
  import type { INPUT_CONFIG, SELECT_DATA } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions"
  import { FORM_CTX, Label, HelperText, Input } from "$lib"

  // Slot: disabled, readonly, custom, reverse, override, reset

  // Input attributes
  export let data : SELECT_DATA = []
  export let helperText : string | undefined = undefined
  export let id : string = generateToken()
  export let label : string | undefined = undefined
  export let name : string
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

  {#if $$restProps?.readonly ||  $$restProps?.disabled}
    {#if value != ""}
      <Input {id} {name} readonly {value} class={getInputClasses(C, $$restProps, "select", $$props?.class)}/>
    {:else}
      {#if data?.length > 0}
        {#each data as d}
          {#if d?.selected}
            <Input {id} {name} readonly value={d?.value||d?.text} class={getInputClasses(C, $$restProps, "select", $$props?.class)}/>
          {/if}
        {/each}
      {/if}
    {/if}
  {:else}
    <select {id} {name} {...$$restProps} class={getInputClasses(C, $$restProps, "select", $$props?.class)} bind:value on:change on:click on:focus>
      {#if $$restProps?.placeholder}<option value="" disabled>{$$restProps.placeholder}</option>{/if}
      {#if data?.length > 0}
        {#each data as d}
          <option value={d?.value||d?.text||d} selected={d?.selected || value == d?.value} disabled={d?.disabled}>{d.text||d}</option>
        {/each}
      {:else}
        <slot/>
      {/if}
    </select>
  {/if}

  {#if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>

<!-- <style lang="postcss">
  :global(.tui-form-control select){
    /* @apply [background_#444]; */
    @apply dark:bg-secondary;
  }
  :global(.select-box [slot=left], .select-box [slot=right]){
    @apply flex items-center justify-center z-[-1] text-gray-500 bg-gray-100;
  }
  :global(.input-sm .select-box [slot=left], .input-sm .select-box [slot=right]){
    @apply px-2;
  }
  :global(.input-md .select-box [slot=left], .input-md .select-box [slot=right]){
    @apply px-3;
  }
  :global(.input-lg .select-box [slot=left], .input-lg .select-box [slot=right]){
    @apply px-4;
  }
  :global(.input-xl .select-box [slot=left], .input-xl .select-box [slot=right]){
    @apply px-5;
  }
</style> -->

<!--
@component
[Go to docs](https://www.theui.dev/r/skcl)
## Props
@prop export let config     : INPUT_CONFIG = {}
  export let helperText : string | undefined = undefined
  export let id         : string = generateToken()
  export let label      : string|undefined = undefined
  export let name       : string
  export let value      : any = ""
  export let data       : Array<{disabled ?: boolean, selected ?: boolean, text : string, value ?: any}> = []
-->
