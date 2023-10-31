<script lang="ts">
  import { twMerge } from "tailwind-merge"
  export let size         : number = 1
  export let stroke       : boolean = false

  let focusable : "true"|"false" = "true"
  let viewBox : string = "0 0 16 16"
  let cls = "theui-svg-icon shrink-0 " + (stroke ? "stroke-current fill-transparent" : "fill-current")
</script>

<svg
  {focusable}
  {viewBox}
  width="{size}rem" height="{size}rem"
  {...$$restProps}
  class={twMerge(cls, $$props?.class)}
  class:stroke-icon={stroke}
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <slot />
</svg>
