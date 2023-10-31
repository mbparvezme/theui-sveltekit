<script lang="ts">
  import { generateToken } from "$lib/functions"

  export let id		  : string = generateToken()
  export let type	  : string = "checkbox"
  export let label	  : string|null = null
  export let rounded  : boolean = true

  let setType = (node: HTMLInputElement) => node.type = type
</script>

<div class="flex items-start gap-2">
	<input
		{id}
		use:setType
		on:keyup
		on:keydown
		on:keypress
		on:focus
		on:blur
		on:click
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		class="h-5 w-9 border-0 bg-gray-300 dark:bg-gray-600 checked:bg-brand dark:checked:bg-brand appearance-none relative flex items-center px-1 ease-in-out duration-300 text-brand focus:!ring-gray-500 checked:focus:!ring-brand mt-[6px]"
		class:rounded-full={rounded}
		class:rounded-sm={!rounded}
		class:after:rounded-full={rounded}
		class:after:rounded-sm={!rounded}
	/>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
</div>

<style lang="postcss">
	input:after{
		content: "";
		@apply w-3 h-3 bg-white transition-all ease-in-out duration-300;
	}
	input:checked:after{
		@apply translate-x-[14px];
	}
	input,input:checked{
		background-image: none;
	}
</style>