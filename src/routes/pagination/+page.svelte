<script lang="ts">
  import { Pagination } from "$lib"

  let data: any = [
    {url: "/page/5"},
    {url: "/page/6"},
    {url: "/page/7", active: true},
    {url: "/page/8"},
    {url: "/page/9"},
  ]

</script>

<Pagination {data} />
<Pagination {data} variant="flat" />

<Pagination minimalMode={true} />