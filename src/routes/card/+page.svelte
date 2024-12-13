<script lang="ts">
  import { Card } from "$lib"
</script>


<div class="flex gap-8">
  
  <Card class="w-80"
    title="Title"
    shadow="xl"
    topImage={{src:"https://placehold.co/800x400/6A00F5/white", alt:"hello", class: ""}}
    bottomImage={{src:"https://placehold.co/800x400/6A00F5/white", alt:"hello", class: ""}}
  >
    Some quick example text to build on the card title and make up the bulk of the card's content.
  </Card>
  
  <div>
    <Card class="w-96"
      horizontal={true}
      title="Title"
      topImage={{src:"https://placehold.co/400x800/6A00F5/white", alt:"hello", class: ""}}
      bottomImage={{src:"https://placehold.co/400x900/6A00F5/white", alt:"hello", class: ""}}
    >
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </Card>
  </div>
  

</div>