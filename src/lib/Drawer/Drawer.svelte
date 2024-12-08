<script lang="ts">
  import type { ANIMATE_SPEED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { animationClass, generateToken, backdropClasses } from "$lib/function.core"
	import { Close } from "$lib"
	import type { Snippet } from "svelte";

  interface Props {
    button ?: Snippet<[any]>|undefined,
    children ?: Snippet,
    id ?: string,
    label ?: string,
    animate ?: ANIMATE_SPEED,
    backdrop ?: boolean|string,
    closeOnEsc ?: boolean,
    position ?: 'top' | 'end' | 'bottom' | 'start',
    staticBackdrop ?: boolean,
    [key: string]: unknown // class
  }

  let {
    children,
    button,
    id = generateToken(),
    label = "",
    animate = "fast",
    backdrop = true,
    closeOnEsc = true,
    position = "start",
    staticBackdrop = false,
    ...props
  } : Props = $props()

  let active: boolean = false

  let attr = $derived({
		"id" : `${id}Heading`,
		"aria-label" : label,
		"aria-haspopup" : "true",
		"aria-controls" : `${id}Drawer`,
		"aria-expanded" : active
	})

  let toggle = (id: string) => document.getElementById(id)?.classList.toggle("open")

  let handleKeyboard = (e: KeyboardEvent) => {
    if (document.getElementById(id)?.classList.contains("open") && closeOnEsc && e.key === "Escape") {
      toggle(id);
    }
  }

  let positionCls = () => {
    const positions: { [key: string]: string } = {
      top: "drawer-top",
      end: "drawer-end",
      bottom: "drawer-bottom",
      start: "drawer-start"
    }
    return positions[position] || "drawer-start"
  }

  let getClass = twMerge(`drawer-body fixed bg-white dark:bg-secondary${animationClass(animate)}`, (props?.class ?? "") as string)
</script>

<svelte:body onkeydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if button}
<span role="button" onclick={()=>toggle(id)} onkeydown={(e)=>handleKeyboard(e)} id="{id}Btn" tabindex="-1">
  {@render button?.(attr)}
</span>
{/if}

{#if children}
  <div {id} class="theui-drawer fixed inset-0 z-40 {animationClass(animate)} {positionCls()}" role="dialog" class:animate={animate}>

    {#if backdrop}
      <div role="presentation" class={backdropClasses(backdrop)} onclick={()=>staticBackdrop ? false : toggle(id)}></div>
    {/if}

    <div id="{id}Drawer" class={getClass} aria-labelledby="{id}Btn" aria-hidden={!active}>
      <Close class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-4" onclick={()=>toggle(id)}/>
      {@render children()}
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
  .theui-drawer.drawer-end .drawer-body, .theui-drawer.drawer-start .drawer-body{
    @apply top-0 bottom-0 w-full sm:w-96;
  }
  .theui-drawer.drawer-top .drawer-body, .theui-drawer.drawer-bottom .drawer-body{
    @apply start-0 end-0 w-full min-h-[160px];
  }
  .theui-drawer.drawer-end .drawer-body{
    @apply end-0;
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
  .theui-drawer.animate.drawer-start .drawer-body{
    @apply -translate-x-full rtl:translate-x-full;
  }
  .theui-drawer.animate.drawer-end .drawer-body{
    @apply translate-x-full rtl:-translate-x-full;
  }
  .theui-drawer.animate.drawer-start.open .drawer-body, .theui-drawer.animate.drawer-end.open .drawer-body{
    @apply translate-x-0;
  }
  .theui-drawer.animate.drawer-top .drawer-body{
    @apply -translate-y-full;
  }
  .theui-drawer.animate.drawer-bottom .drawer-body{
    @apply translate-y-full;
  }
  .theui-drawer.animate.drawer-top.open .drawer-body, .theui-drawer.animate.drawer-bottom.open .drawer-body{
    @apply translate-y-0;
  }
</style>