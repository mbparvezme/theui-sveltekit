<script lang="ts">
  import {Modal} from "$lib"
</script>

<Modal label="Default modal">
  {#snippet button(attr, label)}
    <span {...attr}>{label}</span>
  {/snippet}

  {#snippet header()}
    <h3>This is modal title</h3>
  {/snippet}

  {#snippet content()}
    Hello
  {/snippet}
</Modal>

<Modal animation="slide-up" label="Slide-up modal" position="top" size="sm">
  {#snippet button(attr, label)}
    <span {...attr}>{label}</span>
  {/snippet}

  {#snippet header()}
    <h3>This is modal title</h3>
  {/snippet}

  {#snippet content()}
    Hello
  {/snippet}
</Modal>

<Modal animation="slide-up" label="Center modal" position="bottom" size="lg">
  {#snippet button(attr, label)}
    <span {...attr}>{label}</span>
  {/snippet}

  {#snippet header()}
    <h3>This is modal title</h3>
  {/snippet}

  {#snippet content()}
    Hello
  {/snippet}
</Modal>