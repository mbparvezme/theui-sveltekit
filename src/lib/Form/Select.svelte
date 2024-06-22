<script lang="ts">
  import type { INPUT_CONFIG, SELECT_DATA } from "$lib/types"
  import { getContext } from "svelte"
  import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions"
  import { FORM_CTX } from "./Form.svelte";
  import { Label, HelperText, Input } from "$lib"

  // Input attributes
  export let data : SELECT_DATA[] = []
  export let helperText : string | undefined = undefined
  export let id : string = generateToken()
  export let label : string | undefined = undefined
  export let name : string
  export let value : any = ""

  export let animationSpeed: INPUT_CONFIG["animate"] = "normal"
  export let labelClasses: INPUT_CONFIG["labelClasses"] = ""
  export let rounded: INPUT_CONFIG["rounded"] = "md"
  export let size: INPUT_CONFIG["size"] = "md"
  export let variant: INPUT_CONFIG["variant"] = "bordered"

  const ctx: any = getContext(FORM_CTX || {})
  let C:INPUT_CONFIG = {animate: animationSpeed, labelClasses, rounded, size, variant, grow: !!$$restProps?.grow, reset: !!$$restProps?.reset}
  if(!$$restProps?.override) Object.assign(C, ctx?.formConfig)
</script>

<div class={getInputBoxClasses(C, $$restProps, "default")}>
  {#if label}
    <Label {id} {label}/>
  {/if}

  {#if $$restProps?.readonly ||  $$restProps?.disabled}
    {#if value != ""}
      <Input {id} {name} readonly {value} class={getInputClasses(C, $$restProps, "select")}/>
    {:else}
      {#if data?.length > 0}
        {#each data as d}
          {#if typeof d === 'object' && d?.selected}
            <Input {id} {name} readonly value={d?.value||d?.text} class={getInputClasses(C, $$restProps, "select")}/>
          {/if}
        {/each}
      {/if}
    {/if}
  {:else}
    <select {id} {name} {...$$restProps} class={getInputClasses(C, $$restProps, "select")} bind:value on:change on:click on:focus>
      {#if $$restProps?.placeholder}<option value="" disabled>{$$restProps.placeholder}</option>{/if}
      {#if data?.length > 0}
        {#each data as d}
          {#if typeof d === 'object'}
            <option value={d?.value||d?.text||d} selected={d?.selected || value == d?.value}>{d.text||d}</option>
          {:else}
            <option value={d}>{d}</option>
          {/if}
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