<script>
  import { Editor, Container, Input } from "$lib"
</script>

<Container>
  <Editor label="FULL EDITOR" name="editor" />
  <div class="mb-8"></div>
  <Editor label="MINI EDITOR" name="editor" miniEditor={true} />
  <div class="mb-8"></div>
  <Editor label="CUSTOM EDITOR" name="editor" exclude={["code"]} />
</Container>