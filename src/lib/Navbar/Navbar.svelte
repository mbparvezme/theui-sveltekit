<script context="module">
	export const NAV = {}
</script>

<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
	import { setContext } from "svelte"
  import { onMount } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { getAnimate, generateToken } from "$lib/functions"
  import { mobileNav } from "$lib/stores"
  export let segment: string = "/"

  // export let config: NAV_CONFIG = {}
  // Object.assign(C, config)

  export let activeLinkStyle       : string = "p-3 text-default text-sm"
  export let animate               : ANIMATE_SPEED = "fast"
  export let height                : 'sm' | 'md' | 'lg' | 'xl' = "md"
  export let navInner              : string = ""
  export let linkStyle             : string = "p-3 text-gray-700 dark:text-gray-300 hover:text-default text-sm"
  export let responsive            : 'md' | 'lg' | 'xl' | false = "lg"
  export let rounded               : ROUNDED = "md"
  export let scrollAmountToHide    : number = 64
  export let scrollAmountToShrink  : number = 32
  export let scrollBehavior        : 'fixed' | 'default' | 'shrinkOnScrollDown' | 'hideOnScrollDown' | 'shrinkAndHide' = "shrinkAndHide"
  export let scrollClass           : string = "bg-white dark:bg-secondary shadow-black/10 shadow-2xl md:px-4"

  let config: {
    activeLinkStyle ?: string,
    animate ?: ANIMATE_SPEED,
    height ?: 'sm' | 'md' | 'lg' | 'xl',
    navInner ?: string,
    linkStyle ?: string,
    responsive ?: 'md' | 'lg' | 'xl' | false, 
    rounded ?: ROUNDED,
    scrollAmountToShrink ?: number,
    scrollAmountToHide ?: number,
    scrollBehavior ?: 'fixed' | 'default' | 'shrinkOnScrollDown' | 'hideOnScrollDown' | 'shrinkAndHide' // 'shrinkAndHide'
    scrollClass ?: string,
  } = {
    activeLinkStyle,
    animate,
    height,
    navInner,
    linkStyle,
    responsive,
    rounded,
    scrollAmountToHide,
    scrollAmountToShrink,
    scrollBehavior,
    scrollClass,
  }

  let heightCls = () => height == "sm" ? " h-12" : height == "lg" ? " h-20" : height == "xl" ? " h-24" : " h-16"

  $: miniNav = false
  $: hideNav = false

  let id: string = generateToken()
  let scrollPos = 0
  onMount(() => {
    let navbar = document.querySelector(".theui-navbar")
    window.addEventListener("scroll", () => {
      // Shrink Navbar
      if(scrollBehavior === "shrinkOnScrollDown" || scrollBehavior === "shrinkAndHide") {
        miniNav = (window.scrollY >= scrollAmountToShrink!)
      }
      // Set / Reset Navbar
      if(scrollBehavior === "hideOnScrollDown" || scrollBehavior === "shrinkAndHide") {
        if (document.body.getBoundingClientRect().top > scrollPos) {
          // miniNav = true
          hideNav = false
        } else {
          if (scrollPos == 0) {
            if (window.scrollY > scrollAmountToHide!) hideNav = true
          } else hideNav = true
        }
        scrollPos = window.scrollY >= scrollAmountToHide! ? document.body.getBoundingClientRect().top : 0
      }
    })
  })
  setContext(NAV, {config, id, mobileNav})

  let navClass = () => {
    return "bg-primary left-0 top-0 w-full flex items-center justify-center" + getAnimate(animate) +
              (miniNav||(hideNav===false && scrollPos!==0) ? scrollClass : "")
  }

  let navInnerClass = () => {
    return "nav-inner w-full max-w-[var(--max-width)] flex grow gap-x-8 items-center justify-between relative" + navInner + heightCls() + getAnimate(animate) +
              (miniNav||(hideNav===false && scrollPos!==0) ? "px-4" : "px-8")
  }
</script>

<div class="w-full max-w-[var(--max-width)] items-center relative">
  <slot name="topbar"></slot>
</div>

<nav
  {id}
  class:navbar-mini={miniNav}
  class:navbar-hidden={hideNav}
  class:fixed={scrollBehavior !== "default"}
  class="theui-navbar z-20 {twMerge(navClass(), $$props?.class)}"
>
  <div class="{twMerge(navInnerClass(), navInner)} kkk">
    <slot {segment}></slot>
  </div>
</nav>

<style lang="postcss">
  :global(.theui-navbar.navbar-hidden) {
    @apply -top-full;
  }
</style>
