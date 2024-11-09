<script lang="ts">
  import { setContext, type Snippet } from "svelte"
  import { generateToken } from "$lib/functions"
  let {
    size = "default",
    standalone = true,
    id = generateToken(),
    children
  } : {
    size : "compact" | "default" | "large",
    standalone: boolean,
    id: string,
    children: Snippet
  } = $props()
  setContext("ACCORDION_GROUP", {group: true, id, size, standalone})
</script>

<div {id} class="theui-accordion-group flex flex-col">
  {@render children()}
</div>