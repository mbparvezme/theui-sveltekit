<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { onMount } from "svelte"
  import { getRounded } from "$lib/functions"
  import { twMerge } from "tailwind-merge"

  export let trigger        : 'onEntry' | 'onExit' = "onEntry"
  export let repeat         : boolean | 'page' = true
  export let backdrop       : boolean|string = true
  export let containerClass : string = ""
  export let rounded        : ROUNDED = "xl"
  export let staticBackdrop : boolean = false

  let popup = false

  onMount(() => {
    if(trigger == "onEntry"){
      const onPageLoad = () => {
        if(repeat === false){
          if(localStorage.getItem("entryPopUp")) return
          localStorage.setItem("entryPopUp", "true")
        }
        if(repeat === "page"){
          let epData = JSON.parse(localStorage.getItem("entryPopUp") || "[]");
          if (!epData.includes(window.location.href)) {
              epData.push(window.location.href);
              localStorage.setItem("entryPopUp", JSON.stringify(epData));
          }
        }
        popup = true
      }
      onPageLoad()
    }
    if(trigger == 'onExit'){
      const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if(e.clientY < 50 && e.relatedTarget == null && target?.nodeName.toLowerCase() !== 'select') {
          if(repeat === false){
            if(localStorage.getItem('exitPopUp')) return
            localStorage.setItem('exitPopUp', 'true')
          }
          if(repeat === 'page'){
            document.removeEventListener("mouseout", onMouseOut)
            let epData = JSON.parse(localStorage.getItem('exitPopUp') || '[]');
            if (!epData.includes(window.location.href)) {
                epData.push(window.location.href);
                localStorage.setItem('exitPopUp', JSON.stringify(epData));
            }
          }
          popup = true
        }
      }
      document.addEventListener("mouseout", onMouseOut)
    }
  })

	let handleKeyboard = (e: KeyboardEvent) => {
		if (e.code === "Escape"){
      e.preventDefault()
      popup = false
    }
		return
	}

  let handleBackdrop = () => {
		if (staticBackdrop === false){
      popup = false
    }
		return
  }
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if popup}
<div class="theui-popup !z-[80] fixed inset-0 {twMerge("overflow-y-hidden flex items-center justify-center", containerClass)}" role='dialog'>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if backdrop !== false}<div class="back-drop fixed inset-0 {twMerge("bg-black/50", (typeof backdrop == "string" ? backdrop : ""))} z-[-1]" on:click={()=>handleBackdrop()}></div>{/if}
  <div class="content overflow-y-auto relative {twMerge("bg-secondary max-w-3xl max-h-screen p-8", $$props?.class)} {getRounded(rounded)}">
    <slot />
  </div>
</div>
{/if}