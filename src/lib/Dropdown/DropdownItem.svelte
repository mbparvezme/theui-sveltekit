<script lang="ts">
  import type { PRELOAD } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getContext } from "svelte"
  import { DROPDOWN } from "$lib"

  const { config } = getContext(DROPDOWN)

  console.log(config)

    export let url: string = "/"
    export let text: string|undefined = undefined
    export let preload : PRELOAD = "hover"
    export let type : 'link' | 'divider' | 'header' = "link"
    export let active : boolean = false

    let itemClass = (t:string) => {
        if(t == "link"){
            return active ? twMerge(config.activeClass, $$props?.class) : twMerge(config.linkClass, $$props?.class)
        }
        if(t == "header"){
            return twMerge(config.headerClass, $$props?.class)
        }
        if(t == "divider"){
            return twMerge(config.dividerClass, $$props?.class)
        }
        return ""
    }
</script>

<li class="dropdown-item {itemClass(type=="divider" ? "divider" : "")}">
    {#if type != "divider"}
        {#if type == "header"}
            <h6 class={itemClass(type)}>
                <slot name="startItem" />
                {text}
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </h6>
        {:else}
            <a href={url} class={itemClass(type)} data-sveltekit-preload-data={preload||preload}>
                <slot name="startItem" />
                {text}
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </a>
        {/if}
    {/if}
</li>
