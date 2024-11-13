<script lang="ts">
	import { Drawer, Container } from "$lib"
</script>

<div class="flex gap-4 justify-items-center">
  <Drawer>
    {#snippet button(attr)}
      <button {...attr}>Default (Start) drawer</button>
    {/snippet}
    {#snippet content()}
    <div class="p-8">
      Offcanvas content
    </div>
    {/snippet}
  </Drawer>
  <Drawer position="top">
    {#snippet button()}
      <button>Top drawer</button>
    {/snippet}
    {#snippet content()}
    <div class="p-8">
      Offcanvas content
    </div>
    {/snippet}
  </Drawer>
  <Drawer position="end">
    {#snippet button()}
      <button>End drawer</button>
    {/snippet}
    {#snippet content()}
    <div class="p-8">
      Offcanvas content
    </div>
    {/snippet}
  </Drawer>
  <Drawer position="bottom">
    {#snippet button()}
      <button>Bottom drawer</button>
    {/snippet}
    {#snippet content()}
    <div class="p-8">
      Offcanvas content
    </div>
    {/snippet}
  </Drawer>
</div>