<script lang="ts">
  import type { PRELOAD } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getContext, type Snippet } from "svelte"

  const CTX : {
		activeClasses: string,
		linkClasses: string,
		dividerClass: string,
		headerClass: string,
  } = getContext('DROPDOWN_CTX')

  interface Props {
    startItem ?: Snippet,
    endItem ?: Snippet,
    children ?: Snippet,
    text ?: string,
    url ?: string|undefined,
    preload ?: PRELOAD,
    type ?: 'link' | 'divider' | 'header' | 'button'
    active ?: boolean,
    [key: string]: unknown
  }

  let {
    startItem,
    endItem,
    children,
    text,
    url = undefined,
    preload = "hover",
    type = "link",
    active = false,
    ...props
  } : Props = $props()

  let itemClass = (t: Props['type']) => {
    const typeClasses: Record<Exclude<Props['type'], undefined>, string> = {
      link: active ? CTX.activeClasses : CTX.linkClasses,
      button: active ? CTX.activeClasses : CTX.linkClasses,
      header: CTX.headerClass,
      divider: CTX.dividerClass,
    }
    return t ? twMerge(typeClasses[t], props?.class as string) : "";
  }
</script>

{#snippet content()}
  {@render startItem?.()}

  {#if text}
		{@html text}
	{:else if children}
		{@render children()}
	{/if}

  {#if endItem}
    <div class="ms-auto flex items-center">{@render endItem()}</div>
  {/if}
{/snippet}

{#if type=="divider"}
  <li class="dropdown-item {itemClass("divider")}" role="presentation"></li>
{:else}
  <li class="dropdown-item" role={type=="header" ? "heading" : "menuitem"}>
    {#if type == "header"}
      <h6 class={itemClass(type)}>
        {@render content()}
      </h6>
    {:else}
      {#if url}
        <a href={url} class={itemClass(type)} data-sveltekit-preload-data={preload||preload}>
          {@render content()}
        </a>
      {:else}
        <button class={itemClass(type)}>
          {@render content()}
        </button>
      {/if}
    {/if}
  </li>
{/if}