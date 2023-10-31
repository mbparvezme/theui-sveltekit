<script>
  import { twMerge } from "tailwind-merge"
</script>

<div class="tab-list {twMerge("mb-4", $$props.class)}">
	<slot></slot>
</div>