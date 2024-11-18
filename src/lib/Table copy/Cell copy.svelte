<script lang="ts">
  import { getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  const  CTX: any = getContext("TABLE")

  export let data : object|Array<string|number>|undefined = undefined
  export let keys : string[]|null = null
  export let tag : "td" | "th" = "td"

  let dataType = (d: any) => Object.prototype.toString.call(d) === "[object Object]" ? "object" : Array.isArray(d) ? "array" : false

  let getCellClass = () => {
    let cls = ((config?.border == "both" || config?.border == "x") ? (config?.borderColor +" border-l border-r ") : " ") + sizeCls(config?.space || "default")
    return cls + (tag=="td" ? " text-gray-600 dark:text-gray-400 font-normal" : " font-medium text-sm")
  }

  let sizeCls = (space: string) => tag=="td" ?  space=="compact" ? "p-1" : (space=="comfortable" ? "p-4" : "p-2") : (space=="compact" ? "px-1 py-2" : space=="comfortable" ? "px-4 py-5" : "px-2 py-3")
</script>

{#if !data}
  <svelte:element this={tag} {...$$restProps} class={twMerge(getCellClass(), $$props.class)}>
    <slot/>
  </svelte:element>
{:else}
  {#if typeof data == "string" || typeof data == "number"}
    <svelte:element this={tag} {...$$restProps} class={twMerge(getCellClass(), $$props.class)}>
      {@html data}
    </svelte:element>
  {/if}
  {#if Array.isArray(data)}
    {#each data as c}
      <svelte:element this={tag} {...$$restProps} class={twMerge(getCellClass(), $$props.class)}>
        {@html c}
      </svelte:element>
    {/each}
  {/if}
  {#if dataType(data) === "object" && keys}
    {#each keys as key}
      <svelte:element this={tag} {...$$restProps} class={twMerge(getCellClass(), $$props.class)}>
        {@html data[key]}
      </svelte:element>
    {/each}
  {/if}
{/if}
