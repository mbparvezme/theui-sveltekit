<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  const CTX: any = getContext('FORM') ?? {}
  let {label, id = "", ...props} : {label: Snippet|string, id: string, [key : string]: unknown} = $props()

</script>

<label class={twMerge("font-medium inline-flex", CTX?.labelClasses, props?.class as string)} for={id}>
  {#if label}
    {#if typeof label == "string"}
      {@html label}
    {/if}
    {#if typeof label == "function"}
      {@render label?.()}
    {/if}
  {/if}
</label>