<script lang="ts">
    import type { DROPDOWN_ITEM, DROPDOWN_ITEM_CONFIG, PRELOAD } from "$lib/types"
    import { twMerge } from "tailwind-merge"

    export let item: DROPDOWN_ITEM|null|any = null
    export let itemConfig : DROPDOWN_ITEM_CONFIG|null = null
    
    let preload: PRELOAD = "hover"
    let type = item?.type || "link"
    let active = item?.active || false

    let itemClass = () => {
        if(type == "link"){
            let cls = "flex items-center gap-4 py-3 px-4 "
            if(active){
                return cls + twMerge("bg-gray-500/10", itemConfig?.activeClass, $$props?.class)
            }else{
                return cls + twMerge("bg-transparent hover:bg-gray-500/10 text-default", itemConfig?.linkClass, $$props?.class)
            }
        }
        if(type == "header"){
            return twMerge("flex items-center gap-4 p-4 font-semibold text-xs opacity-75 uppercase", itemConfig?.headerClass, $$props?.class)
        }
    }
</script>

<li class="dropdown-item {(type=="divider" ? twMerge("border-b pb-2 mb-2 border-tertiary", itemConfig?.dividerClass) : "")}">
    {#if type != "divider"}
        {#if type == "header"}
            <h6 class={itemClass()}>
                <slot name="startItem" />
                {item.text}
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </h6>
        {:else}
            <a href={item?.url} class={itemClass()} data-sveltekit-preload-data={item?.preload||preload}>
                <slot name="startItem" />
                {item.text}
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </a>
        {/if}
    {/if}
</li>
