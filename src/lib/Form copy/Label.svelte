<script lang="ts">
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { FORM } from "$lib"
  export let label: string|undefined = undefined
  export let id: string|undefined = undefined

  const ctx: any = getContext( FORM || {} )
</script>

<label class={twMerge("font-medium", ctx?.formConfig.labelStyle, $$props.class)} for={id}>
  {@html label}
  <slot/>
</label>
