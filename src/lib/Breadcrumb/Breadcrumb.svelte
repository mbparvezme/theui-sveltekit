<script lang="ts">
  import type { ROUNDED, BREADCRUMB_DATA } from "$lib/types"
  import { roundedClass } from "$lib/functions"

  interface Props {
    data : BREADCRUMB_DATA,
    activeLinkClass ?: string,
    linkClass ?: string,
    round ?: ROUNDED,
    separator ?: string,
    [key: string]: unknown // dismissible, icon
	}

  let {
    data = [],
    activeLinkClass = "text-gray-400",
    linkClass = "text-brand-primary-500",
    round = "md",
    separator = "/",
    ...props
  } : Props = $props();

  let navClasses = "theui-breadcrumb " + (props?.class ?? "") + roundedClass(round)
  let getLinkCls = (url: any) => `before:text-gray-300 dark:before:text-gray-500 ${url?linkClass:activeLinkClass}${roundedClass(round)}`
</script>

<nav aria-label="breadcrumb" class={navClasses} style="--breadcrumb-separator: '{separator}';">
  <ol class="breadcrumb-list flex">
    {#each data as item, i}
      <li class="breadcrumb-item {getLinkCls(item.url)}" class:before:px-2={i!=0} class:active={!item.url}>
        {#if !item.url}
          {item.text}
        {:else}
          <a href={item.url}>{item.text}</a>
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