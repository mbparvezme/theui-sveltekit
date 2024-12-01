<script lang="ts">
  import {Fab, FabButton} from "$lib"
</script>

<Fab align="start" direction="horizontal" size="sm">
  {#snippet children()}
    <FabButton href="/end" />
    <FabButton href="/end" />
  {/snippet}
</Fab>

<Fab direction="horizontal" size="sm">
  {#snippet children()}
    <FabButton href="/end" />
    <FabButton href="/end" />
  {/snippet}
</Fab>