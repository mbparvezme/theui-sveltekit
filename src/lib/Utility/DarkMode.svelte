<script lang="ts">
  import { onMount, type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  let {darkMode = true, icon = undefined, ...props} : {darkMode: boolean | 'system' | 'all', icon: Snippet|undefined, [key: string]: unknown} = $props()
  let toggleTheme: () => void = () => {}

  onMount((): void => {
    localStorage.setItem("theme", ((darkMode !== false && !localStorage.theme) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");
    toggleTheme = () => {
      const newTheme = localStorage.theme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }
  })
</script>

<svelte:head>
  {#if darkMode === true}
  <script>(() => document.documentElement.classList.toggle('dark', localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)))()</script>
  {/if}
  {#if darkMode === "system"}
  <script>(()=>{document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches)})()</script>
  {/if}
</svelte:head>

{#if darkMode !== false}
<button class={"theui-theme-toggler " + twMerge("bg-transparent p-0.5", (props?.class ?? "") as string)} onclick={()=>toggleTheme()} aria-label="Toggle light or dark mode">
  {#if icon}
    {@render icon()}
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4">
      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
    </svg>
  {/if}
</button>
{/if}