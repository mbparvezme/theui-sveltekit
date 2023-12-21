<script context="module">
	export const DROPDOWN = {}
</script>

<script lang="ts">
	import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
	import { getAnimate, getRounded, generateToken } from "$lib/functions"
	import { activeDropdownID } from "$lib/stores"
	import { twMerge } from "tailwind-merge"
	import { Button } from "$lib"
	import { setContext } from "svelte"

	export let animate : ANIMATE_SPEED = "fast"
	export let id: string = generateToken()
	// export let items: DROPDOWN_ITEM[] = []
	export let label: string = ""
	export let animation : 'slide-left' | 'slide-up' | 'slide-right' | 'slide-down' | 'fade' | 'zoom-in' | 'zoom-out' = "slide-up"
	export let align : 'left' | 'right' = "right"
	export let backdrop : string|undefined = undefined
	export let containerClass : string|undefined = undefined
	export let closeOnOutsideClick : boolean = true
	export let rounded : ROUNDED = "md"
	export let size : 'sm' | 'md' | 'lg' | 'full' | 'auto' | 'custom' = "md"
	export let standalone : boolean = true

	export let linkClass: string | undefined = "flex w-full items-center gap-4 py-3 px-4 bg-transparent hover:bg-gray-500/10 text-default"
	export let activeClass: string | undefined = "flex items-center gap-4 py-3 px-4 bg-gray-500/10"
	export let dividerClass: string | undefined = "border-b pb-2 mb-2 border-tertiary"
	export let headerClass: string | undefined = "flex items-center gap-4 p-4 font-semibold text-xs opacity-75 uppercase"

	// export let itemConfig : DROPDOWN_ITEM_CONFIG|null = null

	const toggle = (close: boolean = true) => {
		if(close === false) return
		$activeDropdownID.includes(id) ? hide() : show()
		return
	}

	let show = () =>  standalone ? activeDropdownID.set([id]) : activeDropdownID.update(d=> [...d, id])
	let hide = () => activeDropdownID.set( $activeDropdownID.filter(i => i !== id) )

	$: attr = {
		"id" : `${id}Heading`,
		"aria-label" : label,
		"aria-haspopup" : "true",
		"aria-controls" : `${id}Body`,
		"aria-expanded" : $activeDropdownID.includes(id)
	}

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($activeDropdownID.includes(id) && (e.code === "Escape" || e.code === "ArrowUp")) {
			e.preventDefault()
			hide()
		}
		
		if (!$activeDropdownID.includes(id) && e.code === "ArrowDown") {
			e.preventDefault()
			show()
		}
	}

	let handleBlur = (e: MouseEvent) => {
		if (closeOnOutsideClick && $activeDropdownID.includes(id) && e.target instanceof Element && !e.target.closest(".theui-dropdown")) {
			hide()
		}
	}

	let getContainerClasses = () => "theui-dropdown relative inline-block " +
		(align=="right" ? " dropdown-right " : " ") +
		(size === "sm" ? "dropdown-sm" : size === "md" ? "dropdown-md" : size === "lg" ? "dropdown-lg" : size === "full" ? "dropdown-full" : size === "auto" ? "dropdown-auto" : "dropdown-custom") +
		getAnimate(animate)

	let getDropdownClasses = () => animation + " dropdown-content absolute list-none z-[11] bg-white dark:bg-secondary text-base shadow-lg py-1 " + getAnimate(animate) + getRounded(rounded)

	let config: {
		linkClass: string | undefined,
		activeClass: string | undefined,
		dividerClass: string | undefined,
		headerClass: string | undefined
  } = {
    linkClass,
    activeClass,
    dividerClass,
    headerClass
  }

	setContext(DROPDOWN, {config})
</script>

<svelte:window on:click={(e)=>handleBlur(e)}/>

<div {...$$restProps} class={twMerge(getContainerClasses(), containerClass)} class:open={$activeDropdownID.includes(id)}>
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<span class="relative dropdown-btn select-none" role="button" id={id + "Btn"} on:click={()=>toggle()} on:keydown={(e)=>handleKeyboard(e)} aria-expanded={$activeDropdownID.includes(id)}>
		{#if $$slots.label}
			<slot name="label" {attr} {label}></slot>
		{:else}
			<Button {label} ariaLabel={label + " dropdown"} />
		{/if}
	</span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	{#if backdrop}<div class="fixed inset-0 backdrop z-10 bg-black/50" on:click={()=>toggle()}></div>{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<ul class={twMerge(getDropdownClasses(), $$props?.class)} aria-labelledby={id + "Btn"}>
		<slot />
	</ul>
</div>

<style lang="postcss">
  .theui-dropdown .backdrop{
    @apply z-10;
  }
  .dropdown-content{
    @apply z-[11];
  }
	/* Dropdown visibility */
	.theui-dropdown .dropdown-content,.theui-dropdown .backdrop{
		@apply invisible opacity-0;
	}
	.theui-dropdown.open .dropdown-content,.theui-dropdown.open .backdrop{
		@apply visible opacity-100;
	}

	/* Dropdown sizes */
	.dropdown-sm .dropdown-content{
		@apply w-48;
	}
	.dropdown-md .dropdown-content{
		@apply w-64;
	}
	.dropdown-lg .dropdown-content{
		@apply w-80;
	}
	.dropdown-full .dropdown-content{
		@apply w-full left-0 right-0;
	}
	.dropdown-custom .dropdown-content{
		@apply w-[var(--dropdown-width)] left-0 right-0;
	}
	.dropdown-right .dropdown-content{
		@apply left-auto right-0;
	}

	/* Dropdown animations */
	.theui-dropdown .dropdown-content.slide-down{
		@apply -translate-y-2;
	}
	.theui-dropdown .dropdown-content.slide-up{
		@apply translate-y-2;
	}
	.theui-dropdown.open .dropdown-content.slide-down, .theui-dropdown.open .dropdown-content.slide-up{
		@apply translate-y-0;
	}
	.theui-dropdown .dropdown-content.slide-left{
		@apply translate-x-2;
	}
	.theui-dropdown .dropdown-content.slide-right{
		@apply -translate-x-2;
	}
	.dropdown.open .dropdown-content.slide-left, .dropdown.open .dropdown-content.slide-right{
		@apply translate-x-0;
	}
	.theui-dropdown .dropdown-content.zoom-in{
		@apply scale-75;
	}
	.theui-dropdown .dropdown-content.zoom-out{
		@apply scale-110;
	}
	.theui-dropdown.open .dropdown-content.zoom-in, .theui-dropdown.open .dropdown-content.zoom-out{
		@apply scale-100;
	}
</style>
