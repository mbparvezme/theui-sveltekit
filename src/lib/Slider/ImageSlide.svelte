<script lang="ts">
	import { getContext, type Snippet } from "svelte"
	import { generateToken } from "$lib/function"
	import { getSlideClasses } from "./slider"
	import { twMerge } from "tailwind-merge"

  interface Props {
    src: string,
    alt: string,
    href?: string|undefined,
    [key: string] : unknown
  }

  let {src, alt = "TheUI image slider", href, ...props} : Props = $props()

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any

  CTX.slides.push(id)
</script>

<div class="slide {getSlideClasses(CTX?.slideClasses, "")}">
  <img {src} {alt} {...props} class={twMerge("block w-full", props?.class as string)} />
  {#if href}
    <a class="absolute inset-0" aria-hidden="true" href={href}></a>
  {/if}
</div>