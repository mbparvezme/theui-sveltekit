<script lang="ts">
  import Popover from "$lib/Popover/Popover.svelte"
</script>

<p class="mb-4">Last summer at Tailwind Connect I shared a preview of Oxide — a new high-performance engine for Tailwind CSS that we've been working on, designed to simplify the developer experience and take advantage of how the web platform has evolved in recent years. The new engine was originally going to ship as a v3.x release, but even though we're committed to backwards compatibility, this feels so clearly like a new generation of the framework that it deserves to be v4.0.</p>

<br>
<br>

<button id="any_id_for_popover_1" class="ml-48 bg-red-200">Click</button>
<Popover placement="top" trigger="any_id_for_popover_1">
    Popover content goes here
</Popover>
<br>
<div id="any_id_for_popover_2" class="ml-48">Click</div>
<Popover placement="top" trigger="any_id_for_popover_2">
    Popover content goes here
</Popover>


<br>
<br>