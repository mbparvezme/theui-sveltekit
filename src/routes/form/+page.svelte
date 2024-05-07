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

    <Editor name="editor" label="Editor" value="<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>" override/>
    <Editor name="editor" label="Editor Mini" value="<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>" override mini/>
    <Editor name="editor" label="Editor Mini" value="<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>" override exclude={["blockquote", "codeblock"]}/>

    <FileInput name="file" variant="bordered" />
    <FileInput name="file" variant="filled" rounded="full" override />
    <FileInput name="file" variant="flat" rounded="full" override />
    <div>
      <Checkbox name="hello" label="CB1"/>
      <Checkbox name="hello" label="CB2" size="lg" override/>
      <Checkbox name="hello" label="Custom CB" checked size="lg" override custom customClasses="p-2 peer-checked:bg-brand peer-checked:text-on-brand">
        <span>CHK</span>
      </Checkbox>
      <Checkbox name="hello" label="CB disabled" disabled/>
    </div>
    <div>
      <Radio name="hello" label="RD1"/>
      <Radio name="hello" label="RD2" size="lg" override/>
      <Radio name="hello" label="Custom RD" checked size="lg" override custom customClasses="p-2 peer-checked:bg-brand peer-checked:text-on-brand">
        <span class="p-2 peer-checked:bg-brand peer-checked:text-on-brand">CHK</span>
      </Radio>
      <Radio name="hello" label="RD disabled" disabled/>
    </div>
    <Input name="Input" label="Enter your name" placeholder="Enter full name.." helperText="This is for user full name" />
    <Input name="Input" label="Enter your name" placeholder="Enter full name.." helperText="This is for user full name" config={{variant: "flat"}}/>
    <Input name="Input" label="Enter your name" placeholder="Enter full name.." helperText="This is for user full name" config={{variant: "filled"}}/>
    <Textarea name="textarea" label="Text" placeholder="Enter full name.."/>
    <Textarea name="textarea" label="Text" placeholder="Enter full name.." helperText="This is for text area" config={{variant: "flat"}}/>
    <Textarea name="textarea" label="Text" placeholder="Enter full name.." helperText="This is for text area" config={{variant: "filled"}}/>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option"/>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option" config={{variant: "flat"}}/>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option" config={{variant: "filled"}}/>
  </Form>
</Container>