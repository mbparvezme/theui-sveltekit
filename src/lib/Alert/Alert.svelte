<script lang="ts">
	import type { ROUNDED, SHADOW } from "$lib/types";
	import { twMerge } from "tailwind-merge";
	import { getRounded, generateToken, getShadow } from "$lib/functions";
	import { Close, Svg } from "$lib";

	export let theme: 'deep' | 'light' | 'flat' = "light";
	export let border: 'top'| 'bottom' | 'x' | 'y' | 'start' | 'none' | 'all' = "none";
	export let round: ROUNDED = "md";
	export let type: 'error' | 'info' | 'success' | 'warning' = "error";
	export let shadow: SHADOW = "sm";

	let getClasses = () => {
		let cls = `theui-alert flex items-center p-4 gap-4 text-sm font-medium${getShadow(shadow)} `;

		if(theme == "deep"){
			cls += 	(type == "info" ?	"bg-info-500 dark:bg-info-600 text-info-50" :
					type == "success" ?		"bg-success-500 dark:bg-success-600 text-success-50" :
					type == "warning" ?		"bg-warning-500 dark:bg-warning-600 text-warning-800 dark:text-warning-950" :
																"bg-error-500 dark:bg-error-600 text-error-50");
		}

		if(theme == "light"){
			cls += 	(type == "info" ?	"bg-info-200 text-info-800 dark:bg-info-800 dark:text-info-200 border-info-500" :
					type == "success" ?		"bg-success-200 text-success-800 dark:bg-success-800 dark:text-success-200 border-success-500" :
					type == "warning" ?		"bg-warning-200 text-warning-800 dark:bg-warning-800 dark:text-warning-100 border-warning-500" :
																"bg-error-100 text-error-800 dark:bg-error-800 dark:text-error-100 border-error-500");
		}

		if(theme == "flat"){
			cls += 	`${(type == "info" ?	"text-info-500 border-info-500" :
					type == "success" ?		"text-success-500 border-success-500" :
					type == "warning" ?		"text-warning-700 dark:text-warning-300 border-warning-500" :
																"text-error-500 dark:text-error-400 border-error-500")}`;
		}

		if(border == "none") return `${cls}${getRounded(round)}`;
		if(border == "all") return `${cls}${getRounded(round)} border`;
		if(border == "top") return `${cls}${getRounded(round, "bottom")} border-t-4`;
		if(border == "bottom") return `${cls}${getRounded(round, "top")} border-b-4`;
		if(border == "start") return `${cls}${getRounded(round)} border-s-4`;
		if(border == "x") return `${cls}${getRounded(round)} border-x-4`;
		if(border == "y") return `${cls}${getRounded(round)} border-y-4`;

		return cls;
	}

	let nodeRef: HTMLDivElement;
	let id: string = generateToken();
	const toggleAlert = () => nodeRef.parentNode?.removeChild(nodeRef);
</script>

<div {id} class={twMerge(getClasses(), $$props?.class)} role="alert" bind:this={nodeRef}>
	<slot name="icon">
		{#if !$$props?.hideIcon && ["error", "info", "success", "warning"].includes(type)}
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
	{#if $$props?.dismissible}
	<div class="ms-auto mb-auto">
		<Close ariaLabel="Close alert" on:click={toggleAlert} />
	</div>
	{/if}
</div>
