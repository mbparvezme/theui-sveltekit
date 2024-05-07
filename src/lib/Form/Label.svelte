<script lang="ts">
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { FORM_CTX } from "$lib"
  export let label: string|undefined = undefined
  export let id: string|undefined = undefined

  const ctx: any = getContext(FORM_CTX || {})
</script>

<label class={twMerge("font-medium inline-flex", ctx?.formConfig?.labelClasses, $$props?.class)} for={id}>
  {@html label}
  <slot/>
</label>
