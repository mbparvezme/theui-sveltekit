<script lang="ts">
    import { Button, ButtonGroup, Container } from "$lib"
</script>

<Container>
    <Button props={{label: "Default"}}/>
    <Button label="Active Button" isActive={true}/>
    <Button label="Active Link" isActive={true} href="#"/>
    <Button label="Outline" outline={true}/>
    <Button label="Custom Outline" outline={true} class="border-red-500 text-red-500 hover:bg-red-500 hover:text-red-100"/>
    <h3 class="text-xl pt-24">Button group</h3>
    <p>Default group</p>
    <ButtonGroup label="a11y title">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <p>Outline group</p>
    <ButtonGroup label="a11y title" outline={true}>
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <p>Flat button group</p>
    <ButtonGroup label="a11y title" variant="flat">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    
    <ButtonGroup label="a11y title" stacked={true} outline={true}>
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
</Container>
