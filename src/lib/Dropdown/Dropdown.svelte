<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { animationClass, roundedClass, generateToken, backdropClasses } from "$lib/functions"
  import { twMerge } from "tailwind-merge"
  import { Button } from "$lib"
  import { setContext, type Snippet } from "svelte"

  type DROPDOWN_ANIMATION_TYPE = 'slide-left' | 'slide-up' | 'slide-right' | 'slide-down' | 'fade' | 'zoom-in' | 'zoom-out'

  interface Props {
    children ?: Snippet,
    activeLinkClasses ?: string,
    linkClasses ?: string,
    dividerClasses ?: string,
    headerClasses ?: string,
    align ?: 'start' | 'end'
    animate ?: ANIMATE_SPEED,
    animation ?: DROPDOWN_ANIMATION_TYPE,
    backdrop ?: boolean | string,
    closeOnBlur ?: boolean,
    containerClasses ?: string,
    dropdownClasses ?: string,
    id ?: string,
    label : string|Snippet,
    rounded ?: ROUNDED
    size ?: 'sm' | 'md' | 'lg' | 'full' | 'auto' | 'custom'
  }

  let{
    children,
    activeLinkClasses = "",
    linkClasses = "",
    dividerClasses = "",
    headerClasses = "",
    align = "end",
    animate = "fast",
    animation = "slide-up",
    backdrop = false,
    closeOnBlur = true,
    containerClasses = "",
    dropdownClasses = "",
    id = generateToken(),
    label,
    rounded = "md",
    size = "auto",
  } : Props = $props()

  const sizeClasses = {
    sm: "dropdown-sm",
    md: "dropdown-md",
    lg: "dropdown-lg",
    full: "dropdown-full",
    auto: "dropdown-auto",
    custom: "dropdown-custom"
  }

	let isOpen: boolean = $state(false)

	let toggle = $derived(() => {
		let currentDD = document.getElementById(id)
		isOpen = !currentDD?.classList.contains('open')
	})

	let handleKeyboard = $derived((e: KeyboardEvent) => {
		e.preventDefault()
		if (e.code === "Escape" || e.code === "ArrowUp") {
			isOpen = false
		}
		if (e.code === "ArrowDown") {
			isOpen = true
		}
	})

	let handleBlur = $derived((e: MouseEvent) => {
		let currentDD = document.getElementById(id)
		if (closeOnBlur && currentDD?.classList.contains('open') && e.target instanceof Element && !e.target.closest("#"+id)) {
			isOpen = false
		}
	})

	let attr = $derived({
		"id" : `${id}Heading`,
		"aria-label" : typeof label === "string" ? label : "Dropdown button",
		"aria-haspopup" : "true",
		"aria-controls" : `${id}Body`,
		"aria-expanded" : isOpen
	})

	const getContainerClasses = () => twMerge(`theui-dropdown relative inline-block ${align === "end" ? "dropdown-end" : ""} ${sizeClasses[size] || "dropdown-custom"} ${animationClass(animate)}`, containerClasses)

  const getDropdownClasses = () => {
    return twMerge(`${animation} dropdown-content absolute list-none z-[11] bg-white dark:bg-secondary text-base shadow-lg py-1 text-nowrap ${animationClass(animate)}${roundedClass(rounded)}`, dropdownClasses)
  }

	let config: {
		activeClasses: string,
		linkClasses: string,
		dividerClass: string,
		headerClass: string
  } = {
    linkClasses: twMerge("flex w-full items-center gap-4 py-3 px-4 bg-transparent hover:bg-gray-500/10 text-default", linkClasses),
    activeClasses: twMerge("flex items-center gap-4 py-3 px-4 bg-gray-500/10", activeLinkClasses),
    dividerClass: twMerge("border-b pb-2 mb-2 border-tertiary", dividerClasses),
    headerClass: twMerge("flex items-center gap-4 p-4 font-bold text-sm opacity-50 uppercase", headerClasses)
  }
	setContext('DROPDOWN_CTX', config)
</script>

<svelte:window on:click={(e: MouseEvent)=>handleBlur(e)} />

<div {id} class={getContainerClasses()} class:open={isOpen}>
  {#if typeof label == "string"}
    <Button id={`${id}-trigger`} {label} ariaLabel={label + " dropdown"} onclick={()=>toggle()} onkeydown={(e: KeyboardEvent)=>handleKeyboard(e)} aria-controls={`${id}-dropdown`} aria-expanded={isOpen} aria-haspopup="menu" />
  {:else}
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <span id={`${id}-trigger`} class="relative dropdown-btn select-none" role="button" onclick={()=>toggle()} onkeydown={(e: KeyboardEvent)=>handleKeyboard(e)} aria-controls={`${id}-dropdown`} aria-expanded={isOpen} aria-haspopup="menu">
      {@render label?.()}
    </span>
  {/if}

  {#if backdrop}
    <div class={backdropClasses(backdrop)} onclick={()=>toggle()} aria-hidden="true"></div>
  {/if}

  <ul id={`${id}-dropdown`} class={getDropdownClasses()} role="menu" aria-labelledby={`${id}-trigger`}>
		{@render children?.()}
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
		@apply w-full start-0 end-0;
	}
	.dropdown-custom .dropdown-content{
		@apply w-[var(--dropdown-width)] start-0 end-0;
	}
	.dropdown-end .dropdown-content{
		@apply start-auto end-0;
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
	.theui-dropdown.open .dropdown-content.slide-left, .theui-dropdown.open .dropdown-content.slide-right{
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