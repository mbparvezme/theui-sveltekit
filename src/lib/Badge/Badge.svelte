<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { roundedClass } from "$lib/functions"

  interface Props {
    text ?: string | undefined,
    title ?: string | undefined,
    grow ?: boolean,
    topFixed ?: boolean,
    round ?: ROUNDED,
    [key: string]: unknown // dismissible, icon
	}

  let {
    text = undefined,
    title = undefined,
    grow = false,
    topFixed = false,
    round = "full",
    ...props
  } : Props = $props()

  const processClasses = () => {
    let cls = `
      items-center justify-center whitespace-nowrap select-none bg-brand-primary-500 text-on-brand-primary-500 inline-block font-medium p-[.35em]
      ${!grow ? "text-xs !leading-[.8em]" : "text-[1em] leading-[1em]"} 
      ${topFixed ? "absolute transform translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/2 top-0 end-0 border-4 border-primary" : ""}
      ${roundedClass(round)}
    `;
    return cls.trim();
  }
</script>

<span class="theui-badge {twMerge(processClasses(), (props?.class ?? "") as string)}">
  {@html text??""}
  <span class="sr-only">{title??"Badge"}</span>
</span>