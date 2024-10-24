<script lang="ts">
  import type {SELECT_DATA} from "$lib/types"
  import { Container} from "$lib"
  import { Form, Input, Textarea, Select, Checkbox, Radio, FileInput, Editor} from "$lib"

  let selectData: SELECT_DATA = [
    "select 1",
    "select 2",
    "select 3",
    "select 4",
  ]

  let html = "<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>"
</script>

<Container>
  <Form rounded="full">

    <Select name="select" label="Select label" data={selectData} placeholder="Select option"/>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option" config={{variant: "flat"}}/>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option" config={{variant: "filled"}}/>
  </Form>
</Container>