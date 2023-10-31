<script lang="ts">
    import {Alert, Container} from "$lib"
</script>

<Container>
    Generale types (deep card)
    <Alert>Hello</Alert>
    <Alert type="info">Hello</Alert>
    <Alert type="success">Hello</Alert>
    <Alert type="warning">Hello</Alert>
    <div class="my-24"></div>
    Generale types (light card)
    <Alert type="error" theme="light">Hello</Alert>
    <Alert type="info" theme="light">Hello</Alert>
    <Alert type="success" theme="light">Hello</Alert>
    <Alert type="warning" theme="light">Hello</Alert>
    <div class="my-24"></div>
    Variant
    <Alert type="error" theme="light" variant="borderBottom">Hello</Alert>
    <Alert type="info" theme="light" variant="borderBottom">Hello</Alert>
    <Alert type="success" theme="light" variant="borderTop">Hello</Alert>
    <Alert type="warning" theme="light" variant="borderTop">Hello</Alert>
    <Alert type="warning" theme="light" variant="card" class="py-8">Hello</Alert>
</Container>