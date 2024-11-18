<script lang="ts">
  import type { ANIMATE_SPEED, TABLE_ROW } from "$lib/types"
	import { setContext, type Snippet } from "svelte"
  import { generateToken } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  import { THead, TBody } from "$lib"

  interface Props {
    head          ?: Snippet,
    body          ?: Snippet,
    headers       ?: string[]|Record<string, unknown>,
    data          ?: TABLE_ROW,
    keys          ?: string[],
    id            ?: string,
    animate       ?: ANIMATE_SPEED,
    border        ?: 'x' | 'y' | 'both' | 'none',
    borderColor   ?: string,
    hover         ?: boolean | string,
    space         ?: 'compact' | 'default' | 'comfortable',
    stripe        ?: boolean | string,
    trClasses     ?: string,
    thClasses     ?: string,
    tdClasses     ?: string,
    [key: string] : unknown
  }

  let {
    head,
    body,
    headers,
    data,
    keys,
    id = generateToken(),
    animate = "normal",
    border = "both",
    borderColor = "border-gray-200/80 dark:border-gray-800/80",
    hover = false,
    space = "default",
    stripe = false,
    trClasses = "",
    thClasses = "",
    tdClasses = "",
    ...props
  } : Props = $props()

  setContext('TABLE', {
    animate,
    border,
    borderColor,
    hover,
    space,
    stripe,
    trClasses,
    thClasses,
    tdClasses,
  })

  let cls = `theui-table w-full text-start border-collapse ${border=="x" ? `border-x ${borderColor}` : ""}`
</script>

<div class="table-container w-full overflow-x-auto">
  <table {id} {...props} class={twMerge(cls, props?.class as string)}>
    {#if head}
      {@render head?.()}
    {:else}
      {#if headers && (Object.prototype.toString.call(headers) === "[object Object]" || Array.isArray(headers))}
        <THead {headers} {keys} />
      {/if}
    {/if}

    {#if body}
      {@render body?.()}
    {:else}
      {#if data}
        <TBody {data} {keys}/>
      {/if}
    {/if}
  </table>
</div>