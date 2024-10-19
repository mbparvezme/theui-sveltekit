<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getAnimate, generateToken } from "$lib/functions"
	import { Close } from "$lib"

  export let id             : string = generateToken()
  export let label          : string = ""
  export let animate        : ANIMATE_SPEED = "fast"
  export let backdrop       : boolean = true
  export let closeOnEsc     : boolean = true
  export let position       : 'top' | 'end' | 'bottom' | 'start' = "start"
  export let staticBackdrop : boolean = false

  let active: boolean = false

  $: attr = {
		"id" : `${id}Heading`,
		"aria-label" : label,
		"aria-haspopup" : "true",
		"aria-controls" : `${id}Offcanvas`,
		"aria-expanded" : active
	}

  let toggle = (id: string) => document.getElementById(id)?.classList.toggle("open")

  let handleKeyboard = (e: KeyboardEvent) => {
		if (document.getElementById(id)?.classList.contains("open") && (closeOnEsc != false && e.keyCode == 27)) toggle(id)
	}

  let positionCls = () => position === "top" ? "offcanvas-top" : position === "end" ? "offcanvas-end" : position === "bottom" ? "offcanvas-bottom" : "offcanvas-start"
  let getClass = () => "offcanvas-body fixed bg-white dark:bg-secondary" + getAnimate(animate)
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if $$slots.offcanvasButton}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<span role="button" on:click={()=>toggle(id)} id="{id}Btn">
  <slot name="offcanvasButton" {label} {attr}></slot>
</span>
{/if}

{#if $$slots.offcanvasContent}
  <div {id} class="theui-offcanvas fixed inset-0 z-40 {getAnimate(animate)} {positionCls()}" role="dialog" class:animate={animate}>

    {#if backdrop}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="backdrop fixed inset-0 bg-black z-[-1] {getAnimate(animate)}" on:click={()=>staticBackdrop ? false : toggle(id)}></div>
    {/if}

    <div id="{id}Offcanvas" class={twMerge(getClass(), $$props?.class)} aria-labelledby="{id}Btn" aria-hidden={!active}>
      <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-4" on:click={()=>toggle(id)} aria-label="Close" >
        <Close/>
      </button>
      <slot name="offcanvasContent"></slot>
    </div>

  </div>
{/if}

<style lang="postcss">
  .theui-offcanvas.open{
    @apply visible opacity-100;
  }
  .theui-offcanvas{
    @apply invisible opacity-0;
  }
  .theui-offcanvas.offcanvas-end .offcanvas-body, .theui-offcanvas.offcanvas-start .offcanvas-body{
    @apply top-0 bottom-0 w-full sm:w-96;
  }
  .theui-offcanvas.offcanvas-top .offcanvas-body, .theui-offcanvas.offcanvas-bottom .offcanvas-body{
    @apply start-0 end-0 w-full min-h-[160px];
  }
  .theui-offcanvas.offcanvas-end .offcanvas-body{
    @apply end-0;
  }
  .theui-offcanvas.offcanvas-bottom .offcanvas-body{
    @apply bottom-0;
  }
  .theui-offcanvas.animate .backdrop{
    @apply opacity-0;
  }
  .theui-offcanvas.open .backdrop{
    @apply opacity-50 dark:opacity-75;
  }
  .theui-offcanvas.animate .offcanvas-body{
    @apply transform;
  }
  .theui-offcanvas.animate.offcanvas-start .offcanvas-body{
    @apply -translate-x-full rtl:translate-x-full;
  }
  .theui-offcanvas.animate.offcanvas-end .offcanvas-body{
    @apply translate-x-full rtl:-translate-x-full;
  }
  .theui-offcanvas.animate.offcanvas-start.open .offcanvas-body, .theui-offcanvas.animate.offcanvas-end.open .offcanvas-body{
    @apply translate-x-0;
  }
  .theui-offcanvas.animate.offcanvas-top .offcanvas-body{
    @apply -translate-y-full;
  }
  .theui-offcanvas.animate.offcanvas-bottom .offcanvas-body{
    @apply translate-y-full;
  }
  .theui-offcanvas.animate.offcanvas-top.open .offcanvas-body, .theui-offcanvas.animate.offcanvas-bottom.open .offcanvas-body{
    @apply translate-y-0
  }
</style>