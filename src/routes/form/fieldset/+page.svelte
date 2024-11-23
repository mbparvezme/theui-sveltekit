<script lang="ts">
  import {Input, Fieldset} from "$lib"
</script>

<Fieldset title="Hello">
  {#snippet children()}
    <Input label="Test" name="text" />
  {/snippet}
</Fieldset>