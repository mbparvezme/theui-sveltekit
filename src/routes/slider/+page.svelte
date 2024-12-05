<script lang="ts">
  import {Slider, Slide} from "$lib"
</script>


<Slider>
  {#snippet children()}
    <Slide class="text-red-500">
      1
    </Slide>
    <Slide href="/google">
      2
    </Slide>
    <Slide type="img" src="hkjkjk" href="/google">
      3
    </Slide>
  {/snippet}
</Slider>

<br>
<br>