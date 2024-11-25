<script lang="ts">
  import type { INPUT_CONFIG, INPUT_TYPE } from "$lib/types"
	import { generateToken } from "$lib/function.core"
	import { inputContainerClass, inputClasses } from "$lib/function.form"
  import { getContext, setContext, type Snippet } from "svelte"
  import { HelperText, Label } from "$lib"

  interface Props {
    label?: Snippet|string|undefined,
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
    floatingLabel = CTX?.floatingLabel ?? CTX?.variant == "flat" ?? false,
    labelClasses = CTX?.labelClasses ?? "",
    rounded = CTX?.rounded ?? "md",
    size = CTX?.size ?? "md",
    variant = CTX?.variant ?? "bordered",
    reset = CTX?.reset ?? false,
    ...props
  } : Props & INPUT_CONFIG = $props()

  let C:INPUT_CONFIG & {id: string, type: "input"} = {animate, floatingLabel, labelClasses, rounded, size, variant, reset, id, type: "input"}

  setContext('FORM', C)

  let setType: any = (node: HTMLInputElement) => node.type = type
</script>

{#snippet labelContent()}
  {#if typeof label == "string"}
    <Label {id} {label} />
  {/if}
  {#if typeof label == "function"}
    {@render label?.()}
  {/if}
{/snippet}

<div class={inputContainerClass(C, props )}>
  {#if label && !floatingLabel}
    {@render labelContent()}
  {/if}
  <div class="relative flex focus-within">
    {#if type == "textarea"}
      <textarea {...props} class={inputClasses(C, props)} {id} {name} placeholder={(props?.placeholder ?? " ") as string} rows=1 bind:value></textarea>
    {:else}
      <input {...props} class={inputClasses(C, props)} {id} {name} placeholder={props?.placeholder ?? " "} bind:value use:setType/>
    {/if}
    {#if label && floatingLabel}
      {@render labelContent()}
    {/if}
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
