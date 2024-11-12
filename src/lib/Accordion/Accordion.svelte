<script lang="ts">
  import { setContext, type Snippet } from "svelte"
  import { generateToken } from "$lib/functions"

  interface Props {
    size : "compact" | "default" | "large",
    standalone: boolean,
    id: string,
    children: Snippet
	}

  let {size = "default", standalone = true, id = generateToken(), children} : Props = $props()
  setContext("ACCORDION_GROUP", {group: true, id, size, standalone})
</script>

<div {id} class="theui-accordion-group flex flex-col">
  {@render children()}
</div>