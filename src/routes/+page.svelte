<script lang="ts">
  import Popover from "$lib/Popover/Popover.svelte"
</script>

<p class="mb-4">Last summer at Tailwind Connect I shared a preview of Oxide — a new high-performance engine for Tailwind CSS that we've been working on, designed to simplify the developer experience and take advantage of how the web platform has evolved in recent years. The new engine was originally going to ship as a v3.x release, but even though we're committed to backwards compatibility, this feels so clearly like a new generation of the framework that it deserves to be v4.0.</p>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<!-- Example Usage -->
<button id="trigger-1" class="px-4 py-2 bg-blue-500 text-white rounded">Trigger 1</button>
<div
  data-popover-id="trigger-1"
  class="popover bg-gray-200 p-2 rounded shadow hidden">
  Popover 1 Popover 1 Popover 1 Popover 1 
</div>
<Popover triggerId="trigger-1" popoverId="trigger-1" />

<button id="trigger-2" class="px-4 py-2 bg-blue-500 text-white rounded">Trigger 2</button>
<div
  data-popover-id="trigger-2"
  class="popover bg-gray-200 p-2 rounded shadow hidden">
  Popover 2
</div>
<Popover triggerId="trigger-2" popoverId="trigger-2" />


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>