<script lang="ts">
  import type { ROUNDED } from "$lib/types"
  import { onMount, type Snippet } from "svelte"
  import { roundedClass } from "$lib/functions"
  import { twMerge } from "tailwind-merge"

  interface Props {
    content ?: Snippet|undefined,
    trigger ?: 'onEntry' | 'onExit',
    repeat ?: boolean | 'page',
    backdrop ?: boolean|string,
    containerClass ?: string,
    rounded ?: ROUNDED,
    staticBackdrop ?: boolean,
    [key: string]: unknown // class
  }

  let {
    content = undefined,
    trigger = "onEntry", 
    repeat = true,
    backdrop = true,
    containerClass = "",
    rounded = "xl",
    staticBackdrop = false,
    ...props // class
  } : Props = $props()

  let popup = $state(false)

  onMount(() => {
    if(trigger == "onEntry"){
      const onPageLoad = () => {
        if(repeat === false){
          if(localStorage.getItem("entryPopUp")) return
          localStorage.setItem("entryPopUp", "true")
        }
        if(repeat === "page"){
          let epData = JSON.parse(localStorage.getItem("entryPopUp") || "[]")
          if (!epData.includes(window.location.href)) {
              epData.push(window.location.href)
              localStorage.setItem("entryPopUp", JSON.stringify(epData))
          }
        }
          console.log("Before popup: ", popup)
          popup = true
          console.log("After popup: ", popup)
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
	}

  let handleBackdrop = () => {
		if (staticBackdrop === false){
      popup = false
    }
  }
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if popup}
<div class="theui-popup !z-[80] fixed inset-0 {twMerge("overflow-y-hidden flex items-center justify-center", containerClass)}" class:entry-popup={trigger == "onEntry"} class:exit-popup={trigger == "onExit"} role='dialog'>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  {#if backdrop !== false}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="back-drop fixed inset-0 {twMerge("bg-black/50", (typeof backdrop == "string" ? backdrop : ""))} z-[-1]" onclick={()=>handleBackdrop()}></div>
  {/if}
  <div class="content overflow-y-auto relative {twMerge("bg-secondary max-w-3xl max-h-screen p-8", (props?.class ?? "") as string)} {roundedClass(rounded)}">
    {@render content?.()}
  </div>
</div>
{/if}