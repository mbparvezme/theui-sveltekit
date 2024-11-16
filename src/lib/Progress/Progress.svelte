<script lang="ts">
  import { twMerge } from "tailwind-merge"
  import { roundedClass, generateToken } from "$lib/functions"

  interface Props {
    id ?: string,
    label ?: string|null,
    start ?: number,
    end ?: number,
    barClass ?: string,
    thickness ?: 'px' | 'sm' | 'md' | 'lg' | 'xl',
    vertical ?: boolean,
    classes ?: string,
  }

  let {
    id = generateToken(),
    label = null,
    start = 0,
    end = 0,
    barClass = "",
    thickness = "md",
    vertical = false,
    classes = "",
  } : Props = $props()

  const sizes: Record<'vertical' | 'default', Record<Exclude<Props['thickness'], undefined>, string>> = {
    vertical: {
      px: "w-px",
      sm: "w-1",
      md: "w-2",
      lg: "w-4",
      xl: "w-6"
    },
    default: {
      px: "h-px",
      sm: "h-1",
      md: "h-2",
      lg: "h-4",
      xl: "h-6"
    }
  }

  let trackCls = () => {
    const sizeClass = vertical ? (sizes['vertical'][thickness] ?? sizes['vertical'].md) : (sizes['default'][thickness] ?? sizes['default'].md)
    return `theui-progress ${sizeClass} ${(vertical ? "inline-flex h-full" : "flex w-full")} overflow-hidden relative select-none ${twMerge(`text-on-brand-primary text-xs bg-secondary ${roundedClass("full")}`, classes)}`
  }

  let barCls = () => `progress-bar absolute ${twMerge(`flex items-center justify-center bg-brand-primary-500 text-on-brand-primary-500 ${roundedClass("full")}`, barClass)}`

  $effect(() => {
    let bar = document.querySelector(`#${id} .progress-bar`)
    if(vertical){
      (bar as HTMLElement).style.inset = `${start}% 0 ${100 - end}% 0`
    }else{
      (bar as HTMLElement).style.inset = `0 ${100 - end}% 0 ${start}%`
    }
  })
</script>

<div {id} class={trackCls()}>
  <div class={barCls()}>
    {#if label}<span class="progress-label">{label}</span>{/if}
  </div>
</div>