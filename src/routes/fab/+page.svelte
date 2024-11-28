<script lang="ts">
  import {Fab, FabButton} from "$lib"
</script>


<Fab align="start" rounded="full" size="md" />
<Fab rounded="full">
  {#snippet children()}
    <FabButton />
  {/snippet}
</Fab>