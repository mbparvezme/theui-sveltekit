<script lang="ts">
    import {Alert, Container} from "$lib"
</script>


<Container class="grid grid-cols-1 gap-4">
    <Alert dismissible>Dismissible</Alert>
    <Alert dismissible type="info">Dismissible</Alert>
    <Alert dismissible type="success">Dismissible</Alert>
    <Alert dismissible type="warning">Dismissible</Alert>

    Rounded conner test
    <Alert round="none">Not rounded</Alert>

    hideIcon test
    <Alert hideIcon>No icon</Alert>

    Flat Alert test
    <Alert type="error" theme="flat">Hello</Alert>
    <Alert type="info" theme="flat">Hello</Alert>
    <Alert type="success" theme="flat">Hello</Alert>
    <Alert type="warning" theme="flat">Hello</Alert>

    Flat with variant Alert test
    <Alert theme="flat" type="error" border="none">Hello</Alert>
    <Alert theme="flat" type="info" border="all">Hello</Alert>
    <Alert theme="flat" type="success" border="top">Hello</Alert>
    <Alert theme="flat" type="warning" border="bottom">Hello</Alert>
    <Alert theme="flat" type="warning" border="start">Hello</Alert>
    <Alert theme="flat" type="warning" border="x">Hello</Alert>
    <Alert theme="flat" type="warning" border="y">Hello</Alert>
    Variant
    <Alert type="error" border="none">Hello</Alert>
    <Alert type="info" border="all">Hello</Alert>
    <Alert type="success" border="top">Hello</Alert>
    <Alert type="warning" border="bottom">Hello</Alert>
    <Alert type="warning" border="start">Hello</Alert>
    <Alert type="warning" border="x">Hello</Alert>
    <Alert type="warning" border="y">Hello</Alert>
    <Alert type="warning" border="y" class="bg-red-500 text-red-100">Custom</Alert>
</Container>