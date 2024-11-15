<script lang="ts">
  import { Accordion, AccordionItem } from "$lib";
</script>


  <AccordionItem title="Title by props" content="This is props content!"/>
  <br>
  <AccordionItem>
    {#snippet title()} This is snippet title {/snippet}
    {#snippet content()} This is snippet content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem flush>
    {#snippet title()} Flush accordion title {/snippet}
    {#snippet content()} Flush accordion content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem>
    {#snippet title()} Open by default title {/snippet}
    {#snippet content()} Opened accordion content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem animationSpeed="slow">
    {#snippet title()} Animation speed title {/snippet}
    {#snippet content()} Animation speed content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem size="compact">
    {#snippet title()} Compact accordion title {/snippet}
    {#snippet content()} Compact accordion content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem size="large">
    {#snippet title()} Large accordion title {/snippet}
    {#snippet content()} Large accordion content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem rounded="xl">
    {#snippet title()} Rounded accordion title {/snippet}
    {#snippet content()} rounded accordion content {/snippet}
  </AccordionItem>
  <br>
  <AccordionItem open containerClass="border-2 border-red-500" containerActiveClass="border-2 border-green-500" titleClass="bg-green-900 text-green-100" titleActiveClass="bg-green-100 text-green-900" contentClass="bg-blue-500" contentActiveClass="bg-blue-100">
    {#snippet title()} Custom accordion title {/snippet}
    {#snippet content()} Custom accordion content {/snippet}
  </AccordionItem>
  <br>
  <Accordion standalone={true}>
    <AccordionItem title="This is props title" content="This is props content!" />
    <AccordionItem>
      {#snippet title()} This is snippet title {/snippet}
      {#snippet content()} This is snippet content {/snippet}
    </AccordionItem>
  </Accordion>
  <br>
  <br>
  <br>
  <br>
  <br>
