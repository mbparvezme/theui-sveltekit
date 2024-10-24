<script lang="ts">
  import {Drawer} from "$lib"
  import {Container, Button} from "$lib"
</script>

<Container>
  <Drawer>
    <Button slot="offcanvasButton" label="Click"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <br>
  <br>
  <Offcanvas>
    <Button slot="offcanvasButton" label="Left (Default)"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <Offcanvas position="end">
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
  <Offcanvas backdrop={false}>
    <Button slot="offcanvasButton" label="No backdrop"/>
    <div slot="offcanvasContent" class="p-8">
      Offcanvas content
    </div>
  </Offcanvas>
  <br>
  <br>
  <Offcanvas staticBackdrop={true}>
    <Button slot="offcanvasButton" label="Static backdrop"/>
    <div slot="offcanvasContent" class="p-8">
      Static backdrop
    </div>
  </Drawer>
</Container>