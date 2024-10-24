<script lang="ts">
  import { Container, Editor } from "$lib"
</script>

<Container>
  <div>
    <Editor name="editor" label="Editor" value="<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>" override/>
    <Editor name="editor" label="Editor Mini" value="<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>" override mini/>
    <Editor name="editor" label="Editor Mini" value="<b>Hello editor!</b> <i>Are you ready?</i> <u>Click here!</u>" override exclude={["blockquote", "codeblock"]}/>
  </div>
</Container>