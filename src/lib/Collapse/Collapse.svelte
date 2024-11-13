<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types"
	import { onMount, type Snippet } from "svelte";
  import { animationClass, generateToken } from "$lib/functions"

  interface Props {
    title ?: Snippet|string|undefined,
    content ?: Snippet|string|undefined,
    animation ?: ANIMATE_SPEED,
    id ?: string,
    ariaLabel ?: string,
    isOpen ?: boolean,
    [key: string]: unknown // dismissible, icon
  }

  let {
    title = undefined,
    content = undefined,
    animation = "fast",
    id = generateToken(),
    ariaLabel = "",
    isOpen = false,
    ...props
  } : Props = $props();

  let classes = animationClass(animation)
  let toggleCollapse = (id: string): void => {}

  onMount(() => {
    toggleCollapse = (id: string) => {
      let element = document.getElementById(id)!
      if(element?.classList.contains('collapse-open')){
        isOpen = false
        if(animation) element.style.height = "0"
      }else{
        isOpen = true
        if(animation) element.style.height = element.scrollHeight + "px"
      }
    }
  })
</script>

{#if title}
<span class="theui-collapse-title select-none" class:collapse-active-title={isOpen} role="button" tabindex="-1"
  onclick={()=>toggleCollapse(id)} aria-controls={id} aria-expanded={isOpen} aria-label={ariaLabel} id="{id}Collapse">
  {#if typeof title === "string"}
    {@html title}
  {:else}
    {@render title?.()}
  {/if}
</span>
{/if}

{#if content}
<div {id} class="theui-collapse-body overflow-hidden {classes}" class:invisible={!isOpen} class:collapse-open={isOpen} aria-labelledby="{id}Collapse" aria-hidden={!isOpen}>
	<div>
    {#if typeof content === "string"}
      {@html content}
    {:else}
      {@render content?.()}
    {/if}
	</div>
</div>
{/if}

<style lang="postcss">
  .theui-collapse-body.invisible {
    @apply h-0;
  }
</style>