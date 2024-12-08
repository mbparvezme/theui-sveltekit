<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { Cell } from "$lib"

  interface Props {children?: Snippet, data?: Array<string>|Record<string, unknown>, keys?: string[], tableHeader?: boolean, [key: string]: unknown}
  let {children, data, keys, tableHeader = false, ...props} : Props = $props()
  const CTX: any = getContext("TABLE")
</script>

{#if children}
  <tr {...props} class={twMerge(tableHeader ? CTX?.trHeadClasses : CTX.trClasses, props?.class as string)}>
    {@render children()}
  </tr>
{:else}
  <tr {...props} class={twMerge(tableHeader ? CTX?.trHeadClasses : CTX.trClasses, props?.class as string)}>
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