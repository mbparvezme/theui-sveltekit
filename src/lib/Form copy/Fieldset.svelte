<script lang="ts">
  import { twMerge } from "tailwind-merge"
  export let title  : string = ""
</script>

<fieldset class={twMerge("", $$props.class)}>
	<legend class="sr-only">{title}</legend>
  <slot/>
</fieldset>