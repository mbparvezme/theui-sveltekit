<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { animationClass, roundedClass, generateToken } from "$lib/functions"
  import { Close } from "$lib"
	import type { Snippet } from "svelte"

  interface Props{
    button ?: Snippet<[any, string]>|undefined,
    content ?: Snippet|undefined,
    header ?: Snippet|undefined,
    footer ?: Snippet|undefined,
    id ?: string,
    label ?: string,
    animate ?: ANIMATE_SPEED,
    animation ?: 'slide-down' | 'slide-up' | 'fade' | 'zoom-in' | 'zoom-out',
    backdrop ?: boolean,
    closeBtn ?: boolean,
    closeOnEsc ?: boolean,
    modalFooterClass ?: string,
    modalHeaderClass ?: string,
    modalBodyClass ?: string,
    modalOuterClass ?: string,
    position ?: 'top' | 'center' | 'bottom',
    rounded ?: ROUNDED,
    size ?: 'sm' | 'md' | 'lg' | 'full',
    staticBackdrop ?: boolean,
    modalStatus ?: boolean
  }

  let {
    button = undefined,
    content = undefined,
    header = undefined,
    footer = undefined,
    id = generateToken() + "Modal",
    label = "",
    animate = "fast",
    animation = "fade",
    backdrop = true,
    closeBtn = true,
    closeOnEsc = true,
    modalFooterClass = "",
    modalHeaderClass = "",
    modalBodyClass = "",
    modalOuterClass = "",
    position = "center",
    rounded = "md",
    size = "md",
    staticBackdrop = false,
    modalStatus = false,
  } : Props = $props()

  let attr = $derived({
		"id" : `${id}Btn`,
		"aria-label" : label,
		"aria-haspopup" : "true",
		"aria-controls" : id,
		"aria-expanded" : modalStatus
	})

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
    sm : "modal-sm",
    md : "modal-md",
    lg : "modal-lg",
    full : "modal-full",
  }

  let positionClass = {
    top : "modal-top",
    center : "modal-center",
    bottom : "modal-bottom",
  }

  let modalCls = $derived(() => `theui-modal z-50 ${sizes[size]} ${positionClass[position]} ${animationClass(animate)}`);
  let modalBodyCls = $derived(() => `modal-content bg-white dark:bg-secondary ${animationClass(animate)} ${((animate && animation) ? animation : "")}`);

</script>

<svelte:body onkeydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if button}
  <span role="button" onclick={()=>toggle()}>
    {@render button?.(attr, label)}
  </span>
{/if}

{#if content}
<div {id} class={twMerge(modalCls(), modalOuterClass)} class:open={modalStatus} class:animate={animate} role="dialog" aria-modal="true" aria-hidden={!modalStatus}>
  {#if backdrop}
    <div class="backdrop fixed inset-0 bg-black z-[-1]{animationClass(animate)}" onclick={()=>toggle(false)}></div>
  {/if}

  <div class={twMerge(modalBodyCls(), (size !== "full" ? roundedClass(rounded) : ""), modalBodyClass)} aria-labelledby={header ? `${id}Heading` : `${id}Btn`}>

    {#if header}
      <div id="{id}Heading" class={twMerge("modal-header flex justify-between w-full gap-8 items-start border-b border-black/10 dark:border-tertiary pb-4 mb-8", modalHeaderClass)}>
        {@render header?.()}
        {#if closeBtn!==false}
          <Close class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity" onclick={()=>toggle()}/>
        {/if}
      </div>
    {:else if closeBtn!==false}
      <Close class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-2" onclick={()=>toggle()}/>
    {/if}

    <div class="w-full">
      {@render content?.()}
    </div>

    {#if footer}
      <div class={twMerge("modal-footer border-t border-black/10 dark:border-tertiary pt-4 mt-8", modalFooterClass)}>
        {@render footer?.()}
      </div>
    {/if}

  </div>
</div>
{/if}

<style lang="postcss">
  .theui-modal{
    @apply fixed inset-0 flex justify-center visible opacity-100;
  }
  .theui-modal:not(.open){
    @apply invisible opacity-0;
  }
  .theui-modal:not(.modal-full){
    @apply p-8;
  }
  .theui-modal .modal-content{
    @apply flex flex-col p-8 relative;
  }
  .theui-modal.modal-sm .modal-content{
    @apply w-full sm:w-96;
    /* @apply xs:w-72; */
  }
  .theui-modal.modal-md .modal-content{
    @apply w-full md:w-[640px];
  }
  .theui-modal.modal-lg .modal-content{
    @apply w-full lg:w-[960px];
  }
  .theui-modal.modal-full .modal-content{
    @apply w-full min-h-screen;
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