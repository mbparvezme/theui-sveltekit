<script lang="ts">
  import Accordion from "$lib/Accordion/Accordion.svelte";
  import AccordionItem from "$lib/Accordion/AccordionItem.svelte"
  import {stores} from "$lib/state.svelte"
</script>


<div class="p-8">
  <AccordionItem title="This is props title" content="This is props content!"  flush />
  <br>
  <AccordionItem open={true} flush>
    {#snippet title()} This is snippet title {/snippet}
    {#snippet content()} This is snippet content {/snippet}
  </AccordionItem>

  
  <br><br>
  {stores.activeAccordion}
  <br><br>
  
  <Accordion>
    <AccordionItem title="This is props title" content="This is props content!" />
    <AccordionItem>
      {#snippet title()} This is snippet title {/snippet}
      {#snippet content()} This is snippet content {/snippet}
    </AccordionItem>
  </Accordion>

</div>


