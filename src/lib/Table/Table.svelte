<script lang="ts">
  import type { ANIMATE_SPEED, TABLE_ROW } from "$lib/types"
	import { setContext, type Snippet } from "svelte"
  import { generateToken } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  import { THead } from "$lib"

  interface Props {
    headers       ?: Snippet|string[],
    data          ?: TABLE_ROW,
    keys          ?: string[]|undefined,

    id            ?: string,
    animate       ?: ANIMATE_SPEED,
    border        ?: 'x' | 'y' | 'both' | 'none',
    borderColor   ?: string,
    hover         ?: boolean | string,
    space         ?: 'compact' | 'default' | 'comfortable' | string,
    stripe        ?: boolean | string,
    trClass       ?: string,
    [key: string] : unknown
  }

  let {
    headers,
    data = undefined,
    keys = undefined,
    id = generateToken(),
    animate = "normal",
    border = "both",
    borderColor = "border-gray-200/80 dark:border-gray-800/80",
    hover = false,
    space = "default",
    stripe = false,
    trClass = "",
    ...props
  } : Props = $props()

  setContext('TABLE', {
    animate,
    border,
    borderColor,
    hover,
    space,
    stripe,
    trClass,
  })

  let cls = twMerge(`theui-table w-full text-start border-collapse ${border=="x" ? `border-x ${borderColor}` : ""}`, (props?.class??"") as string)
</script>

<div class="table-container w-full overflow-x-auto">
  <table {id} {...props} class={cls}>
    {#if headers}
      {#if typeof headers === "function"}
        {@render headers?.()}
      {/if}
      {#if typeof headers === "object"}
        <THead {headers}/>
      {/if}
    {/if}
<!-- 
    {#if data}
      <TBody {data} {keys}/>
    {/if} -->
  </table>
</div>