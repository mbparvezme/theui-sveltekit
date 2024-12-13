<script lang="ts">
  import {Modal} from "$lib"
</script>

<Modal label="Default modal">
  {#snippet header()}
    <h3>This is modal title</h3>
  {/snippet}

Hello
</Modal>

<Modal animation="slide-up" label="Slide-up modal" position="top" size="sm">
  {#snippet header()}
    <h3>This is modal title</h3>
  {/snippet}

Hello
</Modal>

<Modal animation="slide-up" label="Bottom modal" position="bottom" size="lg">
  {#snippet header()}
    <h3>This is modal title</h3>
  {/snippet}

Hello
</Modal>