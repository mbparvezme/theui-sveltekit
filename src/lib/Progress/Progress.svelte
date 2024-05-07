<script lang="ts">
  import { twMerge } from "tailwind-merge"
  import { onMount } from "svelte"
  import { getRounded, generateToken } from "$lib/functions"

  export let id         : string = generateToken()
  export let label      : string|null = null
  export let start      : number = 0
  export let end        : number
  export let barClass   : string = ""
  export let thickness  : 'px' | 'sm' | 'md' | 'lg' | 'xl' = "md"
  export let vertical   : boolean = false

  $: startPoint = start
  $: endsPoint = end

  let getThickness = (): string => {
    return vertical ? (thickness == "px" ? "w-px " : thickness == "sm" ? "w-1 " : thickness == "md" ? "w-2 " : thickness == "lg" ? "w-4 " : "w-6 ") :
                      (thickness == "px" ? "h-px " : thickness == "sm" ? "h-1 " : thickness == "md" ? "h-2 " : thickness == "lg" ? "h-4 " : "h-6 ")
  }

  let trackCls = () => {
    let cls = "theui-progress " + getThickness() + (vertical ? "inline-flex h-full" : "flex w-full") + " overflow-hidden relative select-none "
    return cls + twMerge(("text-on-brand text-xs bg-tertiary" + getRounded("full")), $$props?.class)
  }
  let barCls = () => {
    let cls = "progress-bar absolute "
    return cls + twMerge(("flex items-center justify-center bg-brand " + getRounded("full")), barClass)
  }

  onMount(() => setBar())
  $: setBar = () => {
    let bar = document.querySelector(`#${id} .progress-bar`)
    if(vertical){
      (bar as HTMLElement).style.inset = `${startPoint}% 0 ${100 - endsPoint}% 0`
    }else{
      (bar as HTMLElement).style.inset = `0 ${100 - endsPoint}% 0 ${startPoint}%`
    }
  }
</script>

<div {id} class={trackCls()}>
  <div class={barCls()}>
    {#if label}<span class="progress-label">{label}</span>{/if}
  </div>
</div>
