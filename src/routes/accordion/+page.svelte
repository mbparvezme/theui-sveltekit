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
    A
    <AccordionItem>
        <span slot="title">This is a accordion title test</span>
        <p>Kickstart your development with the Sveltekit Components library, a tool of the Sveltekit ecosystem by TheUI. It includes the power of Sveltekit and TailwindCSS to speed up your development. So, build fast, deliver faster.</p>
    </AccordionItem>
    <div class="my-16"></div>

    {#each data as d}
        <AccordionItem title={d.title} content={d.content} />
    {/each}

    <div class="my-16"></div>

    GROUP
    <Accordion>
        {#each data as d}
            <AccordionItem title={d.title} content={d.content} />
        {/each}
    </Accordion>
    <div class="my-16"></div>

    {#each data as d}
        <AccordionItem title={d.title} content={d.content} isFlush={true} />
    {/each}
    <div class="my-16"></div>
    GROUP
    <Accordion>
        {#each data as d}
            <AccordionItem title={d.title} content={d.content} isFlush={true} />
        {/each}
    </Accordion>
</Container>