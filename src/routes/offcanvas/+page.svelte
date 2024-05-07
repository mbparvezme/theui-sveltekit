<script lang="ts">
  import {Offcanvas} from "$lib"
  import {Container, Button} from "$lib"
</script>

<Container>
  <p>Default</p>
  <Offcanvas>
    <Button slot="offcanvasButton" label="Click"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <p class="pt-8">Position</p>
  <Offcanvas>
    <Button slot="offcanvasButton" label="Left (Default)"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <Offcanvas position="right">
    <Button slot="offcanvasButton" label="Right"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <Offcanvas position="top">
    <Button slot="offcanvasButton" label="Top"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <Offcanvas position="bottom">
    <Button slot="offcanvasButton" label="Bottom"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <p class="pt-8">No backdrop</p>
  <Offcanvas backdrop={false}>
    <Button slot="offcanvasButton" label="No backdrop"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <p class="pt-8">Static backdrop</p>
  <Offcanvas staticBackdrop={true}>
    <Button slot="offcanvasButton" label="No backdrop"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
</Container>