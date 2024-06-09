<script lang="ts">
    import { Button, ButtonGroup, Container } from "$lib"
</script>

<Container>
    <Button label="Default" />
    <Button label="Active Button" active/>
    <Button label="Active Link" active href="#" target="_blank" />
    <Button label="Active Link" active href="#" target="_blank" noExternalLinkIcon />
    <Button label="Outline" style="outline"/>
    <Button label="Custom Outline" readonly />
    <br>
    <br>
    <Button style="text" label="Default" />
    <Button style="text" label="Active Button" active/>
    <Button style="text" label="Active Link" active href="#" target="_blank" />
    <Button style="text" label="Active Link" active href="#" target="_blank" noExternalLinkIcon />
    <Button style="text" label="Outline"/>
    <Button style="text" label="Custom Outline" readonly />
    <br>
    <br>
    <Button label="ERROR" variant="error" />
    <Button label="INFO" variant="info" />
    <Button label="SUCCESS" variant="success" />
    <Button label="WARNING" variant="warning" active href="#" target="_blank"  />
    <br>
    <br>
    <Button label="ERROR" style="outline" variant="error" />
    <Button label="INFO" style="outline" variant="info" />
    <Button label="SUCCESS" style="outline" variant="success" />
    <Button label="WARNING" style="outline" variant="warning" active href="#" target="_blank" />
    <h3 class="text-xl pt-8">Button group</h3>
    <p>Default group</p>
    <ButtonGroup label="a11y title">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <p class="pt-2">Outline group</p>
    <ButtonGroup label="a11y title" style="outline">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <p class="pt-2">Elevated button group</p>
    <ButtonGroup label="a11y title" style="elevated">
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
