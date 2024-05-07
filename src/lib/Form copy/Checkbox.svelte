<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { getRounded, generateToken, getCheckboxRadioStateClass, getFormControlStyle } from "$lib/functions"
  import { getContext         } from "svelte"
  import { FORM, HelperText   } from "$lib"
  const ctx: any = getContext( FORM || {} )

  export let round      : ROUNDED = "sm"
  export let size       : 'sm' | 'md' | 'lg' | 'xl' = "md"
  export let id         : string = generateToken()
  export let name       : string
  export let label      : string
  export let helperText : string | undefined = undefined
  export let value      : string | number = "on"

  let C: any = {}
  Object.assign(C, ctx?.formConfig||{}, {rounded: round, size})

  let helperSizeFix: string = C.size=="sm" ? "pl-7" : C.size=="md" ? "pl-8" : C.size=="lg" ? "pl-10" : C.size=="xl" ? "pl-12" : ""
</script>

<label for={id} class="flex gap-x-4 {getCheckboxRadioStateClass($$restProps)}" class:flex-row-reverse={$$restProps.reverse} class:justify-end={$$restProps.reverse} class:items-center={C?.size!="lg"} class:items-start={C?.size=="lg"}>
  <input {...$$restProps} class={getFormControlStyle(C, $$restProps, $$props?.class, "checkbox")} class:sr-only={$$restProps.custom} {id} {name} type="checkbox" bind:value>
  {#if !$$restProps.custom}
    {@html label}
  {:else}
    <div class="overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700 peer-checked:border-brand {getRounded( C.rounded )}"><slot /></div>
  {/if}
</label>

{#if $$slots.helperText}
  <slot name="helperText"/>
{:else if helperText}
  <HelperText class={helperSizeFix}>{@html helperText}</HelperText>
{/if}

