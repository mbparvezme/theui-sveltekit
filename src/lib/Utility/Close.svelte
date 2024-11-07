<script lang="ts">
  import { twMerge } from "tailwind-merge"
	// import { Svg } from "$lib"

  export let size: number = 1.5
  export let ariaLabel: string = "Close button"
</script>

<button class="theui-close {twMerge("opacity-60 dark:opacity-50 hover:opacity-100 transition-opacity", $$props?.class)}" aria-label={ariaLabel} on:click>
    <span class="sr-only">{ariaLabel}</span>
    <svg width="1em" height="1em">
        <slot name="icon">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </slot>
    </svg>
</button>