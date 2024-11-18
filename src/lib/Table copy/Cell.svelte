<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  interface Props {
    data ?: Snippet|ArrayLike<string|number>|string,
    keys ?: string[]|null,
    tag ?: "td" | "th",
    [key : string] : unknown,
  }

  const  CTX: any = getContext("TABLE")

  let {data = "", keys = null, tag = "td", ...props} : Props = $props()

  let dataType = (d: any) => Object.prototype.toString.call(d) === "[object Object]" ? "object" : Array.isArray(d) ? "array" : false

  let getCellClass = () => {
    let cls = ((CTX?.border == "both" || CTX?.border == "x") ? (CTX?.borderColor +" border-l border-r ") : " ") + sizeCls(CTX?.space || "default")
    return cls + (tag=="td" ? " text-gray-600 dark:text-gray-400 font-normal" : " font-medium text-sm")
  }

  let sizeCls = (space: string) => tag=="td" ?  space=="compact" ? "p-1" : (space=="comfortable" ? "p-4" : "p-2") : (space=="compact" ? "px-1 py-2" : space=="comfortable" ? "px-4 py-5" : "px-2 py-3")
</script>

<svelte:element this={tag} {...props} class={twMerge(getCellClass(), props?.class as string)}>
  {#if typeof data === "function"}
    {@render data?.()}
  {:else}
    {#if typeof data == "string" || typeof data == "number"}
      {@html data}
    {/if}
    {#if Array.isArray(data)}
      {#each data as c}
        {@html c}
      {/each}
    {/if}
    {#if dataType(data) === "object" && keys}
      {#each keys as key}
        {#if data[key]}
          {@html data[key] as string | number}
        {/if}
      {/each}
    {/if}
  {/if}
</svelte:element>