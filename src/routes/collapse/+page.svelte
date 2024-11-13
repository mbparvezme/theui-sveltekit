<script lang="ts">
  import Collapse from '$lib/Collapse/Collapse.svelte'
</script>

<Collapse ariaLabel="COLLAPSE">
  {#snippet title()}<button>Flush collapse title</button>{/snippet}
  {#snippet content()}
    Nam pretium turpis et arcu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Curabitur suscipit suscipit tellus.
  {/snippet}
</Collapse>

<Collapse ariaLabel="COLLAPSE">
  {#snippet title()}<p class="font-bold">Collapse using HTML tag</p>{/snippet}
  {#snippet content()}
    Nam pretium turpis et arcu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Curabitur suscipit suscipit tellus.
  {/snippet}
</Collapse>