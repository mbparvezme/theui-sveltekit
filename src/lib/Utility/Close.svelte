<script lang="ts">
  import { twMerge } from "tailwind-merge"
	import Svg from "$lib/Utility/Svg.svelte"

  interface Props {
    size?: number,
    ariaLabel: string,
    onclick: any,
    [key: string]: unknown // dismissible, icon
	}

  let {
    size = 1.5,
    ariaLabel = "Close button",
    onclick = undefined,
    ...props // dismissible, icon
  } : Props = $props()
</script>

<button class="theui-close {twMerge("opacity-60 dark:opacity-50 hover:opacity-100 transition-opacity", (props?.class || "") as string)}" aria-label={ariaLabel} {onclick}>
    <span class="sr-only">{ariaLabel}</span>
    <Svg {size}>
      {#snippet icon()}
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      {/snippet}
    </Svg>
</button>