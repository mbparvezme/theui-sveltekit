<script lang="ts">
  import type { TABLE_ROW } from "$lib/types"
  import { getContext } from "svelte"
  import { getAnimate } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  import { TABLE, TD as Cell } from "$lib"
  const { config } = getContext(TABLE)

  export let data : TABLE_ROW	= undefined
  export let keys : string[]|undefined = undefined
  export let headingRow : boolean = false

  let getRowClass = () => {
    let cls = config?.borderColor + " " + (config?.trClass||"")
    return  ((!headingRow && (config?.border == "both" || config?.border == "y")) ? "border-y " : "") + 
            ((config?.hover && !headingRow) ? getAnimate(config?.animate) + " hover:bg-gray-100 dark:hover:bg-gray-800 " : "") +
            (typeof config?.stripe == "string" ? config?.stripe : config?.stripe === true ? " even:bg-gray-50 dark:even:bg-gray-800/50 " : "") + " " + cls
  }

  let isMultiRows = (d: any) => (Array.isArray(d) && (Object.prototype.toString.call(d[0]) === "[object Object]" || Array.isArray(d[0])))
</script>

{#if !data}
  <tr {...$$restProps} class={twMerge(getRowClass(), $$props.class)}>
    <slot />
  </tr>
{:else}
  {#if isMultiRows(data)}
    {#each data as r}
      <tr {...$$restProps} class={twMerge(getRowClass(), $$props.class)}>
        <Cell data={r} {keys} tag={headingRow?"th":"td"} />
      </tr>
    {/each}
  {:else}
    <tr {...$$restProps} class={twMerge(getRowClass(), $$props.class)}>
      <Cell {data} {keys} tag={headingRow?"th":"td"} />
    </tr>
  {/if}
{/if}