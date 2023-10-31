<script>
  import { Button, Dropdown, Toggle, Chips, Popup, Close } from '$lib'

  let data = [
    {
      url: "https://google.com",
      text: "Google",
    },
    {
      text: "Google",
      type: 'header'
    },
    {
      url: "https://google.com",
      text: "Google",
    },
    {
      type: 'divider'
    },
    {
      active: true,
      url: "https://google.com",
      text: "Facebook",
    },
    {
      url: "https://google.com",
      text: "Google",
    },
  ]


  let clickFn = () => {
    alert("Hello")
  }
</script>

<div class="pt-8 px-8 min-h-screen bg-brand">
  <p class="mb-16">
    Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing.
  </p>
  <!-- <Dropdown items={data} animation='fade' closeOnEsc={false} }} >
    <Button slot="label" label="Dropdown Fade" ariaLabel="" />
  </Dropdown> -->
</div>
<br>
<br>
<Toggle label="Chips Proin magna. Maecenas vestibulum mollis diam. Proin magna. Maecenas vestibulum mollis diamProin magna. Maecenas vestibulum mollis diamProin magna. Maecenas vestibulum mollis diamProin magna. Maecenas vestibulum mollis diamProin magna. Maecenas vestibulum mollis diamProin magna. Maecenas vestibulum mollis diam"/>
<br>
<br>
<Chips/>
<br>
<Chips imgUrl="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"/>
<br>
<Chips round={false} imgUrl="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg" />
<br>
<Chips round={false} imgUrl="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg" size='lg' />
<br>

<br>
<br>

<Close on:click={()=>clickFn()} />

<br>
<br>

<p class="pt-24 px-8 min-h-screen">
  Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing.
</p>

<!-- <Popup /> -->