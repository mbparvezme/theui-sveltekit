<script lang="ts">
	import { roundedClass } from "$lib/function.core";
	import type { ANIMATE_SPEED, ROUNDED } from "$lib/types";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

  interface Props {
		children: Snippet,
    animate?: ANIMATE_SPEED,
		rounded?: ROUNDED,
		variant?: 'bordered' | 'flat',
    itemClasses?: string,
    type?: 'div'|'ul',
    childrenType?: 'div'|'li'|'a',
    [key: string]: unknown
	}

  let {
    children,
    animate = "normal",
    rounded = "md",
    variant = "bordered",
    itemClasses = "",
    type = "ul",
    childrenType = "li",
    ...props
  } : Props = $props()

  let groupClasses = `overflow-hidden divide-y divide-gray-200 ${variant == "bordered" ? "border border-gray-200" : ""}${roundedClass(variant=="flat"?"none":rounded)}`

  setContext("LISTGROUP", {animate, childrenType, variant, itemClasses})
</script>

{#if children}
<svelte:element this={type} class="list-group {twMerge(groupClasses, props?.class as string)}">
  {@render children()}
</svelte:element>
{/if}