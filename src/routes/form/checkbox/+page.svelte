<script lang="ts">
  import {Checkbox, Fieldset} from "$lib"
</script>

<Fieldset title="Hello">
  {#snippet children()}
    <Checkbox label="Test 1" name="text" size="sm" />
    <Checkbox label="Test 2" name="text" size="sm" />
  {/snippet}
</Fieldset>