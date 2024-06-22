<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types";
  import { twMerge } from "tailwind-merge";
  import { getAnimate, generateToken } from "$lib/functions";
	import { Close } from "$lib";

  export let id             : string = generateToken();
  export let label          : string = "";
  export let animationSpeed        : ANIMATE_SPEED = "fast";
  export let backdrop       : boolean = true;
  export let closeOnEsc     : boolean = true;
  export let position       : 'top' | 'right' | 'bottom' | 'left' = "left";
  export let staticBackdrop : boolean = false;

  let active: boolean = false;

  $: attr = {
		"id" : `${id}Heading`,
		"aria-label" : label,
		"aria-haspopup" : "true",
		"aria-controls" : `${id}Drawer`,
		"aria-expanded" : active
	};

  let toggle = (id: string) => document.getElementById(id)?.classList.toggle("open");

  let handleKeyboard = (e: KeyboardEvent) => {
		if (document.getElementById(id)?.classList.contains("open") && (closeOnEsc != false && e.keyCode == 27)) toggle(id);
	}

  let positionCls = () => position === "top" ? "drawer-top" : position === "right" ? "drawer-right" : position === "bottom" ? "drawer-bottom" : "drawer-left";
  let getClass = () => `drawer-body fixed bg-white dark:bg-secondary ${getAnimate(animationSpeed)}`;
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if $$slots.drawerButton}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<span role="button" on:click={()=>toggle(id)} id="{id}Btn">
  <slot name="drawerButton" {label} {attr}></slot>
</span>
{/if}

{#if $$slots.drawerContent}
  <div {id} class="theui-drawer fixed inset-0 z-40 {getAnimate(animationSpeed)} {positionCls()}" role="dialog" class:animate={animationSpeed}>

    {#if backdrop}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="backdrop fixed inset-0 bg-black z-[-1] {getAnimate(animationSpeed)}" on:click={()=>staticBackdrop ? false : toggle(id)}></div>
    {/if}

    <div id="{id}Drawer" class={twMerge(getClass(), $$props?.class)} aria-labelledby="{id}Btn" aria-hidden={!active}>
      <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-4" on:click={()=>toggle(id)} aria-label="Close" >
        <Close/>
      </button>
      <slot name="drawerContent"></slot>
    </div>

  </div>
{/if}

<style lang="postcss">
  .theui-drawer.open{
    @apply visible opacity-100;
  }
  .theui-drawer{
    @apply invisible opacity-0;
  }
  .theui-drawer.drawer-right .drawer-body, .theui-drawer.drawer-left .drawer-body{
    @apply top-0 bottom-0 w-full sm:w-96;
  }
  .theui-drawer.drawer-top .drawer-body, .theui-drawer.drawer-bottom .drawer-body{
    @apply left-0 right-0 w-full min-h-[160px];
  }
  .theui-drawer.drawer-right .drawer-body{
    @apply right-0;
  }
  .theui-drawer.drawer-bottom .drawer-body{
    @apply bottom-0;
  }
  .theui-drawer.animate .backdrop{
    @apply opacity-0;
  }
  .theui-drawer.open .backdrop{
    @apply opacity-50 dark:opacity-75;
  }
  .theui-drawer.animate .drawer-body{
    @apply transform;
  }
  .theui-drawer.animate.drawer-left .drawer-body{
    @apply -translate-x-full;
  }
  .theui-drawer.animate.drawer-right .drawer-body{
    @apply translate-x-full;
  }
  .theui-drawer.animate.drawer-left.open .drawer-body, .theui-drawer.animate.drawer-right.open .drawer-body{
    @apply translate-x-0
  }
  .theui-drawer.animate.drawer-top .drawer-body{
    @apply -translate-y-full;
  }
  .theui-drawer.animate.drawer-bottom .drawer-body{
    @apply translate-y-full;
  }
  .theui-drawer.animate.drawer-top.open .drawer-body, .theui-drawer.animate.drawer-bottom.open .drawer-body{
    @apply translate-y-0
  }
</style>