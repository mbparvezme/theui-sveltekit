<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { onMount, setContext, type Snippet } from "svelte"
  import { generateToken, animationClass, roundedClass } from "$lib/function.core"
  import { twMerge } from "tailwind-merge"
  import {FabButton} from "$lib"

  interface Props {
    children?: Snippet,
    animate?: ANIMATE_SPEED,
    size?: 'sm' | 'md' | 'lg' | 'xl',
    align?: 'start' | 'end',
    rounded?: ROUNDED,
    href?: string|undefined,
    trigger?: 'click' | 'hover',
    btnClasses?: string,
    iconClasses?: string,
    direction?: 'horizontal' | 'vertical',
    [key: string] : unknown
  }

  let {
    children,
    animate = "normal",
    size = "md",
    align = "end",
    rounded = size == "xl" || size == "lg" ? "lg" : "md",
    href = undefined,
    trigger = "hover",
    btnClasses = "",
    iconClasses = "",
    direction = "vertical",
    ...props
  } : Props = $props()

  let id: string = `${generateToken()}-fab-trigger`
  let open = $state(false)

  // onMount(() => {
  //   let elem = document.getElementById(id)
  // });


  let toggle = (id: string) => document.getElementById(id)?.classList.toggle("open")

  let alignClasses = {start: "fab-start start-6 bottom-6", end: "fab-end end-6 bottom-6"}
  let btnSizeClasses  = {sm: "w-12 h-12", md: "w-14 h-14", lg: "w-16 h-16", xl: "w-20 h-20"}
  let iconSizeClasses = {sm: "w-[1.25em] h-[1.25em]", md: "w-[1.5em] h-[1.5em]", lg: "w-[1.75em] h-[1.75em]", xl: "w-[2em] h-[2em]"}

  let fabContainerClasses = `theui-fab fixed flex ${alignClasses[align]}${animationClass(animate)} ${direction=="horizontal" ? "flex-row" : "flex-col"}`

  let fabButtonClasses = `theui-fab-trigger ${twMerge(`static flex items-center justify-center bg-brand-primary-500 text-on-brand-primary-500 shadow-2xl hover:bg-brand-primary-600 ${btnSizeClasses[size]}${roundedClass(rounded)}${animationClass(animate)}`, btnClasses)}`

  let fabIconClasses = `fab-icon ${twMerge(iconSizeClasses[size], iconClasses)}`

  setContext('FAB', {fabButtonClasses, fabIconClasses})
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div {id} class={twMerge(fabContainerClasses, props?.class as string)} onclick={()=>toggle(id)} >
  {#if children}
  <div
    class="theui-fab-items {animationClass(animate)}"
    class:fab-vertical={direction == "vertical"}
    class:fab-horizontal={direction == "horizontal"}
    class:open class:pointer-events-none={!open}
    class:group-hover:pointer-events-auto={open}
  >
    {@render children?.()}
  </div>
  {/if}
  <FabButton {href}/>
</div>

<style lang="postcss">
  .theui-fab-items{
    @apply gap-4 opacity-0 hidden;
  }
  .theui-fab-items.fab-vertical{
    @apply flex-col pb-4 translate-y-2;
  }
  .theui-fab-items.fab-horizontal{
    @apply flex-row pr-4 translate-x-2;
  }

  .theui-fab.open .theui-fab-items.fab-vertical, .theui-fab.open .theui-fab-items.fab-horizontal{
    @apply opacity-100 ease-out flex;
  }
  .theui-fab.open .theui-fab-items.fab-vertical{
    @apply translate-y-0;
  }
  .theui-fab.open .theui-fab-items.fab-horizontal{
    @apply translate-x-0;
  }
</style>