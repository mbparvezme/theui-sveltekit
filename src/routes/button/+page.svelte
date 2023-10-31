<script lang="ts">
    import { Button, ButtonGroup, Container } from "$lib"
</script>

<Container>
    <Button label="Button 1" />
    <Button label="Active Button" isActive={true} />
    <Button label="Active Button" isActive={true} href="#" />
    <Button label="Button 1" outline={true} />
    <div class="my-24"></div>
    <ButtonGroup label="a11y title">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    
    <ButtonGroup label="a11y title" stacked={true}>
      <Button label="Button 1" outline={true} />
      <Button label="Button 2" outline={true} />
      <Button label="Button 3" outline={true} />
    </ButtonGroup>
</Container>
