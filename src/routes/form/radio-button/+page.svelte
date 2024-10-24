<script lang="ts">
  import { Container, Radio } from "$lib"
</script>

<Container>
  <div>
    <Radio name="hello" label="Radio small size" size="sm"/>
    <br>
    <Radio name="hello" label="Radio default size"/>
    <br>
    <Radio name="hello" label="Radio Large size" size="lg" override/>
    <br>
    <Radio name="hello" label="Radio XL size" size="xl" override/>
    <br>
    <br>
    <Radio name="hello" label="Radio disabled" disabled/>
    <br>
    <Radio name="hello" label="Radio readonly" readonly checked/>
    <br>
    <br>
    <Radio name="hello" label="Custom Radio" size="lg" override custom>
      <span class=" bg-brand-primary-500 text-brand-primary-50 p-2 rounded-lg">CHK</span>
    </Radio>
  </div>
</Container>