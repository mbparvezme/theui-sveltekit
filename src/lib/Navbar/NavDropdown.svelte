<script lang="ts">
  import { getContext, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { animationClass, roundedClass, generateToken } from "$lib/functions"
  import { Svg } from "$lib"
	import type { MOBILE_NAV_ON, RESPONSIVE_NAV_ON } from "$lib/types"

  const { config } = getContext('NAV') as any
  config.isDropdown = true

  interface Props {
    label : Snippet | string,
    children?: Snippet,
    icon?: Snippet|boolean,
    megaMenu?: boolean,
    align?: 'start'|'end',
    size?: MOBILE_NAV_ON,
    animation?: 'fade'|'slide-up'|'zoom-in',
    dropdownEvent ?: 'hover' | 'click',
    [key: string]: unknown
  }

  let{
    label,
    children,
    icon = true,
    megaMenu = false,
    align = "start",
    size = "md",
    animation = "zoom-in",
    dropdownEvent = config.dropdownEvent,
    ...props
  } : Props = $props()

  let id: string = generateToken();

  let nonResCls = "absolute pl-0 flex shadow-xl block w-80 max-h-[80vh]"

  let dropdownTopPositionClasses: Record<'sm' | 'md' | 'lg' | 'xl', String> = {
    sm: "top-12",
    md: "top-16",
    lg: "top-20",
    xl: "top-24",
  }

  let resCls = () => {
    // object
    let collapseClasses: RESPONSIVE_NAV_ON = {
      sm: "md-collapse md:absolute md:pl-2 md:flex md:shadow-xl md:block dark:md:bg-tertiary",
      md: "lg-collapse lg:absolute lg:pl-2 lg:flex lg:shadow-xl lg:block dark:lg:bg-tertiary",
      lg: "xl:absolute xl:pl-2 xl:flex xl:shadow-xl xl:block dark:xl:bg-tertiary",
      xl: "2xl:absolute 2xl:pl-2 2xl:flex 2xl:shadow-xl 2xl:block dark:2xl:bg-tertiary",
    }

    let menuWidthClasses: Record<MOBILE_NAV_ON, Record<MOBILE_NAV_ON, string>> = {
      sm: {
        sm: "md:w-64",
        md: "md:w-[460px]",
        lg: "md:w-80",
        xl: "md:w-96",
      },
      md: {
        sm: "lg:w-64",
        md: "lg:w-[460px]",
        lg: "lg:w-80",
        xl: "lg:w-96",
      },
      lg: {
        sm: "xl:w-64",
        md: "xl:w-[460px]",
        lg: "xl:w-80",
        xl: "xl:w-96",
      },
      xl: {
        sm: "2xl:w-64",
        md: "2xl:w-[460px]",
        lg: "2xl:w-80",
        xl: "2xl:w-96",
      },
    }

    let menuMaxWidthClasses: RESPONSIVE_NAV_ON = {
      sm: "md:max-h-[80vh]",
      md: "lg:max-h-[80vh]",
      lg: "xl:max-h-[80vh]",
      xl: "2xl:max-h-[80vh]",
    }

    return `shadow-none hidden 
            ${collapseClasses[config.mobileNavOn as MOBILE_NAV_ON]}
            ${roundedClass(config?.rounded, "bottom")}
            ${animationClass(config.animate)} 
            ${megaMenu ? "mega-menu inset-x-0" : (align=="end" ? "end-0" : "start-0")}
            ${megaMenu ? "w-full" : `${menuMaxWidthClasses[config.mobileNavOn as MOBILE_NAV_ON]} ${menuWidthClasses[config.mobileNavOn as MOBILE_NAV_ON][size]}`}`
  }

  let dropdownClasses = `nav-dropdown flex-col ps-4 py-2 pe-2 bg-primary overflow-y-auto ${dropdownTopPositionClasses[config.height as MOBILE_NAV_ON]} ${!config.mobileNavOn ? nonResCls : resCls()}`

  let toggle = () => {
    if(dropdownEvent !== "hover"){
      let dd = document.getElementById(id)
      if(dd?.classList.contains("hide")){
        let activeDd = document.querySelectorAll(".theui-nav-dropdown-container:not(.hide)")
        activeDd.forEach(elm => elm.classList.add("hide"))
        dd.classList.remove("hide")
      }else{
        dd?.classList.add("hide")
      }
    }
  }

  let handleMouse = (e: MouseEvent) => {
    if(dropdownEvent === "hover"){
      e.preventDefault()
      document.getElementById(id)?.classList.toggle("hide")
    }
	}

  let handleKeyboard = (e: KeyboardEvent) => {
    if(e.code == "Escape" || e.code == "ArrowUp"){
      e.preventDefault()
      document.getElementById(id)?.classList.add("hide")
    }
    if(e.code == "ArrowDown"){
      e.preventDefault()
      document.getElementById(id)?.classList.remove("hide")
    }
    return
	}

  let handleBlur = (e: MouseEvent) => {
    if((e.target as HTMLElement).closest("#"+id+":not(.hide)") === null){
      document.getElementById(id)?.classList.add("hide")
    }
    return
  }
</script>

<svelte:window on:click={(e)=>handleBlur(e)}/>

<div {id} class="theui-nav-dropdown-container hide z-[1]" class:relative={!megaMenu}>
  <button class="theui-nav-dropdown-btn gap-x-1 w-full justify-between flex items-center {config.linkClasses}" onmouseenter={(e)=>handleMouse(e)} onmouseleave={(e)=>handleMouse(e)} onkeydown={(e)=>handleKeyboard(e)} onclick={()=>toggle()}>
    {#if typeof label === "string"}
      {@html label}
    {/if}
    {#if typeof label === "function"}
      {@render label()}
    {/if}
    {#if icon}
      {#if typeof icon === "function"}
        {@render icon?.()}
      {:else}
        <Svg stroke={true} viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></Svg>
      {/if}
    {/if}
  </button>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="navbar-dropdown {twMerge(dropdownClasses, props?.class as string)}"
        class:fade={animation=="fade"}
        class:slide-up={animation=="slide-up"}
        class:zoom-in={animation=="zoom-in"}
        onclick={()=>toggle()}>
    {#if children}
      {@render children?.()}
    {/if}
  </div>
</div>

<style lang="postcss">
  .theui-nav-dropdown-container.hide .nav-dropdown{
    @apply invisible;
  }
  .theui-nav-dropdown-container.hide .nav-dropdown.fade{
    @apply opacity-0 translate-y-2 transition-none;
  }
  .theui-nav-dropdown-container.hide .nav-dropdown.slide-up{
    @apply translate-y-8 opacity-0 transition-none;
  }
  .theui-nav-dropdown-container.hide .nav-dropdown.zoom-in{
    @apply scale-75 opacity-0 translate-y-2 transition-none;
  }
  .theui-nav-dropdown-container:not(.hide) .theui-nav-dropdown-btn{
    @apply bg-secondary dark:bg-gray-600 transition-all duration-150;
  }
  .theui-nav-dropdown-container:not(.hide) .nav-dropdown{
    @apply visible block;
    @apply translate-y-2 opacity-100 scale-100 transition-all duration-150;
  }
</style>