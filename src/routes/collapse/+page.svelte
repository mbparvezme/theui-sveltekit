<script lang="ts">
  import { Collapse, Container, Button } from '$lib'
</script>

<Container>
    <Collapse ariaLabel="COLLAPSE">
    <Button slot="title" label="Collapse using button"/>
    <div slot="body">
        Nam pretium turpis et arcu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Curabitur suscipit suscipit tellus.
    </div>
    </Collapse>

    <Collapse ariaLabel="COLLAPSE">
    <p slot="title" class="font-bold">Collapse using HTML tag</p>
    <div slot="body">
        Nam pretium turpis et arcu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Curabitur suscipit suscipit tellus.
    </div>
    </Collapse>
</Container>