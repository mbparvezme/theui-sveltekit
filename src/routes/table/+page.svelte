<script lang="ts">
  import { Table, THead, TBody, TR, Cell } from "$lib"

  let headers = ['product', 'category', 'price']
  let keys = ['items', 'category', 'price']

  let data = [
    { items : 'iPhone 11', category : 'Smart phone', price: '$1234' },
    { items : 'Asus K401UQ', category : 'Laptop', price: '$1234' },
    { items : 'Microsoft Surface Pro', category : 'Laptop', price: '$2000' },
    { items : 'iPhone 11', category : 'Smart phone', price: '$1234' },
  ]
</script>

<!-- {"<Table headers={headers} />"}
<Table headers={headers} />
<br>
{"<Table headers={headers} data={data} keys={keys} stripe hover />"}
<Table headers={headers} data={data} keys={keys} stripe hover />
<br> -->
{"{#snippet head()} && {#snippet body()}"}
<Table keys={keys} stripe hover>
  {#snippet head()}
    <THead  headers={headers} />
  {/snippet}
  {#snippet body()}
    <TBody data={data} {keys} />
  {/snippet}
</Table>
<br>
{"{#snippet head()} && {#snippet body()}"}
<Table keys={keys} stripe hover>
  {#snippet head()}
    <THead  headers={headers} />
  {/snippet}
  {#snippet body()}
    <TBody data={data} {keys} />
  {/snippet}
</Table>
<br>
{'<TR tableHeader data={["product", "category", "price"]}></TR>'}
<Table keys={keys} stripe hover>
  {#snippet head()}
    <THead>
      {#snippet headers()}
        <TR tableHeader data={["product", "category", "price"]}></TR>
      {/snippet}
    </THead>
  {/snippet}
  {#snippet body()}
    <TBody data={data} {keys} />
  {/snippet}
</Table>
<br>
{'<TR tableHeader data={{"items" : "product", "category" : "category","price" : "price"}} keys={keys}></TR>'}
<Table keys={keys} stripe hover>
  {#snippet head()}
    <THead>
      {#snippet headers()}
        <TR tableHeader data={{'items' : "product", 'category' : "category",'price' : "price"}} keys={keys}></TR>
      {/snippet}
    </THead>
  {/snippet}
  {#snippet body()}
    <TBody data={data} {keys} />
  {/snippet}
</Table>



<br>
{'<TR data={data[0]} {keys} />'}
<Table keys={keys} stripe hover>
  {#snippet head()}
    <THead>
      {#snippet headers()}
        <TR tableHeader data={["product", "category", "price"]}></TR>
      {/snippet}
    </THead>
  {/snippet}
  {#snippet body()}
    <TBody>
      {#snippet children()}
        <TR data={data[0]} {keys} />
        <TR data={data[1]} {keys} />
        <TR data={data[2]} {keys} />
      {/snippet}
    </TBody>
  {/snippet}
</Table>
<br>
{'TD/Cell to check inside TBody'}
<Table keys={keys} stripe hover>
  {#snippet head()}
    <THead>
      {#snippet headers()}
        <TR tableHeader data={{'items' : "product", 'category' : "category",'price' : "price"}} keys={keys}></TR>
      {/snippet}
    </THead>
  {/snippet}
  {#snippet body()}
    <TBody>
      {#snippet children()}
        <TR data={data[0]} {keys} />
        <TR data={data[1]} {keys} />
        <TR data={data[2]} {keys} />
      {/snippet}
    </TBody>
  {/snippet}
</Table>