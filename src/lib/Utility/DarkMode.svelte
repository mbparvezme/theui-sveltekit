<script lang="ts">
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  export let darkMode: boolean | 'system' = true;
  let toggleTheme: () => void = () => {};

  onMount((): void => {
    if(darkMode === true){
      toggleTheme = () => {
        localStorage.setItem("theme", localStorage.theme == "light" ? "dark" : "light");
        document.querySelector("html")?.classList.remove("dark", "light");
        document.querySelector("html")?.classList.add(localStorage.theme);
      }
    }
  })
</script>

<svelte:head>
  {#if darkMode === true}
  <script>
    function setTheme() {
      if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    setTheme();
  </script>
  {/if}
  {#if darkMode === "system"}
  <script>
    function setTheme() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    setTheme();
  </script>
  {/if}
</svelte:head>

{#if darkMode === true}
<button class={"theui-theme-toggler " + twMerge("bg-transparent p-0.5", $$props?.class)} on:click={()=>toggleTheme()} aria-label="Toggle light or dark mode">
  <slot name="icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4">
      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
    </svg>
  </slot>
</button>
{/if}

<!--
@component
[Go to docs](https://www.theui.dev/r/skcl)
## Props
@prop export let darkMode: boolean | 'system' = true
-->
