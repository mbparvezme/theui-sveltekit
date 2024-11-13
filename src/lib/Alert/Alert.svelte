<script lang="ts">
	import type { ROUNDED } from "$lib/types"
	import { twMerge } from "tailwind-merge"
	import { roundedClass, generateToken } from "$lib/functions"
	import type { Snippet } from "svelte"
	import Close from "$lib/Utility/Close.svelte"
	import Svg from "$lib/Utility/Svg.svelte"

	interface Props {
		content: string|Snippet|undefined,
		round: ROUNDED,
		type: 'error' | 'info' | 'success' | 'warning',
		theme : 'default'|'light',
		variant: 'card' | 'borderTop'| 'borderBottom'| 'borderStart',
		id: string,
    [key: string]: unknown // dismissible, icon
	}

	let {
		content = undefined,
		round = "md",
		type = "error",
		theme = "default",
		variant = "card",
		id = generateToken(),
		...props
	} : Props = $props()

	let nodeRef: HTMLDivElement

	let getClass = () => {
		let cls = "theui-alert flex items-center p-4 mb-4 gap-4 text-sm font-medium "
		if(theme == "default"){
			cls +=	type == "info"		?	"bg-info-500 text-info-50  dark:bg-info-700" :
							type == "success" ? "bg-success-500 text-success-50 dark:bg-success-600" :
							type == "warning" ? "bg-warning-300 text-warning-900 dark:bg-warning-600 dark:text-warning-50" :
																	"bg-error-500 text-error-50 dark:bg-error-800"

			if(variant != "card"){
				cls +=	type == "info"		?	" border-info-200" :
								type == "success" ? " border-success-200" :
								type == "warning" ? " border-warning-500 dark:border-warning-200" :
																		" border-error-200"
			}
		}
		if(theme == "light"){
			cls +=	type == "info"		? "bg-info-100 text-info-900 dark:bg-info-500/20 dark:text-info-300" :
							type == "success" ? "bg-success-100 text-success-900 dark:bg-success-500/20 dark:text-success-300" :
							type == "warning" ? "bg-warning-100 text-warning-900 dark:bg-warning-500/20 dark:text-warning-300" :
																	"bg-error-100 text-error-900 dark:bg-error-500 dark:text-error-300"

			if(variant != "card"){
				cls +=	type == "info"		?	" border-info-300 dark:border-info-700" :
								type == "success" ? " border-success-300 dark:border-success-600" :
								type == "warning" ? " border-warning-500 dark:border-warning-700" :
																		" border-error-400 dark:border-error-800"
			}
		}
		if(variant == "card")					cls += roundedClass(round)
		if(variant == "borderTop")		cls += roundedClass(round, "bottom") + " border-t-4"
		if(variant == "borderBottom")	cls += roundedClass(round, "top") + " border-b-4" 
		if(variant == "borderStart")	cls += roundedClass(round) + " border-l-4" 
		return cls
	}

	const toggleAlert = () => nodeRef.parentNode?.removeChild(nodeRef)
</script>

<div {id} class={twMerge(getClass(), (props?.class ?? "") as string)} role="alert" bind:this={nodeRef}>
	<!-- Alert Icon -->
	{#if props?.icon && ["error", "info", "success", "warning"].includes(type)}
		<Svg size={1.25}>
			{#snippet icon()}
				{#if type == "error" || type == "warning"}
				<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
				{/if}
				{#if type == "info"}
				<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
				{/if}
				{#if type == "success"}
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
				{/if}
			{/snippet}
		</Svg>
	{/if}

	<!-- Alert Content -->
	{#if typeof content === "string"}
		{@html content}
	{:else}
		{@render content?.()}
	{/if}

	<!-- Alert Close Button -->
	{#if props?.dismissible}
	<div class="ms-auto mb-auto">
		<Close ariaLabel="Close alert" onclick={()=>toggleAlert()}/>
	</div>
	{/if}
</div>