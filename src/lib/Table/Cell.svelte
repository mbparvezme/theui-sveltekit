<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  type SizeVariants = "compact" | "comfortable" | "default";

  interface Props {
    children ?: Snippet,
    data ?: string|number,
    keys ?: string[],
    tag ?: "td" | "th",
    [key : string] : unknown,
  }

  const  CTX: any = getContext("TABLE")

  let {children, data = "", keys, tag = "td", ...props} : Props = $props()


  const sizeClasses: Record<"td" | "tr", Record<SizeVariants, string>> = {
    td : {
      compact: "p-1",
      comfortable: "p-4",
      default: "p-2"
    },
    tr : {
      compact: "px-1 py-2",
      comfortable: "px-4 py-5",
      default: "px-2 py-3"
    },
  }

  let getCellClass = () => {
    const borderClass = (CTX?.border === "both" || CTX?.border === "x") ? `${CTX?.borderColor} border-l border-r` : "";
    const sizeClass = sizeClasses[tag as "tr"|"td"][CTX.space as SizeVariants ?? "default"];
    const textClass = tag === "td" ? "text-gray-600 dark:text-gray-400 font-normal" : "font-bold text-sm";
    return twMerge(borderClass, sizeClass, textClass, (tag == "th" ? CTX?.thClasses : CTX?.tdClasses), props?.class as string);
  }

</script>

<svelte:element this={tag} {...props} class={getCellClass()}>
  {#if children}
    {@render children?.()}
  {:else}
    {@html data}
  {/if}
</svelte:element>