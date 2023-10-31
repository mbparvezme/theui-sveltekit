<script lang="ts">
  import { twMerge } from "tailwind-merge"
  export let text: string|undefined = undefined
</script>

<p {...$$restProps} class={twMerge("text-xs text-gray-400 dark:text-gray-700", $$props?.class)}>
    <slot>
        {#if text}{@html text}{/if}
    </slot>
</p>