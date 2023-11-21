<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"

  export let text     : string  | undefined = undefined
  export let title    : string  | undefined = text
  export let grow     : boolean = false
  export let topFixed : boolean             = false
  export let round    : ROUNDED = "full"

  let getClasses = () => {
    let cls = "items-center justify-center whitespace-nowrap select-none bg-brand text-on-brand inline-block text-[1em] leading-[1em] font-medium p-[.35em] "
    cls += !grow ? "text-xs !leading-[.8em] " : ""
    cls += topFixed ? "absolute transform translate-x-1/2 -translate-y-1/2 top-0 right-0 border-4" : ""
    cls += round !== false ? getRounded(round) : ""
    return cls
  }
</script>

<span class="theui-badge {twMerge(getClasses(), $$props?.class)}{getRounded(round)}">
  {text??""}
  <span class="sr-only">{title??"Badge"}</span>
</span>