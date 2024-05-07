<script>
  import { Container, Form, FileInput, Input } from "$lib"
</script>

<Container>
    <Form>
        <Input name="name" />
        <FileInput name="input" config={{variant: "flat", rounded: "full", size: "sm"}} />
        <FileInput name="input" config={{variant: "flat", rounded: "full", size: "md"}} />
        <FileInput name="input" config={{variant: "flat", rounded: "full", size: "lg"}} />
        <FileInput name="input" config={{variant: "flat", rounded: "full", size: "xl"}} />
    </Form>
</Container>