<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"

  export let grow     : boolean = false
  export let text     : string  | undefined = undefined
  export let title    : string  | undefined = text
  export let topFixed : boolean             = false
  export let round    : ROUNDED = "full"
</script>

<span
  class="theui-badge {twMerge("bg-brand text-on-brand", $$props?.class)}{getRounded(round)}"
  class:badge-fixed={topFixed}
  class:border-primary={topFixed}
  class:badge-grow={grow}>
  {text??""}
  <span class="sr-only">{title??"Badge"}</span>
</span>

<style lang="postcss">
  .theui-badge {
    @apply inline-block text-[1em] leading-[1em] font-medium items-center justify-center whitespace-nowrap select-none p-[.35em];
  }
  .theui-badge.circle {
    @apply rounded-full;
  }
  .theui-badge.badge-fixed {
    @apply absolute transform -translate-x-1/2 -translate-y-1/2 top-0 left-full border-4;
  }
  .theui-badge:not(.badge-grow) {
    @apply text-xs leading-[.8em];
  }
  .theui-badge.badge-grow {
    @apply text-[1em] leading-[1.2em];
  }
</style>
