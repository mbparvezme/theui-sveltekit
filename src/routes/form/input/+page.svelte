<script lang="ts">
  import { Container, Input, Textarea } from "$lib"
</script>

<Container>
  <div>
    <Input name="Input" label="Enter your name" placeholder="Enter full name.." helperText="This is for user full name" />
    <br>
    <Input name="Input" label="Enter your name" placeholder="Enter full name.." helperText="This is for user full name" config={{variant: "flat"}}/>
    <br>
    <Input name="Input" label="Enter your name" placeholder="Enter full name.." helperText="This is for user full name" config={{variant: "filled"}}/>
    <br>
    <Textarea name="textarea" label="Text" placeholder="Enter full name.."/>
    <br>
    <Textarea name="textarea" label="Text" placeholder="Enter full name.." helperText="This is for text area" config={{variant: "flat"}}/>
    <br>
    <Textarea name="textarea" label="Text" placeholder="Enter full name.." helperText="This is for text area" config={{variant: "filled"}}/>
  </div>
</Container>