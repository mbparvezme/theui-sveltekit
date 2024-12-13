<script lang="ts">
	import { Drawer, Container } from "$lib"
</script>

<div class="flex gap-4 justify-items-center">
  <Drawer>
    {#snippet trigger()}
      <button>Default (Start) drawer</button>
    {/snippet}
    <div class="p-8">
      Offcanvas content
    </div>
  </Drawer>

  <Drawer position="top">
    {#snippet trigger()}
      <button>Top drawer</button>
    {/snippet}
    <div class="p-8">
      Offcanvas content
    </div>
  </Drawer>
  <Drawer position="end">
    {#snippet trigger()}
      <button>End drawer</button>
    {/snippet}
    <div class="p-8">
      Offcanvas content
    </div>
  </Drawer>
  <Drawer position="bottom">
    {#snippet trigger()}
      <button>Bottom drawer</button>
    {/snippet}
    <div class="p-8">
      Offcanvas content
    </div>
  </Drawer>
</div>