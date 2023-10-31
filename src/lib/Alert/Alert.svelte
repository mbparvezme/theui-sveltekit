<script lang="ts">
	import type { ROUNDED } from "$lib/types"
	import { twMerge } from "tailwind-merge"
  	import { getRounded, generateToken } from "$lib/functions"
	import { Close, Svg } from "$lib"

	export let dismissible: boolean = true
	export let icon: boolean = true
	export let round: ROUNDED = "md"
	export let type: 'error' | 'info' | 'success' | 'warning' = "error"
	export let theme : 'default'|'light' = "default"
	export let variant: 'card' | 'borderTop'| 'borderBottom'| 'borderStart' = "card"

	let getClass = () => {
		let cls = "theui-alert"
		cls = " flex items-center p-4 mb-4 gap-4 text-sm font-medium "
		if(theme == "default"){
			cls += 	(type == "info" ? "bg-cyan-500 text-cyan-50  dark:bg-cyan-700" :
					type == "success" ? "bg-green-500 text-green-50 dark:bg-green-600" :
					type == "warning" ? "bg-orange-300 text-orange-900 dark:bg-orange-600 dark:text-orange-50"
					: "bg-red-500 text-red-50 dark:bg-red-800")

			if(variant != "card"){
				cls +=	(type == "info" ? " border-cyan-50" :
						type == "success" ? " border-green-50" :
						type == "warning" ? " border-orange-900 dark:border-orange-50"
						: " border-red-50")
			}
		}
		if(theme == "light"){
			cls += 	(type == "info" ? "bg-cyan-500/40 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300" :
					type == "success" ? "bg-green-500/20 text-green-800 dark:bg-green-500/20 dark:text-green-300" :
					type == "warning" ? "bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300"
					: "bg-red-500/20 text-red-800 dark:bg-red-500/20 dark:text-red-300")

			if(variant != "card"){
				cls +=	(type == "info" ? " border-cyan-500 dark:border-cyan-700" :
						type == "success" ? " border-green-600 dark:border-green-600" :
						type == "warning" ? " border-orange-600 dark:border-orange-700"
						: " border-red-600 dark:border-red-800")
			}
		}
		if(variant == "card") cls += getRounded(round)
		if(variant == "borderTop") cls += getRounded(round, "bottom") + " border-t-4"
		if(variant == "borderBottom") cls += getRounded(round, "top") + " border-b-4" 
		if(variant == "borderStart") cls += getRounded(round) + " border-l-4" 
		return cls
	}

	let nodeRef: HTMLDivElement
	let id: string = generateToken()
	const toggleAlert = () => nodeRef.parentNode?.removeChild(nodeRef)
</script>

<div {id} class={twMerge(getClass(), $$props?.class)} role="alert" bind:this={nodeRef}>
	<slot name="icon">
      	{#if icon && ["error", "info", "success", "warning"].includes(type)}
			<Svg size={1.25}>
				{#if type == "error" || type == "warning"}
				<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
				{/if}
				{#if type == "info"}
				<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
				{/if}
				{#if type == "success"}
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
				{/if}
			</Svg>
		{/if}
	</slot>
	<slot />
	{#if dismissible}
	<div class="ml-auto mb-auto">
		<Close ariaLabel="Close alert" on:click={toggleAlert} />
	</div>
	{/if}
</div>
