<script lang="ts">
  import type { ROUNDED, BREADCRUMB_DATA } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getRounded } from "$lib/functions"

  export let activeColor : string = "text-gray-400"
  export let data : BREADCRUMB_DATA = []
  export let linkColor : string = "text-brand"
  export let round : ROUNDED = "md"
  export let separator : string = "/"

  let getLinkCls = (url: any) => "before:text-gray-300/70 dark:before:text-gray-300/50 " + (url ? linkColor : activeColor)
</script>

<nav aria-label="breadcrumb" class="theui-breadcrumb {twMerge("bg-secondary p-4", $$props?.class)}{getRounded(round)}">
  <ol class="breadcrumb-list flex">
    {#each data as item, i}
      <li class="breadcrumb-item {getLinkCls(item.url)}" class:before:pr-2={i!=0} class:before:pl-2={i!=0} class:active={!item.url} style="--breadcrumb-separator: '{separator}';">
        {#if !item.url} {item.text} {:else} <a href={item.url}>{item.text}</a> {/if}
      </li>
    {/each}
  </ol>
</nav>

<style lang="postcss">
  .theui-breadcrumb .breadcrumb-item:not(:first-child)::before {
    content: var(--breadcrumb-separator);
  }
</style>