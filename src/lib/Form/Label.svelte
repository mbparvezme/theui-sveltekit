<script lang="ts">
  import { getContext, type Snippet } from "svelte"
	import { labelClasses } from "$lib/function.form"

  const CTX: any = getContext('FORM') ?? {}
  let {label, id = "", ...props} : {label: Snippet|string, id: string, [key : string]: unknown} = $props()
</script>

<label class={labelClasses(CTX, props)} for={id}>
  {#if label}
    {#if typeof label == "string"}
      {@html label}
    {/if}
    {#if typeof label == "function"}
      {@render label?.()}
    {/if}
  {/if}
</label>