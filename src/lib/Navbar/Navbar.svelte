<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types";
	import { setContext } from "svelte";
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { animationClass, roundedClass, generateToken } from "$lib/functions";
  import { ST_MOBILE_NAV } from "$lib/state.svelte";

  type RESPONSIVE_NAV_ON = { xl: string; md: string; lg: string };
  type MOBILE_NAV_ON = keyof RESPONSIVE_NAV_ON;

  interface Props {
    segment ?: string,
    activeLinkStyle ?: string,
    animate ?: ANIMATE_SPEED,
    height ?: 'sm' | 'md' | 'lg' | 'xl',
    linkStyle ?: string,
    mobileNavOn ?: 'md' | 'lg' | 'xl' | false,
    navInnerClasses ?: string,
    rounded ?: ROUNDED,
    scrollAmountToHide ?: number,
    scrollAmountToShrink ?: number,
    scrollBehavior ?: 'fixed' | 'default' | 'shrinkOnScrollDown' | 'hideOnScrollDown' | 'shrinkAndHide',
    scrollClass ?: string,
    [key: string] : unknown
  }

  let {
    segment = "/",
    activeLinkStyle = "p-3 text-default text-sm",
    animate = "fast",
    height = "md",
    linkStyle = "p-3 text-gray-700 dark:text-gray-300 hover:text-default text-sm",
    mobileNavOn = "lg",
    navInnerClasses = "",
    rounded = "none",
    scrollAmountToHide = 64,
    scrollAmountToShrink = 32,
    scrollBehavior = "shrinkAndHide",
    scrollClass = "bg-white dark:bg-secondary shadow-black/10 shadow-2xl md:px-4",
    ...props
  } : Props = $props()

  let config: Exclude<Props, typeof segment> = {
    activeLinkStyle,
    animate,
    height,
    navInnerClasses,
    linkStyle,
    mobileNavOn,
    rounded,
    scrollAmountToHide,
    scrollAmountToShrink,
    scrollBehavior,
    scrollClass : "bg-white dark:bg-secondary shadow-black/10 shadow-2xl md:px-4",
  };

  let heightCls = () => height == "sm" ? " h-12" : height == "lg" ? " h-20" : height == "xl" ? " h-24" : " h-16";

  let miniNav = $state(false);
  let hideNav = $state(false);

  let id: string = generateToken();
  let scrollPos = 0;

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
  setContext('NAV', {config, id, ST_MOBILE_NAV});

  let navClass = () => `bg-primary left-0 top-0 w-full flex items-center justify-center ${animationClass(animate)} ${(miniNav||(hideNav===false && scrollPos!==0) ? scrollClass : "")}`;
  let navInnerClass = () => `nav-inner w-full max-w-[var(--max-width)] flex grow gap-x-8 items-center justify-between relative ${heightCls()} ${animationClass(animate)} ${(miniNav||(hideNav===false && scrollPos!==0) ? " px-4" : " px-8")}`;

  // Determine mobile nav responsive classes
  let responsiveClassesByBreakPoints: RESPONSIVE_NAV_ON = {
    "xl" : "xl-collapse 2xl:flex-row 2xl:items-center 2xl:basis-auto 2xl:static 2xl:left-auto 2xl:right-auto 2xl:top-auto 2xl:flex 2xl:overflow-visible 2xl:shadow-none 2xl:px-0 2xl:py-0 2xl:bg-transparent ",
    "md" : "md-collapse lg:flex-row lg:items-center lg:basis-auto lg:static lg:left-auto lg:right-auto lg:top-auto lg:flex lg:overflow-visible lg:shadow-none lg:py-0 lg:bg-transparent lg:px-0 ",
    "lg" : "lg-collapse xl:flex-row xl:items-center xl:basis-auto xl:static xl:left-auto xl:right-auto xl:top-auto xl:flex xl:overflow-visible xl:shadow-none xl:px-0 xl:py-0 xl:bg-transparent "
  };
  let responsiveBasedClasses: string;
  if (config.mobileNavOn) {
    responsiveBasedClasses = " flex-col basis-full absolute left-0 right-0 top-full order-last lg:order-none shadow-lg px-8 py-4 ";
    if(responsiveClassesByBreakPoints[config.mobileNavOn as MOBILE_NAV_ON])
      responsiveBasedClasses += responsiveClassesByBreakPoints[config.mobileNavOn as MOBILE_NAV_ON];
  }else{
    responsiveBasedClasses = " flex-row items-center relative overflow-visible";
  }

  let navCollapseClasses = () => "theui-navbar-collapse flex-grow z-[1]" + responsiveBasedClasses + twMerge(("max-h-[80vh] bg-primary" + roundedClass(config?.rounded)), props?.class as string);
</script>

<nav
  {id}
  class:navbar-mini={miniNav}
  class:-top-full={hideNav}
  class:fixed={scrollBehavior !== "default"}
  class="theui-navbar z-20 {twMerge(navClass(), props?.class as string)}"
>
  <div class={twMerge(navInnerClass(), navInnerClasses)}>
    <div
        class={navCollapseClasses()}
        class:flex={!config.mobileNavOn || ST_MOBILE_NAV.value.includes(id)}
        class:hidden={config.mobileNavOn != false && !ST_MOBILE_NAV.value.includes(id)}
        class:overflow-hidden={config.mobileNavOn != false && !ST_MOBILE_NAV.value.includes(id)}
        class:overflow-auto={config.mobileNavOn != false && ST_MOBILE_NAV.value.includes(id)}>
        <slot {segment}></slot>
    </div>
  </div>
</nav>