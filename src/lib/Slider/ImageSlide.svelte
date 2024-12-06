<script lang="ts">
	import { generateToken } from "$lib/function.core"
	import { getContext, type Snippet } from "svelte"
	import { twMerge } from "tailwind-merge";
  interface Props {
    src: string,
    alt: string,
    href?: string|undefined,
    imageProps?: Record<string, string>,
    [key: string] : unknown
  }

  let {
    src,
    alt,
    href,
    imageProps,
    ...props
  } : Props = $props()

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any
  CTX.slides.push(id)
</script>

<div class="slide {twMerge('relative flex-shrink-0 w-full h-48 flex items-center justify-center', CTX?.slideClasses, props?.class as string)}">
  <enhanced:img src={props?.src as string} alt={props?.alt as string ?? "TheUI image slider"} {...props} />
  {#if href}
    <a class="absolute inset-0" aria-hidden="true" href={href}></a>
  {/if}
</div>