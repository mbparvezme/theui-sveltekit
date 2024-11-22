<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
	import { animationClass } from "$lib/functions"


  const CTX: any = getContext('FORM') ?? {}
  let {label, id = "", ...props} : {label: Snippet|string, id: string, [key : string]: unknown} = $props()

  let labelClasses = CTX.variant == "flat" ? `font-medium inline-flex absolute left-0 top-1/2 transform cursor-text peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-[2.25em] peer-focus:text-blue-600 ${animationClass(CTX?.animate)}` : ""
</script>

<label class={twMerge("font-medium inline-flex", labelClasses, CTX?.labelClasses, props?.class as string)} for={id}>
  {#if label}
    {#if typeof label == "string"}
      {@html label}
    {/if}
    {#if typeof label == "function"}
      {@render label?.()}
    {/if}
  {/if}
</label>