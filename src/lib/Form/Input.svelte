<script lang="ts">
  import type { INPUT_CONFIG, INPUT_TYPE } from "$lib/types"
	import { generateToken, inputContainerClass, inputClasses } from "$lib/functions"
  import { getContext, type Snippet } from "svelte"
  // import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions"
  import { HelperText, Label } from "$lib"

  interface Props {
    label ?: Snippet|string,
    helperText ?: Snippet|string|undefined,
    id ?: string,
    name : string,
    type ?: INPUT_TYPE,
    value ?: any,
    [key: string] : unknown
  }

  const CTX: any = getContext('FORM') ?? {}
  let {
    helperText = undefined,
    id = generateToken(),
    label = undefined,
    name = "",
    type = "text",
    value = null,

    animate = CTX?.animate ?? "normal",
    labelClasses = CTX?.labelClasses ?? "",
    rounded = CTX?.rounded ?? "md",
    size = CTX?.size ?? "md",
    variant = CTX?.variant ?? "bordered",
    reset = CTX?.reset ?? false,
    ...props
  } : Props & INPUT_CONFIG = $props()

  let C:INPUT_CONFIG = {animate, labelClasses, rounded, size, variant, reset}

  let setType: any = (node: HTMLInputElement) => node.type = type
</script>

<div class={inputContainerClass(C, props )}>
  {#if label}
    {#if typeof label == "string"}
      <Label {id} {label} />
    {/if}
    {#if typeof label == "function"}
      {@render label?.()}
    {/if}
  {/if}

  <input {...props} class={inputClasses(C, props)} {id} {name} bind:value use:setType/>

  {#if helperText}
    {#if typeof helperText == "string"}
      <HelperText text={helperText} />
    {/if}
    {#if typeof helperText == "function"}
      {@render helperText?.()}
    {/if}
  {/if}
</div>