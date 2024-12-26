<script lang="ts">
	import { getContext, type Snippet } from "svelte"
	import { generateToken } from "$lib/function"
  import { getSlideClasses } from "./slider"

  interface Props {
    children?: Snippet,
    type?: 'div'|'section'|'p'|'img',
    href?: string|undefined,
    [key: string] : unknown
  }

  let {children, type = 'div', href, ...props} : Props = $props()

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any
  CTX.slides.push(id)
</script>

{#if children}
<svelte:element this={type} class="slide {getSlideClasses(CTX?.slideClasses, props?.class as string)}">
  {@render children()}
  {#if href}
    <a class="absolute inset-0" aria-hidden="true" href={href}></a>
  {/if}
</svelte:element>
{/if}