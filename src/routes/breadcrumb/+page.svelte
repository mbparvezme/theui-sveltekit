<script lang="ts">
    import type { BREADCRUMB_DATA } from "$lib/types"
    import { Breadcrumb, Container } from "$lib"
    let breadcrumbData : BREADCRUMB_DATA = [
        { text: "Home", url: "#", },
        { text: "About", url: "#", },
        { text: "Contact" },
    ]
</script>

<Container>
    <Breadcrumb data={breadcrumbData} />
</Container>