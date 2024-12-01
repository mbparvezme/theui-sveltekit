<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import {Dropdown} from "$lib"
  let visible = $state(false)




  let mainBtn = "flex items-center justify-center w-16 h-16 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  let fabContainerBtn = "flex absolute "
  let fabYContainerBtn = "flex-col bottom-16 end-1/2 translate-x-1/2 space-y-3 mb-4"
  let fabXContainerBtn = "flex-row end-16 top-1/2 -translate-y-1/2 space-x-3 me-4"

  let btn = "flex items-center justify-center w-12 h-12 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"

</script>

<p class="mb-4">Last summer at Tailwind Connect I shared a preview of Oxide — a new high-performance engine for Tailwind CSS that we've been working on, designed to simplify the developer experience and take advantage of how the web platform has evolved in recent years. The new engine was originally going to ship as a v3.x release, but even though we're committed to backwards compatibility, this feels so clearly like a new generation of the framework that it deserves to be v4.0.</p>
<br>
<br>



<div class="fixed bottom-6 end-6">
  <button class={mainBtn} aria-label="Main FAB" onclick={()=> visible = !visible}></button>
  {#if visible}
  <div class={fabContainerBtn + fabYContainerBtn} in:fly={{ y: 16, duration: 200 }}>
    <button class="hover:bg-green-600 bg-green-500 {btn}" aria-label="Action 1"></button>
    <button class="bg-red-500 text-white hover:bg-red-600 {btn}" aria-label="Action 2"></button>
    <button class="bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300 {btn}" aria-label="Action 3"></button>
  </div>
  {/if}

  {#if visible}
  <div class={fabContainerBtn + fabXContainerBtn} in:fly={{ x: 16, duration: 200 }}>
    <button class="hover:bg-green-600 bg-green-500 {btn}" aria-label="Action 1"></button>
    <button class="bg-red-500 text-white hover:bg-red-600 {btn}" aria-label="Action 2"></button>
    <button class="bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300 {btn}" aria-label="Action 3"></button>
  </div>
  {/if}
</div>



<br>
<br>

<Dropdown label="Text dropdown">
  {#snippet children()}
    Hello
  {/snippet}
</Dropdown>
<br>
<div class="flex gap-4 justify-center">
  <button class=" bg-blue-500 text-blue-50 w-6 h-6">xs</button>
  <button class=" bg-blue-500 text-blue-50 w-9 h-9">sm</button>
  <button class=" bg-blue-500 text-blue-50 w-12 h-12">md</button>
  <button class=" bg-blue-500 text-blue-50 w-16 h-16">lg</button>
  <button class=" bg-blue-500 text-blue-50 w-24 h-24">xl</button>
</div>
<br>
<br>
<br>
<div class="grid grid-cols-6 text-center">
  <div class="w-48 h-48 bg-brand-primary-500 text-on-brand-primary-500 pt-8">Hello</div>
  <div class="w-48 h-48 bg-brand-secondary-500 text-on-brand-secondary-500 pt-8">Hello</div>
</div>