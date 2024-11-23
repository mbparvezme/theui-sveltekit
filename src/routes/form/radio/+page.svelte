<script lang="ts">
  import {Radio, Fieldset} from "$lib"
</script>

<Fieldset title="Hello">
  {#snippet children()}
    <Radio label="Test 1" name="text" size="sm" />
    <Radio label="Test 2" name="text" size="sm" />
  {/snippet}
</Fieldset>