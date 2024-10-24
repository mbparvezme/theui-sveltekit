<script lang="ts">
  import { Container, Checkbox } from "$lib"
</script>

<Container>
  <div>
    <Checkbox name="hello" label="CB small size" size="sm"/>
    <br>
    <Checkbox name="hello" label="CB default size"/>
    <br>
    <Checkbox name="hello" label="CB Large size" size="lg" override/>
    <br>
    <Checkbox name="hello" label="CB XL size" size="xl" override/>
    <br>
    <br>
    <Checkbox name="hello" label="CB disabled" disabled/>
    <br>
    <Checkbox name="hello" label="CB readonly" readonly checked/>
    <br>
    <br>
    <Checkbox name="hello" label="Custom CB" size="lg" override custom>
      <span class=" bg-brand-primary-500 text-brand-primary-50 p-2 rounded-lg">CHK</span>
    </Checkbox>
  </div>
</Container>