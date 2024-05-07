<script lang="ts">
  import {Progress} from "$lib"
  import {Button} from "$lib"
  let end = 40
  $: update = ()=> {
    end += 5
    console.log(end)
  }
</script>

<Progress start={10} end={50} thickness="xl"/>
<br>
<Progress start={20} end={90} thickness="xl" label="90%"/>
<br>
<div class="h-[300px] pl-8 flex gap-8">
  <Progress start={10} end={50} thickness="xl" vertical={true} />
  <Progress start={5} end={end} thickness="xl" vertical={true} label='{end}%' />
</div>

<Button label="update" on:click={()=>update()} />