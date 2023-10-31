<script lang="ts">
  import type { ANIMATE_SPEED, ROUNDED } from "$lib/types"
  import { twMerge } from "tailwind-merge"
  import { getAnimate, getRounded, generateToken } from "$lib/functions"
  import { modalIdStore } from "$lib/stores"
  import { Close } from "$lib"

  export let id                 : string = generateToken()
	export let label              : string = ""
  export let animate            : ANIMATE_SPEED = "fast"
  export let animation          : 'slide-down' | 'slide-up' | 'fade' | 'zoom-in' | 'zoom-out' = "fade"
  export let backdrop           : boolean = true
  export let closeBtn           : boolean = true
  export let closeOnEsc         : boolean = true
  export let modalFooterClass   : string = ""
  export let modalHeaderClass   : string = ""
  export let modalInnerClass    : string = ""
  export let modalOuterClass    : string = ""
  export let position           : 'top' | 'center' | 'bottom' = "center"
  export let rounded            : ROUNDED = "md"
  export let size               : 'sm' | 'md' | 'lg' | 'full' = "md"
  export let staticBackdrop     : boolean = false

	$: attr = {
		"id" : `${id}Btn`,
		"aria-label" : label,
		"aria-haspopup" : "true",
		"aria-controls" : `${id}Modal`,
		"aria-expanded" : $modalIdStore.includes(id)
	}

  let toggle = ( closeBtn = true ) => {
    if($modalIdStore.includes(id) && (closeBtn || (!closeBtn && !staticBackdrop))){
      modalIdStore.set( $modalIdStore.filter(i => i !== id) )
      return
    }
    modalIdStore.update(m=> [...m, id])
  }

	let handleKeyboard = (e: KeyboardEvent) => {
		if ($modalIdStore.includes(id) && (closeOnEsc && e.code === "Escape")){
      e.preventDefault()
      modalIdStore.set( $modalIdStore.filter(i => i !== id) )
    }
		return
	}

  let modalBodyCls    = () => "theui-modal z-50" + modalSize() + modalPosition() + animateCls()
  let modalContentCls = () => "modal-content bg-white dark:bg-secondary " + modalSize() + modalPosition() + animateCls() + ((animate && animation) ? animation : "")
  let modalSize       = () => " " + (size === "sm" ? " modal-sm" : size === "lg" ? " modal-lg" : size === "full" ? " modal-full" : " modal-md")
  let modalPosition   = () => " " + (position === "bottom" ? " items-end" : position === "center" ? " items-center" :  " items-start")
  let animateCls      = () => getAnimate(animate)
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if $$slots.modalBtn}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span role="button" on:click={()=>toggle()}>
    <slot name="modalBtn" {attr} {label}></slot>
  </span>
{/if}

{#if $$slots.body}
  <div id="{id}Modal" class={twMerge(modalBodyCls(), modalOuterClass)} role="dialog" class:open={$modalIdStore.includes(id)} class:animate={animate}>
    {#if backdrop}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="backdrop fixed inset-0 bg-black z-[-1]{animateCls()}" on:click={()=>toggle(false)}></div>
    {/if}

    <div class={twMerge(modalContentCls(), (size !== "full" ? getRounded(rounded) : ""), modalInnerClass)}
      aria-labelledby={$$slots.header ? `${id}Heading` : `${id}Btn`} aria-hidden={!$modalIdStore.includes(id)}>
      {#if $$slots.header}
        <div id="{id}Heading" class={twMerge("modal-header flex justify-between w-full gap-8 items-start border-b border-black/10 dark:border-tertiary pb-4 mb-8", modalHeaderClass)}>
          <slot name="header"></slot>
          {#if closeBtn!==false}
          <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity" on:click={()=>toggle()}>
            <Close/>
          </button>
          {/if}
        </div>
        {:else if closeBtn!==false}
        <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-2" on:click={()=>toggle()}>
          <Close/>
        </button>
      {/if}

      <slot name="body"></slot>

      {#if $$slots.footer}
        <div class={twMerge("modal-footer border-t border-black/10 dark:border-tertiary pt-4 mt-8", modalFooterClass)}>
          <slot name="footer"></slot>
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
    @apply flex flex-col p-8 md:p-12 relative;
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
  .theui-modal.animate .backdrop{
    @apply opacity-0;
  }
  .theui-modal.open .backdrop{
    @apply opacity-90;
  }
  .theui-modal.animate .modal-content.slide-down{
    @apply transform -translate-y-8;
  }
  .theui-modal.animate .modal-content.slide-up{
    @apply transform translate-y-8;
  }
  .theui-modal.open .modal-content.slide-down, .theui-modal.open .modal-content.slide-up{
    @apply translate-y-0;
  }
  .theui-modal.animate .modal-content.zoom-in{
    @apply transform scale-90;
  }
  .theui-modal.animate .modal-content.zoom-out{
    @apply transform scale-110;
  }
  .theui-modal.open .modal-content.zoom-in, .theui-modal.open .modal-content.zoom-out{
    @apply scale-100;
  }
</style>