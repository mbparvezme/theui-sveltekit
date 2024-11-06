<script lang="ts">
  import { setContext, type Snippet } from "svelte"
  let {size = "default", children} : {size : "compact" | "default" | "large", children: Snippet} = $props()
  setContext("ACCORDION_GROUP", {group: true, size, item: null})
</script>

<div class="theui-accordion-group flex flex-col">
  {@render children()}
</div>