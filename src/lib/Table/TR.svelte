<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { animationClass } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  import { Cell } from "$lib"

  interface Props {data: Snippet|Array<string>|Record<string, unknown>, keys?: string[], tableHeader?: boolean, [key: string]: unknown}
  let {data, keys, tableHeader = false, ...props} : Props = $props()
  const CTX: any = getContext("TABLE")

  let rowClasses = twMerge(`${(!tableHeader && (CTX?.border == "both" || CTX?.border == "y")) ? "border-y " : ""}
            ${(CTX?.hover && !tableHeader) ? `${animationClass(CTX?.animate)} hover:bg-gray-200 dark:hover:bg-gray-800 ` : ""}
            ${typeof CTX?.stripe == "string" ? CTX?.stripe : CTX?.stripe === true ? " even:bg-gray-100 dark:even:bg-gray-900 " : ""}
            ${CTX?.borderColor} ${CTX?.trClass||""}`, props?.class as string)
</script>

{#if typeof data === "function"}
  <tr {...props} class={rowClasses}>
    {@render data?.()}
  </tr>
{:else}
  <tr {...props} class={rowClasses}>
    {#if Array.isArray(data)}
      {#each data as d}
        <Cell tag={tableHeader ? "th" : "td"} data={d.toString()} />
      {/each}
    {/if}

    {#if keys && data !== null && Object.prototype.toString.call(data) === "[object Object]"}
      {#each keys as k}
        <Cell tag={tableHeader ? "th" : "td"} data={(data as Record<string, unknown>)[k] as string | number ?? "INVALID_KEY"} />
      {/each}
    {/if}
  </tr>
{/if}