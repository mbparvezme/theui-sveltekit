<script lang="ts">
  import {Modal, Button} from "$lib"
  
  // Custom open/close
  let modalStatus: boolean
  $: modalStatus = false
  let testModal = () => {
    modalStatus = false
  }

  // setTimeout(() => {
  //   modalStatus = true
  // }, 2000)
</script>

<h3>Default modal</h3>
<Modal>
  <Button label="Modal" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h3>Without close button</h3>
<Modal closeBtn={false}>
  <Button label="No close button" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h3>Without close button</h3>
<Modal staticBackdrop={false}>
  <Button label="Static Backdrop" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h3>Modal Size</h3>
<Modal size="full">
  <Button label="Full modal" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal size="lg">
  <Button label="Lg modal" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal size="md">
  <Button label="Md modal" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal size="sm">
  <Button label="Sm modal" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h3>Without Backdrop</h3>
<Modal backdrop={false} modalBodyClass="bg-gray-200">
  <Button label="No Backdrop" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h3>Modal position</h3>
<Modal position="center">
  <Button label="Center (Default)" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal position="top">
  <Button label="Top" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal position="bottom">
  <Button label="Bottom" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h1>Animations</h1>
<Modal animation="fade">
  <Button label="Fade (Default)" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal animation="slide-down">
  <Button label="Slide down" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal animation="slide-up">
  <Button label="Slide up" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal animation="zoom-in">
  <Button label="Zoom in" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>
<Modal animation="zoom-out">
  <Button label="Zoom out" slot="modalBtn"></Button>
  <div slot="body"></div>
</Modal>

<h3>Close modal from outside</h3>
<Modal bind:modalStatus>
  <Button label="toggle" slot="modalBtn"></Button>
  <div slot="body">
    
  </div>
</Modal>