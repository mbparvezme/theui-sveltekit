<script lang="ts">
  import { getContext } from "svelte";
  import { NAV } from "$lib";
  import { twMerge } from "tailwind-merge";
  const { config } = getContext(NAV || {}) as any;

  export let align: 'left' | 'right' | 'center' = "left";

  let breakPoint = config.mobileNavOn;

  let navContainerClasses: string = `${!breakPoint ? "items-center flex-row" :
    `${breakPoint == "sm" ? "md:flex-row" : breakPoint == "md" ? "lg:flex-row" : breakPoint == "lg" ? "xl:flex-row" : "2xl:flex-row"}`} flex-col
    ${align === "right" ?
            `${breakPoint === "sm" ? "md:ms-auto " : breakPoint === "md" ? "lg:ms-auto " : breakPoint === "lg" ? "xl:ms-auto " : "2xl:ms-auto "}` :
          align === "center" ?
            `${(breakPoint === "sm" ? "md:mx-auto " : breakPoint === "md" ? "lg:mx-auto " : breakPoint === "lg" ? "xl:mx-auto " : "2xl:mx-auto ")}` :
            `${(breakPoint === "sm" ? "md:me-auto " : breakPoint === "md" ? "lg:me-auto " : breakPoint === "lg" ? "xl:me-auto " : "2xl:me-auto ")}`}`;
</script>

<div class="nav-links flex {twMerge(navContainerClasses, $$props?.class)}">
  <slot />
</div>