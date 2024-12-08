<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { animationClass, roundedClass, generateToken, backdropClasses } from "$lib/function.core"
  import { Close } from "$lib"
	import type { Snippet } from "svelte"

  interface Props{
    button?: Snippet,
    children?: Snippet,
    header?: Snippet,
    footer?: Snippet,
    id?: string,
    label?: string,
    animate?: ANIMATE_SPEED,
    animation?: 'slide-down' | 'slide-up' | 'fade' | 'zoom-in' | 'zoom-out',
    backdrop?: boolean|string,
    closeBtn?: boolean,
    closeOnEsc?: boolean,
    modalFooterClasses?: string,
    modalHeaderClasses?: string,
    modalBodyClasses?: string,
    modalOuterClasses?: string,
    position?: 'top' | 'center' | 'bottom',
    rounded?: ROUNDED,
    size?: 'sm' | 'md' | 'lg' | 'full',
    staticBackdrop?: boolean,
    modalStatus?: boolean
  }

  let {
    children,
    button,
    header,
    footer,
    id = generateToken() + "Modal",
    label = "",
    animate = "fast",
    animation = "fade",
    backdrop = true,
    closeBtn = true,
    closeOnEsc = true,
    modalFooterClasses = "",
    modalHeaderClasses = "",
    modalBodyClasses = "",
    modalOuterClasses = "",
    position = "center",
    rounded = "md",
    size = "md",
    staticBackdrop = false,
    modalStatus = false,
  } : Props = $props()

  let toggle = ( closeBtn = true ) => {
    modalStatus = !(document.getElementById(id)?.classList.contains('open') && (closeBtn || (!closeBtn && !staticBackdrop)))
  }

	let handleKeyboard = (e: KeyboardEvent) => {
		if (modalStatus && (closeOnEsc && e.code === "Escape")) {
      e.preventDefault()
      modalStatus = false
    }
	}

  let sizes = {
    sm : "modal-sm w-full sm:w-96",
    md : "modal-md w-full md:w-[640px]",
    lg : "modal-lg w-full lg:w-[960px]",
    full : "modal-full w-full min-h-screen",
  }

  let positionClass = {
    top : "modal-top mb-auto",
    center : "modal-center my-auto",
    bottom : "modal-bottom mt-auto",
  }

  let modalCls = $derived(() => `theui-modal z-50 flex fixed inset-0 visible opacity-100 ${animationClass(animate)}`);
  let modalBodyCls = $derived(() => `modal-content flex flex-col p-8 relative mx-auto bg-white dark:bg-secondary ${sizes[size]} ${positionClass[position]} ${animationClass(animate)} ${((animate && animation) ? animation : "")}`)
</script>

<svelte:body onkeydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if button}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <span
    id="{id}Btn"
    role="button"
    onclick={()=>toggle()}
    aria-haspopup="dialog"
		aria-label=label
		aria-controls=id
		aria-expanded={modalStatus}
  >
    {#if label}
      {@html label}
    {:else if button}
      {@render button?.()}
    {/if}
  </span>
{/if}

{#if children}
<div {id} class={twMerge(modalCls(), modalOuterClasses)} class:open={modalStatus} class:animate={animate} role="dialog" aria-modal="true" aria-hidden={!modalStatus}>
  {#if backdrop}
    <div class={backdropClasses(backdrop)} onclick={()=>toggle(false)} aria-hidden="true"></div>
  {/if}

  <div class={twMerge(modalBodyCls(), (size !== "full" ? roundedClass(rounded) : ""), modalBodyClasses)} aria-labelledby={header ? `${id}Heading` : `${id}Btn`}>

    {#if header}
      <div id="{id}Heading" class={twMerge("modal-header flex justify-between w-full gap-8 items-start border-b border-black/10 dark:border-tertiary pb-4 mb-8", modalHeaderClasses)}>
        {@render header?.()}
        {#if closeBtn!==false}
          <Close class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity" onclick={()=>toggle()}/>
        {/if}
      </div>
    {:else if closeBtn!==false}
      <Close class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-2" onclick={()=>toggle()}/>
    {/if}

    <div class="w-full">
      {@render children()}
    </div>

    {#if footer}
      <div class={twMerge("modal-footer border-t border-black/10 dark:border-tertiary pt-4 mt-8", modalFooterClasses)}>
        {@render footer?.()}
      </div>
    {/if}

  </div>
</div>
{/if}

<style lang="postcss">
  .theui-modal:not(.open){
    @apply invisible opacity-0;
  }
  .theui-modal:not(.modal-full){
    @apply p-8;
  }
  .theui-modal.theui-animate .backdrop{
    @apply opacity-0;
  }
  .theui-modal.open .backdrop{
    @apply opacity-50 dark:opacity-75;
  }
  .theui-modal.theui-animate .modal-content.slide-down{
    @apply transform -translate-y-8;
  }
  .theui-modal.theui-animate .modal-content.slide-up{
    @apply transform translate-y-8;
  }
  .theui-modal.theui-animate .modal-content.zoom-in{
    @apply transform scale-90;
  }
  .theui-modal.theui-animate .modal-content.zoom-out{
    @apply transform scale-110;
  }
  .theui-modal.theui-animate.open .modal-content.slide-down, .theui-modal.theui-animate.open .modal-content.slide-up{
    @apply translate-y-0;
  }
  .theui-modal.theui-animate.open .modal-content.zoom-in, .theui-modal.theui-animate.open .modal-content.zoom-out{
    @apply scale-100;
  }
</style>