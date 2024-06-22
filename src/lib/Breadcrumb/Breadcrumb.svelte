<script lang="ts">
  import type { ROUNDED, BREADCRUMB_DATA } from "$lib/types";
  import { twMerge } from "tailwind-merge";
  import { getRounded } from "$lib/functions";

  export let data:            BREADCRUMB_DATA = [];
  export let activeLinkClass: string = "text-gray-400";
  export let linkClass:       string = "text-brand-500";
  export let round:           ROUNDED = "md";
  export let separator:       string = "/";

  let getLinkCls = (url: any) => `before:text-black/30 dark:before:text-white/30 ${url ? linkClass : activeLinkClass}`;
</script>

<nav aria-label="breadcrumb" class="theui-breadcrumb {twMerge("p-4 text-gray-400 dark:text-gray-700", $$props?.class)}{getRounded(round)}">
  <ol class="breadcrumb-list flex">
    {#each data as item, i}
      <li class="breadcrumb-item" class:before:pr-2={i!=0} class:before:pl-2={i!=0} class:active={!item.url} style="--breadcrumb-separator:'{separator}'">
        {#if !item?.url}
          <span class={getLinkCls(item?.url)}>{item.text}</span>
        {:else}
          <a class={getLinkCls(item?.url)} href={item.url}>{item.text}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style lang="postcss">
  .theui-breadcrumb .breadcrumb-item:not(:first-child)::before {
    content: var(--breadcrumb-separator);
  }
</style>