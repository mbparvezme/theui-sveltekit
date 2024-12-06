<script lang="ts">
	import { generateToken } from "$lib/function.core"
	import { getContext, type Snippet } from "svelte"
	import { twMerge } from "tailwind-merge";

  interface Props {
    children?: Snippet,
    type?: 'div'|'section'|'p'|'img',
    href?: string|undefined,
    [key: string] : unknown
  }

  let {
    children,
    type = 'div',
    href,
    ...props
  } : Props = $props()

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any
  CTX.slides.push(id)
</script>

{#if children}
<svelte:element this={type} {...props} class="slide {twMerge('relative flex-shrink-0 w-full h-48 flex items-center justify-center', CTX?.slideClasses, props?.class as string)}">
  {@render children()}
  {#if href}
    <a class="absolute inset-0" aria-hidden="true" href={href}></a>
  {/if}
</svelte:element>
{/if}