<script lang="ts">
  import type {SELECT_DATA} from "$lib/types"
  import { Container, Select } from "$lib"
  let selectData: SELECT_DATA = [
    "select 1",
    "select 2",
    "select 3",
    "select 4",
  ]
</script>

<Container>
  <div>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option"/>
    <br>
    <br>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option" variant="flat"/>
    <br>
    <br>
    <Select name="select" label="Select label" data={selectData} placeholder="Select option" variant="filled"/>
  </div>
</Container>