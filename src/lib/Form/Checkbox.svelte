<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types";
  import { getContext } from "svelte";
  import { generateToken, getInputBoxClasses, getInputClasses } from "$lib/functions";
  import { FORM_CTX, HelperText } from "$lib";

  // Slot: disabled, readonly, custom, reverse, override, reset

  // Input attributes
  export let helperText : string | undefined = undefined;
  export let id         : string = generateToken();
  export let label      : string;
  export let name       : string;
  export let value      : string | number = "on";

  export let animate: INPUT_CONFIG["animate"] = "normal";
  export let labelClasses: INPUT_CONFIG["labelClasses"] = "";
  export let rounded: INPUT_CONFIG["rounded"] = "md";
  export let size: INPUT_CONFIG["size"] = "md";

  const ctx: any = getContext(FORM_CTX || {});
  let C: any = {animate, labelClasses, rounded, size, reset: !!$$restProps?.reset};
  if(!$$restProps?.override) Object.assign(C, ctx?.formConfig );
  let helperSizeFix: string = C.size=="sm" ? "pl-7" : C.size=="md" ? "pl-8" : C.size=="lg" ? "pl-10" : C.size=="xl" ? "pl-12" : "";
</script>

<label  for={id}
        class="flex gap-x-4 {getInputBoxClasses(C, $$restProps, "group")}"
        class:flex-row-reverse={$$restProps?.reverse}
        class:justify-end={$$restProps?.reverse}
        class:items-center={C?.size!="lg"}
        class:items-start={C?.size=="lg"}>
  <input class={getInputClasses(C, $$restProps, "checkbox", $$props?.class)} {...$$restProps} class:sr-only={$$restProps?.custom} {id} {name} type="checkbox" bind:value>
  {#if $$restProps?.custom}
    <slot />
  {:else}
    {@html label}
  {/if}
</label>

{#if helperText}
  <HelperText class={helperSizeFix}>{@html helperText}</HelperText>
{/if}

