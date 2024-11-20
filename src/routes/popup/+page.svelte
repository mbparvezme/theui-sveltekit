<script lang="ts">
  import {Popup} from "$lib"
</script>

<Popup trigger="onEntryExit">
  {#snippet entryContent()}<p>Entry popup</p>{/snippet}
  {#snippet exitContent()}<p>Exit popup</p>{/snippet}
</Popup>