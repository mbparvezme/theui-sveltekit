<script lang="ts">
  import type {PRELOAD} from "$lib/types"
  import { twMerge } from "tailwind-merge"
  export let href: string = "/"
  export let preload: PRELOAD = "hover"
  export let a11yLabel: string = "Logo: click to to go homepage"
</script>

<a {href} data-sveltekit-preload-data={preload} class="navbar-brand {twMerge("flex items-center gap-4 h-full max-w-[180px] font-semibold text-default", $$props.class)}" aria-label={a11yLabel}>
  <slot/>
</a>