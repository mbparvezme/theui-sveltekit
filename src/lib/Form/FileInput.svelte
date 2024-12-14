<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
	import { generateToken } from "$lib/function"
	import { inputContainerClass, inputClasses } from "./form"
  import { getContext, setContext, type Snippet } from "svelte"
  import { HelperText } from "$lib"
  
  interface Props {
    files ?: any,
    helperText ?: Snippet|string|undefined,
    id ?: string,
    label?: Snippet|string|undefined,
    name : string,
    // value ?: any,
    [key: string] : unknown
  }

  const CTX: any = getContext('FORM') ?? {}

  let {
    files = null,
    helperText = undefined,
    id = generateToken(),
    label = undefined,
    name,
    // value = null,

    // labelClasses = CTX?.labelClasses ?? "",
    animate = CTX?.animate ?? "normal",
    reset = CTX?.reset ?? false,
    rounded = CTX?.rounded ?? "md",
    size = CTX?.size ?? "md",
    variant = CTX?.variant ?? "bordered",
    ...props
  } : Props & INPUT_CONFIG = $props()

  let C:INPUT_CONFIG & {id: string} = {animate, rounded, size, variant, reset, id}

  setContext('FORM', C)
</script>

<div class={inputContainerClass(C, props )}>
  <div class="relative flex focus-within">
    <input {...props} class={inputClasses(C, props, "file")} {id} {name} type="file" bind:files/>
  </div>

  {#if helperText}
    {#if typeof helperText == "string"}
      <HelperText text={helperText} />
    {/if}
    {#if typeof helperText == "function"}
      {@render helperText?.()}
    {/if}
  {/if}
</div>
