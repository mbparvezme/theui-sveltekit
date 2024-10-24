<script lang="ts">
  import { Container, FileInput } from "$lib"
</script>

<Container>
  <div>
    <FileInput name="file" variant="bordered" />
    <br>
    <FileInput name="file" variant="filled" rounded="full" override />
    <br>
    <FileInput name="file" variant="flat" rounded="full" override />
  </div>
</Container>