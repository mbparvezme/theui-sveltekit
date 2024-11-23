<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { generateToken, roundedClass } from "$lib/functions"
	import { getContext, type Snippet } from "svelte"
	import { twMerge } from "tailwind-merge";

  interface Props {
    helperText?: string | Snippet | undefined,
    id?: string,
    label?: string|Snippet,
    name?: string,
    type?: "checkbox" | "radio",
    value?: boolean | null | undefined,
    [key: string]: unknown
  }

  const CTX: any = getContext('FORM') ?? {}

  let {
    helperText = undefined,
    label,
    name,
    id = generateToken(),
    value = null,
    animate = CTX?.animate ?? "normal",
    labelClasses  = CTX?.labelClasses ?? "",
    rounded = CTX?.rounded ?? "full",
    size = CTX?.size ?? "md",
    type = "checkbox",
    ...props
  }: Props & INPUT_CONFIG = $props()

  let classes: string = `h-5 w-9 border-0 bg-gray-300 dark:bg-gray-600 checked:bg-brand-primary-500 dark:checked:bg-brand-primary-500 appearance-none relative flex items-center px-1 ease-in-out duration-300 text-brand-primary-500 focus:!ring-gray-500 checked:focus:!ring-brand-primary-500 mt-[6px] ${roundedClass(rounded)} ${rounded ? 'after:rounded-full' : 'after:rounded-sm'} after:w-3 after:h-3 after:bg-white after:transition-all after:ease-in-out after:duration-300 checked:bg-none checked:after:translate-x-[14px]`

  let setType: any = (node: HTMLInputElement) => node.type = type
</script>

<div class="flex items-start gap-2">
	<input
		{id}
		use:setType
		class={twMerge(classes, props?.class as string)}
	/>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
</div>

<!-- <style lang="postcss">
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
</style> -->