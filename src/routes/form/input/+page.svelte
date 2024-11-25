<script lang="ts">
  import { Form, Input, Label, HelperText } from "$lib"
</script>

<Form floatingLabel={true}>
  {#snippet children()}
  <Input label="NAME" name="test" variant="flat" helperText="This is helper text inside form!" />
  <Input label="NAME" name="test" variant="flat" helperText="This is helper text inside form!" />
  <Input label="NAME" name="test" variant="bordered" helperText="This is helper text inside form!" />
  <Input type="textarea" label="NAME" name="test" helperText="This is helper text inside textarea!" />
  <Input type="textarea" label="NAME" name="test" variant="flat" helperText="This is helper text inside textarea!" />
  <Input type="textarea" label="NAME" name="test" helperText="This is helper text inside textarea!" />
  {/snippet}
</Form>
<br>
<br>

<Input label="Name" name="test" variant="flat" helperText="This is helper text!" floatingLabel={true} />
<br>
<br>
<Input name="test" variant="flat" helperText="This is helper text!" id="as1">
  {#snippet label()}
    <Label id="as1" label="Name" />
  {/snippet}
</Input>