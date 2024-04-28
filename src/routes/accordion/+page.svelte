<script lang="ts">
    import {Container, Accordion, AccordionItem} from "$lib"

    let data = [
        {
            title: "This is a accordion title 1",
            content : "Kickstart your development with the Sveltekit Components library, a tool of the Sveltekit ecosystem by TheUI. It includes the power of Sveltekit and TailwindCSS to speed up your development. So, build fast, deliver faster."
        },
        {
            title: "This is a accordion title 2",
            content : "Kickstart your development with the Sveltekit Components library, a tool of the Sveltekit ecosystem by TheUI. It includes the power of Sveltekit and TailwindCSS to speed up your development. So, build fast, deliver faster."
        },
        {
            title: "This is a accordion title 2",
            content : "Kickstart your development with the Sveltekit Components library, a tool of the Sveltekit ecosystem by TheUI. It includes the power of Sveltekit and TailwindCSS to speed up your development. So, build fast, deliver faster."
        },
    ]
</script>

<Container>
    Simple Accordion
    <AccordionItem>
        <span slot="title">This is a accordion title test</span>
        <p>Kickstart your development with the Sveltekit Components library, a tool of the Sveltekit ecosystem by TheUI. It includes the power of Sveltekit and TailwindCSS to speed up your development. So, build fast, deliver faster.</p>
    </AccordionItem>
    <div class="my-16"></div>

    Accordion by DATA loop
    {#each data as d}
        <AccordionItem title={d.title} content={d.content} />
    {/each}

    <div class="my-16"></div>

    GROUP ACCORDION
    <Accordion>
        {#each data as d}
            <AccordionItem title={d.title} content={d.content} />
        {/each}
    </Accordion>
    <div class="my-16"></div>

    Flush Accordion
    {#each data as d}
        <AccordionItem title={d.title} content={d.content} isFlush={true} />
    {/each}
    <div class="my-16"></div>

    Size: Compact
    <Accordion size="compact">
        {#each data as d}
            <AccordionItem title={d.title} content={d.content} />
        {/each}
    </Accordion>

    Size: Default
    <Accordion size="default">
        {#each data as d}
            <AccordionItem title={d.title} content={d.content} />
        {/each}
    </Accordion>

    Size: Large
    <Accordion size="large">
        {#each data as d}
            <AccordionItem title={d.title} content={d.content} />
        {/each}
    </Accordion>
</Container>