<script lang="ts">
  import {Slider, Slide} from "$lib"
</script>


<Slider>
  {#snippet children()}
    <Slide class="text-red-500">
      111 111111 1111
    </Slide>
    <Slide href="/google">
      222 222222 222 22 2 22 2222
    </Slide>
    <Slide href="/google">
      3
    </Slide>
  {/snippet}
</Slider>

<br>
<br>