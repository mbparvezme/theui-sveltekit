<script lang="ts">
	import type { ANIMATE_SPEED } from "$lib/types"
	import { animationClass } from "$lib/function"
	import { getContext, type Snippet } from "svelte"
	import { twMerge } from "tailwind-merge"

  let CTX = getContext("LISTGROUP") as any

  interface Props {
		children?: Snippet,
		content?: string,
    animate?: ANIMATE_SPEED,
    href?: string,
    type?: 'div'|'li'|'a',
		variant?: 'bordered' | 'flat',
    [key: string]: unknown
	}

  let {
    children,
    content,
    href = undefined,
    type = 'li',
    animate = CTX?.animate ?? "normal",
    variant = CTX?.variant ?? "bordered",
    ...props
  } : Props = $props()

  let itemClasses = `p-4 cursor-pointer hover:bg-gray-100 ${animationClass(animate)}`
</script>

{#if content}
<svelte:element this={href ? "a" : (CTX?.childrenType ?? type)} class="list-item {twMerge(itemClasses, CTX?.itemClasses, props?.class as string)}">

	{#if content}
		{@html content}
	{:else if children}
		{@render children()}
	{/if}

</svelte:element>
{/if}