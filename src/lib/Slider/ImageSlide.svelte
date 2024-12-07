<script lang="ts">
	import { generateToken } from "$lib/function.core"
	import { getContext, type Snippet } from "svelte"
	import { getSlideClasses } from "./slider"

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
  <enhanced:img {src} {alt} {...props} />
  {#if href}
    <a class="absolute inset-0" aria-hidden="true" href={href}></a>
  {/if}
</div>