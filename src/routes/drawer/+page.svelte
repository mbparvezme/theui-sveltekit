<script lang="ts">
  import {Drawer} from "$lib"
  import {Container, Button} from "$lib"
</script>

<Container>
  <p>Default</p>
  <Drawer>
    <Button slot="drawerButton" label="Click"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
  <p class="pt-8">Position</p>
  <Drawer>
    <Button slot="drawerButton" label="Left (Default)"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
  <Drawer position="right">
    <Button slot="drawerButton" label="Right"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
  <Drawer position="top">
    <Button slot="drawerButton" label="Top"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
  <Drawer position="bottom">
    <Button slot="drawerButton" label="Bottom"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
  <p class="pt-8">No backdrop</p>
  <Drawer backdrop={false}>
    <Button slot="drawerButton" label="No backdrop"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
  <p class="pt-8">Static backdrop</p>
  <Drawer staticBackdrop={true}>
    <Button slot="drawerButton" label="Static backdrop"/>
    <div slot="drawerContent" class="p-8">
      Drawer content
    </div>
  </Drawer>
</Container>
