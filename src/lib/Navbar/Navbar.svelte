<script context="module">
	export const NAV = {}
</script>

<script>import { setContext } from "svelte";
import { onMount } from "svelte";
import { twMerge } from "tailwind-merge";
import { getAnimate, generateToken } from "../functions";
import { mobileNav } from "../stores";

import Collapse from "./NavCollapse.svelte"

export let segment = "/";
export let activeLinkStyle = "p-3 text-default text-sm";
export let animate = "fast";
export let height = "md";
export let linkStyle = "p-3 text-gray-700 dark:text-gray-300 hover:text-default text-sm";
export let mobileNavOn = "lg";
export let navInner = "";
export let rounded = "md";
export let scrollAmountToHide = 64;
export let scrollAmountToShrink = 32;
export let scrollBehavior = "shrinkAndHide";
export let scrollClass = "bg-white dark:bg-secondary shadow-black/10 shadow-2xl md:px-4";
let config = {
    activeLinkStyle,
    animate,
    height,
    navInner,
    linkStyle,
    mobileNavOn,
    rounded,
    scrollAmountToHide,
    scrollAmountToShrink,
    scrollBehavior,
    scrollClass,
};
let heightCls = () => height == "sm" ? " h-12" : height == "lg" ? " h-20" : height == "xl" ? " h-24" : " h-16";
$: miniNav = false;
$: hideNav = false;
let id = generateToken();
let scrollPos = 0;
onMount(() => {
    let navbar = document.querySelector(".theui-navbar");
    window.addEventListener("scroll", () => {
        // Shrink Navbar
        if (scrollBehavior === "shrinkOnScrollDown" || scrollBehavior === "shrinkAndHide") {
            miniNav = (window.scrollY >= scrollAmountToShrink);
        }
        // Set / Reset Navbar
        if (scrollBehavior === "hideOnScrollDown" || scrollBehavior === "shrinkAndHide") {
            if (document.body.getBoundingClientRect().top > scrollPos) {
                // miniNav = true
                hideNav = false;
            }
            else {
                if (scrollPos == 0) {
                    if (window.scrollY > scrollAmountToHide)
                        hideNav = true;
                }
                else
                    hideNav = true;
            }
            scrollPos = window.scrollY >= scrollAmountToHide ? document.body.getBoundingClientRect().top : 0;
        }
    });
});
setContext(NAV, { config, id, mobileNav });
let navClass = () => "bg-primary left-0 top-0 w-full flex items-center justify-center" + getAnimate(animate) + (miniNav || (hideNav === false && scrollPos !== 0) ? scrollClass : "");
let navInnerClass = () => "nav-inner w-full max-w-[var(--max-width)] flex grow gap-x-8 items-center justify-between relative" + heightCls() + getAnimate(animate) +
    (miniNav || (hideNav === false && scrollPos !== 0) ? " px-4" : " px-8");
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
  <div class="{twMerge(navInnerClass(), navInner)}">
    <!-- <slot {segment}></slot> -->
    <Collapse>
      <slot {segment}></slot>
    </Collapse>
  </div>
</nav>

<style>
  :global(.theui-navbar.navbar-hidden) {
    top: -100%
}</style>
