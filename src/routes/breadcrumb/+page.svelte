<script lang="ts">
  import type {BREADCRUMB_DATA} from "$lib/types"
  import { Breadcrumb } from "$lib"
  let BreadcrumbData: BREADCRUMB_DATA[] = [
    { text: "Home", url: "#", },
    { text: "About", url: "#", },
    { text: "Contact" },
  ]
</script>

<Breadcrumb data={BreadcrumbData} />