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
<br>
<Pagination {data} showPrevNext={false}/>
<br>
<Pagination />
<br><br>
<Pagination variant="flat" {data} />
<br>
<Pagination variant="flat" {data} showPrevNext={false}/>
<br>
<Pagination variant="flat" />