<script>
  import { Button, Dropdown } from '$lib'

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
</script>

<div class="pt-8 px-8 min-h-screen bg-brand">
  <p class="mb-16">
    Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing.
  </p>
  <Dropdown items={data} config={{ animation: 'fade', closeOnEsc: false }} >
    <Button slot="label" label="Dropdown Fade" />
  </Dropdown>
</div>


<p class="pt-24 px-8 min-h-screen">
  Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing. Proin magna. Maecenas vestibulum mollis diam. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing.
</p>