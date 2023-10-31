<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { onMount } from "svelte"
  import { getRounded, generateToken } from "$lib/functions"

  export let id               : string = generateToken()
  export let label            : string|null = null
  export let start            : number = 0
  export let end              : number = 50
  export let rounded          : ROUNDED = "full"
  export let barClass         : string
  export let height           : 'px' | 'sm' | 'md' | 'lg' | 'xl' | 'none' = "md"
  export let roundedProgress  : ROUNDED = "md"

  $: startPoint = start
  $: endsPoint = end

  let getHeight = (): string|void => {
    let h = height
    if(h == "px" || h == "sm" || h == "md" || h == "lg" || h == "xl") {
      return  label ? "" : (h == "px" ? " h-px " : h == "sm" ? " h-1 " : h == "md" ? " h-2 " : h == "lg" ? " h-4 " : " h-6 ")
    }
  }

  onMount(() => {
    let el = document.querySelector(`#${id} .progress-bar`)
    if(el) (el as HTMLElement).style.width = `${endsPoint}%`
  })

  let trackCls = () => "overflow-hidden flex relative select-none text-on-brand text-xs bg-tertiary" + getRounded(rounded)
  let barCls = () => "progress-bar flex items-center justify-center bg-brand " + getHeight() + getRounded(roundedProgress)
</script>

<div {id} class="theui-progress {twMerge(trackCls(), $$props?.class)}">
  <div class={twMerge(barCls(), barClass)}>
    {#if label}<span class="progress-label">{label}</span>{/if}
  </div>
</div>
