<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types"
  import { getAnimate, generateToken } from "$lib/functions"

  export let animation  : ANIMATE_SPEED = "fast"
  export let id         : string = generateToken()
  export let ariaLabel  : string = ""
  export let isOpen     : boolean = false      

  let classes = getAnimate(animation)

  $: toggleCollapse = (id: string) => {
    let element = document.getElementById(id)!
    if(element?.classList.contains('collapse-open')){
      isOpen = false
      if(animation) element.style.height = "0"
    }else{
      isOpen = true
      if(animation) element.style.height = element.scrollHeight + "px"
    }
  }
</script>

{#if $$slots.title}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="theui-collapse-title select-none" class:collapse-active-title={isOpen} role="button" tabindex="-1"
  on:click={()=>toggleCollapse(id)} aria-controls={id} aria-expanded={isOpen} aria-label={ariaLabel} id="{id}Collapse">
  <slot name="title"></slot>
</span>
{/if}

{#if $$slots.body}
<div {id} class="theui-collapse-body overflow-hidden {classes}" class:invisible={!isOpen} class:collapse-open={isOpen} aria-labelledby="{id}Collapse" aria-hidden={!isOpen}>
	<div>
		<slot name="body"></slot>
	</div>
</div>
{/if}

<style lang="postcss">
  .theui-collapse-body.invisible {
    @apply h-0;
  }
</style>

<!--
@component
[Go to docs](https://www.theui.dev/r/skcl)
## Props
@prop export let animation  : ANIMATE_SPEED = "fast"
  export let id         : string = generateToken()
  export let ariaLabel  : string = ""
  export let isOpen     : boolean = false
-->
