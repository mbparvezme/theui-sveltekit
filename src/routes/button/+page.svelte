<script lang="ts">
    import { Button, ButtonGroup, Container } from "$lib"
</script>

<Container>
    <Button label="Default" />
    <Button label="Active Button" active/>
    <Button label="Active Link" active href="#" target="_blank" />
    <Button label="Active Link" active href="#" target="_blank" noExternalLinkIcon />
    <Button label="Outline" variant="outline"/>
    <Button label="Custom Outline" readonly />
    <br>
    <br>
    <Button label="Default" />
    <Button label="Active Button" active/>
    <Button label="Active Link" active href="#" target="_blank" />
    <Button label="Active Link" active href="#" target="_blank" noExternalLinkIcon />
    <Button label="Outline"/>
    <Button label="Custom Outline" readonly />
    <br>
    <br>
    <Button label="ERROR" theme="error" />
    <Button label="INFO" theme="info" />
    <Button label="SUCCESS" theme="success" />
    <Button label="WARNING" theme="warning" active/>
    <br>
    <br>
    <Button label="ERROR" variant="outline" theme="error" />
    <Button label="INFO" variant="outline" theme="info" />
    <Button label="SUCCESS" variant="outline" theme="success" />
    <Button label="WARNING" variant="outline" theme="warning" active />
    <h3 class="text-xl pt-8">Button group</h3>
    <p>Default group</p>
    <ButtonGroup label="a11y title">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <p class="pt-2">Outline group</p>
    <ButtonGroup label="a11y title" variant="outline">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <p class="pt-2">Elevated button group</p>
    <ButtonGroup label="a11y title" variant="elevated">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    <Button label="Button 3" variant="elevated" />
    <br>
    <br>
    Disabled
    <Button label="Button 3" variant="elevated" disabled />
    <Button label="Button 3" disabled/>
    <Button label="Button 3" variant="outline" disabled />
    <br>
    <br>
    
    <ButtonGroup label="a11y title" stacked>
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
    
    <ButtonGroup label="a11y title" stacked variant="outline">
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
</Container>
