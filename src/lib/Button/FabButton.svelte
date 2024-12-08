<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, generateToken, roundedClass } from "$lib/function.core"
	import type { ANIMATE_SPEED, ROUNDED } from "$lib/types";

  interface Props {
    children?:Snippet,
    animate?: ANIMATE_SPEED,
    href?: string|undefined,
    size?: 'sm' | 'md' | 'lg' | 'xl',
    rounded?: ROUNDED,
    iconClasses?: string,
    [key: string]: unknown
  }
  
  let CTX: any = getContext('FAB') as any
  let {
    children,
    animate = "normal",
    href = undefined,
    size = CTX?.size ?? "md",
    rounded = CTX?.rounded ?? "full",
    iconClasses = "",
    ...props
  } : Props = $props()

  let id: string = `${generateToken()}-fab-btn`

  let fabItemSize  = {sm: "w-10 h-10", md: "w-12 h-12", lg: "w-14 h-14", xl: "w-16 h-16"}
  let iconSizeClasses = {sm: "w-[1em] h-[1em]", md: "w-[1.25em] h-[1.25em]", lg: "w-[1.5em] h-[1.5em]", xl: "w-[1.75em] h-[1.75em]"}

  let fabItemClasses = `flex items-center justify-center bg-brand-primary-500 text-on-brand-primary-500 shadow-2xl hover:bg-brand-primary-600 ${fabItemSize[size]}${roundedClass(rounded)}${animationClass(animate)}`
</script>

<svelte:element
  {id}
  {href}
  this={href ? "a" : "button"}
  role={href ? "link" : "button"}
  class={twMerge(fabItemClasses, props?.class as string)}
  aria-label={"button"} {...props}>
  <span class={twMerge(CTX?.iconClasses, iconSizeClasses[size])}>
    {#if children}
      {@render children()}
    {:else}
      <svg viewBox="64 64 896 896" focusable="false" fill="currentColor" aria-hidden="true"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"></path></svg>
    {/if}
  </span>
</svelte:element>
