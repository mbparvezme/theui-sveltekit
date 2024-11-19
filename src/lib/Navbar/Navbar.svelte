<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED, RESPONSIVE_NAV_ON, MOBILE_NAV_ON } from "$lib/types"
	import { setContext, type Snippet } from "svelte"
  import { onMount } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, roundedClass, generateToken } from "$lib/functions"
  import { ST_MOBILE_NAV } from "$lib/state.svelte"

  interface Props {
    children: Snippet,
    segment ?: string,
    activeLinkStyle ?: string,
    animate ?: ANIMATE_SPEED,
    height ?: 'sm' | 'md' | 'lg' | 'xl' | 'string',
    linkStyle ?: string,
    mobileNavOn ?: 'md' | 'lg' | 'xl' | false,
    navInnerClasses ?: string,
    navCollapseClasses ?: string,
    rounded ?: ROUNDED,
    scrollAmountToHide ?: number,
    scrollAmountToShrink ?: number,
    scrollBehavior ?: 'fixed' | 'default' | 'shrinkOnScrollDown' | 'hideOnScrollDown' | 'shrinkAndHide',
    scrollClass ?: string,
    [key: string] : unknown
  }

  let {
    children,
    segment = "/",
    activeLinkStyle = "",
    animate = "fast",
    height = "md",
    linkStyle = "",
    mobileNavOn = "lg",
    navInnerClasses = "",
    navCollapseClasses = "",
    rounded = "none",
    scrollAmountToHide = 64,
    scrollAmountToShrink = 32,
    scrollBehavior = "shrinkAndHide",
    scrollClass = "",
    ...props
  } : Props = $props()

  let heightCls = {sm: "h-12", md: " h-16", lg: " h-20", xl: " h-24"}
  let miniNav = $state(false)
  let hideNav = $state(false)
  let id: string = generateToken()
  let scrollPos = 0

  let config: Exclude<Props, typeof segment | typeof children> = {
    activeLinkStyle : twMerge("p-3 text-default text-sm", activeLinkStyle),
    animate,
    height,
    navInnerClasses,
    navCollapseClasses,
    linkStyle: twMerge("p-3 text-gray-700 dark:text-gray-300 hover:text-default text-sm", linkStyle, heightCls[height], roundedClass(rounded)),
    mobileNavOn,
    rounded,
    scrollAmountToHide,
    scrollAmountToShrink,
    scrollBehavior,
    scrollClass: twMerge("bg-white dark:bg-secondary shadow-black/10 shadow-2xl md:px-4", scrollClass),
  }

  onMount(() => {
    // let navbar = document.querySelector(".theui-navbar")
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

  let navClass = $derived(`bg-primary left-0 top-0 w-full flex items-center justify-center ${animationClass(animate)} 
                  ${(miniNav||(hideNav===false && scrollPos!==0) ? scrollClass : "")}${roundedClass(config?.rounded)}`);

  let navInnerClass = $derived(`nav-inner w-full max-w-[var(--max-width)] flex grow gap-x-8 items-center justify-between relative
                      ${heightCls[height as "sm" | "md" | "lg" | "xl"] ?? height as string}
                      ${animationClass(animate)} ${(miniNav||(hideNav===false && scrollPos!==0) ? " px-4" : " px-8")}`)

  let responsiveClasses = () => {
    // Determine mobile nav responsive classes
    let responsiveClassesByBreakPoints: RESPONSIVE_NAV_ON = {
      xl : "xl-collapse 2xl:flex-row 2xl:items-center 2xl:basis-auto 2xl:static 2xl:left-auto 2xl:right-auto 2xl:top-auto 2xl:flex 2xl:overflow-visible 2xl:shadow-none 2xl:px-0 2xl:py-0 2xl:bg-transparent ",
      lg : "lg-collapse xl:flex-row xl:items-center xl:basis-auto xl:static xl:left-auto xl:right-auto xl:top-auto xl:flex xl:overflow-visible xl:shadow-none xl:px-0 xl:py-0 xl:bg-transparent ",
      md : "md-collapse lg:flex-row lg:items-center lg:basis-auto lg:static lg:left-auto lg:right-auto lg:top-auto lg:flex lg:overflow-visible lg:shadow-none lg:py-0 lg:bg-transparent lg:px-0 ",
      sm : "sm-collapse md:flex-row md:items-center md:basis-auto md:static md:left-auto md:right-auto md:top-auto md:flex md:overflow-visible md:shadow-none md:py-0 md:bg-transparent md:px-0 ",
    }
    let navMobileStatusClasses = {
      on: "flex-col basis-full absolute left-0 right-0 top-full order-last lg:order-none shadow-lg px-8 py-4",
      off: "flex-row items-center relative overflow-visible"
    }
    return config.mobileNavOn ? `${navMobileStatusClasses["on"]} ${responsiveClassesByBreakPoints[config.mobileNavOn as MOBILE_NAV_ON] ?? ""}` : navMobileStatusClasses["off"]
  }

  

  setContext('NAV', {config, id, ST_MOBILE_NAV})
</script>

<nav
  {id}
  class:navbar-mini={miniNav}
  class:-top-full={hideNav}
  class:fixed={scrollBehavior !== "default"}
  class="theui-navbar z-20 {twMerge(navClass, props?.class as string)}"
>
  <div class={twMerge(navInnerClass, navInnerClasses)}>
    {@render children()}
  </div>
</nav>