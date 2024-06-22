<script lang="ts">
  import type { ROUNDED } from "$lib/types";
  import { twMerge } from "tailwind-merge";
  import { getRounded } from "$lib/functions";

  export let text : string  | undefined = undefined;
  export let srDescription : string  | undefined = text;
  export let round : ROUNDED = "full";

  let getClasses = () => `items-center justify-center whitespace-nowrap select-none bg-brand-500 text-on-brand-500 inline-block text-[1em] leading-[1em] font-medium p-[.35em] ${$$props?.grow ? "" : "text-xs !leading-[.8em] "}${$$props?.fixed ? "absolute transform translate-x-1/2 -translate-y-1/2 top-0 right-0 border-4 border-primary" : ""}${getRounded(round)}`;
</script>

<span class="theui-badge {twMerge(getClasses(), $$props?.class)}">
  {text??""}
  <span class="sr-only">{srDescription??"Badge"}</span>
</span>