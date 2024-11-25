<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { getContext, type Snippet } from "svelte"
  import { generateToken } from "$lib/function.core"
  import { inputContainerClass, inputClasses } from "$lib/function.form"
  import { HelperText } from "$lib"

  interface Props {
    helperText?: string | Snippet | undefined,
    id?: string,
    label: string|Snippet,
    name: string,
    value?: boolean | null | undefined,
    [key: string]: unknown
  }

  const CTX: any = getContext('FORM') ?? {}

  let {
    helperText = undefined,
    label,
    name,
    id = generateToken(),
    value = null,
    animate = CTX?.animate ?? "normal",
    labelClasses  = CTX?.labelClasses ?? "",
    rounded = CTX?.rounded ?? "md",
    size = CTX?.size ?? "md",
    reset = CTX?.reset ?? false,
    variant = CTX?.variant ?? "bordered",
    ...props
  }: Props & INPUT_CONFIG = $props()

  let sizeClasses = {
    sm: "ps-7",
    md: "ps-8",
    lg: "ps-10",
    xl: "ps-12",
  }
  let C:INPUT_CONFIG & {id: string, type: "group"} = {animate, labelClasses, rounded, size, variant, reset, id, type: "group"}
</script>

<label for={id}
  class="inline-flex gap-x-4 {inputContainerClass(C, {props}, "group")}"
  class:flex-row-reverse={props?.reverse}
  class:justify-end={props?.reverse}
  class:items-center={C?.size!="lg"}
  class:items-start={C?.size=="lg"}>
  <input class={inputClasses(C, props, "checkbox")} class:sr-only={props?.custom} {...props} {id} {name} type="checkbox" bind:checked={value}>
  {#if typeof label == "string"}
    {@html label}
  {/if}
  {#if typeof label == "function"}
    {@render label?.()}
  {/if}
</label>

{#if helperText}
  {#if typeof helperText == "string"}
    <HelperText text={helperText} />
  {/if}
  {#if typeof helperText == "function"}
    {@render helperText?.()}
  {/if}
{/if}
