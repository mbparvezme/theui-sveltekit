<script lang="ts">
  interface DropdownContext {config: any}
  import type { PRELOAD } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getContext } from "svelte"
  import { DROPDOWN } from "$lib"

  const { config } = getContext<DropdownContext>(DROPDOWN)
  export let url: string = "/"
  export let text: string|undefined = undefined
  export let preload : PRELOAD = "hover"
  export let type : 'link' | 'divider' | 'header' | 'button' = "link"
  export let active : boolean = false

  let itemClass = (t:string) => {
      if(t == "link" || t == "button"){
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
                <slot>{text}</slot>
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </h6>
        {:else if type == "button"}
            <button class={itemClass(type)} on:click on:dblclick on:focus on:keydown on:keypress on:keyup on:mouseenter on:mouseleave on:mouseover>
                <slot name="startItem" />
                <slot>{text}</slot>
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </button>
        {:else}
            <a href={url} class={itemClass(type)} data-sveltekit-preload-data={preload||preload}>
                <slot name="startItem" />
                <slot>{text}</slot>
                <div class="ms-auto flex items-center"><slot name="endItem" /></div>
            </a>
        {/if}
    {/if}
</li>
