<script context="module">
	export const ACCORDION_GROUP = {}
</script>

<script lang="ts">
  import { setContext } from "svelte"
  export let gap: 0 | 2 | 4 | 8 = 0
  export let size : "compact" | "default" | "large" = "default"
  setContext(ACCORDION_GROUP, {group: true, size})
</script>

<div class="theui-accordion-group flex flex-col"
  class:gap-0={gap==0}
  class:gap-2={gap==2}
  class:gap-4={gap==4}
  class:gap-8={gap==8}
>
  <slot />
</div>