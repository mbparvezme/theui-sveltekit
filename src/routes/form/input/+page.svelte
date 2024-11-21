<script lang="ts">
  import { Input, Label, HelperText } from "$lib"
</script>

<Input label="Name" name="test" variant="flat" helperText="This is helper text!" />
<br>
<br>
<Input name="test" variant="flat" helperText="This is helper text!" id="as1">
  {#snippet label()}
    <Label id="as1" label="Name" />
  {/snippet}
</Input>