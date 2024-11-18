<script lang="ts">
  import type { TABLE_ROW } from "$lib/types"
  import { getContext, type Snippet } from "svelte"
  import { animationClass } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  // import { TD as Cell } from "$lib"

  interface Props {
    data : Snippet|ArrayLike<string|object>,
    keys ?: string[]|undefined,
    headingRow ?: boolean,
    [key: string] : unknown,
  }

  let {
    data = [],
    keys = undefined,
    headingRow = false,
    ...props
  } : Props = $props()

  const CTX: any = getContext("TABLE")

  let rowClasses = twMerge(`${(!headingRow && (CTX?.border == "both" || CTX?.border == "y")) ? "border-y " : ""}
            ${(CTX?.hover && !headingRow) ? animationClass(CTX?.animate) + " hover:bg-gray-100 dark:hover:bg-gray-800 " : ""}
            ${typeof CTX?.stripe == "string" ? CTX?.stripe : CTX?.stripe === true ? " even:bg-black/20 dark:even:bg-white/20 " : ""} ${CTX?.borderColor} ${CTX?.trClass||""}`, props.class as string)

  let isMultiRows = (d: any) => (Array.isArray(d) && (Object.prototype.toString.call(d[0]) === "[object Object]" || Array.isArray(d[0])))
</script>

{#if typeof data === "function"}
  <tr {...props} class={rowClasses}>
    {@render data?.()}
  </tr>
{:else}
  {#if isMultiRows(data)}
    <!-- {#each data as r}
      <tr {...props} class={rowClasses}>
      <Cell data={r} {keys} tag={headingRow?"th":"td"} />
    {/each} -->
  {:else}
    <tr {...props} class={rowClasses}>
      {#each data as r}
        <th>{r}</th>
      {/each}
      <!-- <Cell {data} {keys} tag={headingRow?"th":"td"} /> -->
    </tr>
  {/if}
{/if}