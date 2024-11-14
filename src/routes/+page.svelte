<script lang="ts">
  import Popup from "$lib/Popup/Popup.svelte"
</script>

<p class="mb-4">Last summer at Tailwind Connect I shared a preview of Oxide — a new high-performance engine for Tailwind CSS that we've been working on, designed to simplify the developer experience and take advantage of how the web platform has evolved in recent years. The new engine was originally going to ship as a v3.x release, but even though we're committed to backwards compatibility, this feels so clearly like a new generation of the framework that it deserves to be v4.0.</p>
<br>
<br>
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