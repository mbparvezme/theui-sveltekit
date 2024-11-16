<script lang="ts">
  import {Progress} from "$lib"
  let start = $state(0)
  let end = $state(40)
</script>

<Progress {start} {end} thickness="xl"/><br>
<Progress {start} {end} thickness="xl" label="90%"/>
<br><br>
<Progress {start} {end} thickness="px" label="90%"/><br>
<Progress {start} {end} thickness="sm"/><br>
<Progress {start} {end} thickness="md" /><br>
<Progress {start} {end} thickness="lg" /><br>
<Progress {start} {end} thickness="xl" /><br>
<br>
<Progress {start} {end} thickness="xl" label="90%"/>
<br><br>
<input type="range" bind:value={start} />
<input type="range" bind:value={end} />
