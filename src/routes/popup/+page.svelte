<script lang="ts">
  import Popup from "$lib/Popup/Popup.svelte"
</script>

<Popup trigger="onEntry">
  {#snippet entryContent()}<p>Entry popup</p>{/snippet}
  {#snippet exitContent()}<p>Exit popup</p>{/snippet}
</Popup>