<script lang="ts">
  import {ListGroup, ListItem} from "$lib"
</script>

<ListGroup>
  {#snippet children()}
    <ListItem content="Item 1"/>
    <ListItem content="Item 2"/>
    <ListItem content="Item 3"/>
    <ListItem content="Item 4"/>
  {/snippet}
</ListGroup>

<br>
<br>

<ListGroup variant="flat">
  {#snippet children()}
    <ListItem content="Item 1"/>
    <ListItem content="Item 2"/>
    <ListItem content="Item 3"/>
    <ListItem content="Item 4"/>
  {/snippet}
</ListGroup>