<script lang="ts">
  import { twMerge } from "tailwind-merge"
</script>

<section class="theui-container {twMerge("relative w-full max-w-[var(--max-width)] mx-auto px-8 py-24 md:px-16", $$props?.class)}">
  <slot></slot>
</section>