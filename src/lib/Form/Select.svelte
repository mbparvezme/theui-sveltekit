<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { getContext } from "svelte"
  import { getRounded, generateToken, getInputContainerClass, getFormControlStyle } from "$lib/functions"
  import { FORM, Input, Label, HelperText} from "$lib"

  const ctx: any = getContext(FORM || {})

  // Input attributes
  export let config     : INPUT_CONFIG = {}
  export let helperText : string | undefined = undefined
  export let id         : string = generateToken()
  export let label      : string|undefined = undefined
  export let name       : string
  export let value      : any = ""
  export let data       : Array<{disabled ?: boolean, selected ?: boolean, text : string, value ?: any}> = []

  let C:INPUT_CONFIG = {animate: false, rounded : "md", inputGrow: true, size: "md", variant: "bordered"}
  Object.assign(C, ctx?.formConfig || {}, config)
</script>

<div class={getInputContainerClass(C)}>  
  {#if $$slots.label}
    <slot name="label"/>
  {:else if label}
    <Label style={C.labelStyle} {id} {label}/>
  {/if}

  <div class="select-box relative inline-flex p-px {getRounded(C.rounded)}" class:overflow-hidden={$$slots?.left || $$slots?.right}>
    <slot name="left" class={$$props?.class}/>
    {#if $$restProps.readonly ||  $$restProps.disabled}
      {#if data.length > 0 && value == ""}
        {#each data as d}
          {#if d.selected}
            <Input class={getFormControlStyle(C, $$restProps, $$props?.class, "select", $$slots)} {id} {name} readonly value={d?.value||d?.text}/>
          {/if}
        {/each}
      {/if}
      {#if value != ""}
        <Input class={getFormControlStyle(C, $$restProps, $$props?.class, "select", $$slots)} {id} {name} readonly {value}/>
      {/if}
    {:else}
      <select {...$$restProps} class={getFormControlStyle(C, $$restProps, $$props?.class, "select", $$slots)} {id} {name} bind:value on:change on:click on:focus>
        {#if $$restProps.placeholder}<option value="" disabled>{$$restProps.placeholder}</option>{/if}
        {#if data.length > 0}
          {#each data as d}
            <option value={d.value||d.text||d} selected={d?.selected || value == d.value} disabled={d?.disabled}>{d.text||d}</option>
          {/each}
        {:else}
          <slot/>
        {/if}
      </select>
    {/if}
    <slot name="right" class={$$props?.class}/>
  </div>

  {#if $$slots.helperText}
    <slot name="helperText"/>
  {:else if helperText}
    <HelperText>{@html helperText}</HelperText>
  {/if}
</div>

<style lang="postcss">
  :global(select){
    @apply outline-transparent ring-transparent border-transparent;
  }
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
</style>