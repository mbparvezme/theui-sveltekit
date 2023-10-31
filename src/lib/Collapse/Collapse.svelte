<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types"
  import { getAnimate, generateToken } from "$lib/functions"
  import { collapseID } from "$lib/stores"

  export let animation        : ANIMATE_SPEED = "fast"
  export let id               : string = generateToken()
  export let ariaLabel        : string = ""

  let classes = getAnimate(animation)

  let toggleCollapse = (id: string) => {
    if ($collapseID.includes(id)) {
      hideCollapse(id)
		} else {
      showCollapse(id)
		}
  }

  let hideCollapse = (id: string) => {
      let element = document.getElementById(id)!
      let D = $collapseID.filter(i => i !== id)
			collapseID.update(d => D)
      if(animation) element.style.height = "0"
  }

  let showCollapse = (id: string) => {
      let element = document.getElementById(id)!
      collapseID.update(d=> [...d, id])
      let height = element.scrollHeight
      if(animation) element.style.height = height + "px"
  }
</script>

{#if $$slots.title}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="theui-collapse-title select-none" class:collapse-active-title={$collapseID.includes(id)} role="button" tabindex="-1"
  on:click={()=>toggleCollapse(id)} aria-controls={id} aria-expanded={$collapseID.includes(id)} aria-label={ariaLabel} id="{id}Collapse">
  <slot name="title"></slot>
</span>
{/if}

{#if $$slots.body}
<div {id} class="theui-collapse-body overflow-hidden {classes}" class:invisible={!$collapseID.includes(id)} class:collapse-open={$collapseID.includes(id)} aria-labelledby="{id}Collapse" aria-hidden={!$collapseID.includes(id)}>
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