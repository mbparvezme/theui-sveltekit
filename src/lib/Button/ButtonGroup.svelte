<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED, BUTTON_SIZE } from "$lib/types"
  import { setContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { roundedClass } from "$lib/functions"

  interface Props {
    buttons : Snippet,
    stacked  ?: boolean,
    variant  ?: 'bordered' | 'flat',
    animate ?: ANIMATE_SPEED,
    ariaLabel ?: string|undefined,
    buttonClass ?: string, // Not tested
    outline ?: boolean,
    rounded ?: ROUNDED,
    size ?: BUTTON_SIZE,
    square ?: boolean,
    theme ?: 'default' | 'light' | 'gradient'
    color ?: 'brand' | 'error' | 'info' | 'success' | 'warning',
    gradientColors ?: 'brand' | 'error' | 'info' | 'success' | 'warning',
    [key: string]: unknown // dismissible, icon
  }

  let {
    buttons,
    stacked = false,
    variant = "bordered",
    ariaLabel = "Button group",
    animate = "normal",
    buttonClass = "",
    color = "brand",
    gradientColors = "brand",
    outline = false,
    rounded = "md",
    size = "md",
    square = false,
    theme = "default",
    ...props
  } : Props = $props()

  setContext('BUTTON_GROUP_CTX', {
    group: true,
    stacked,
    variant,

    animate,
    buttonClass,
    color,
    gradientColors,
    outline,
    rounded,
    size,
    square,
    theme,
  });

  let getClass = twMerge(`theui-btn-group inline-flex${roundedClass(rounded)}`, (props?.class as string ?? ""))
</script>

<div class={getClass} class:flex-col={stacked} class:theui-btn-stacked={stacked} role="group" aria-label={ariaLabel}>
  {@render buttons?.()}
</div>