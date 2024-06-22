<script lang="ts">
    import type { BUTTON_SIZE, BUTTON_VARIANT } from "$lib/types";
    import { createEventDispatcher } from "svelte";
    import { twMerge } from "tailwind-merge";
    import { Button, ButtonGroup } from "$lib";

    export let prevBtn: string = "&larr; Prev";
    export let nextBtn: string = "Next &rarr;";
    export let size: BUTTON_SIZE = "md";
    export let buttonStyle: string = "";
    export let minimalMode: boolean = false;
    export let activeButtonStyle: string = "";
    export let align: 'left' | 'center' | 'right' = "center";
    export let variant: BUTTON_VARIANT = "outline";

    export let data: Array<{url: string, active?: boolean}> = [];
    const dispatch  = createEventDispatcher();
    const previous  = () => dispatch("previous");
    const next      = () => dispatch("next");

    let getNumLinkClass = (active: boolean|undefined = undefined) => active ? twMerge("bg-brand-500 text-on-brand-500", activeButtonStyle) : twMerge("bg-transparent text-default hover:bg-brand-500", buttonStyle);
</script>

{#if minimalMode || data.length > 0}
    <div class="theui-pagination flex" class:justify-center={align=="center"} class:justify-end={align=="right"}>
        <ButtonGroup label="Pagination" {size} round="none" class={twMerge("", $$props?.class)} {variant} outline={true}>
            <Button class={getNumLinkClass()} on:click={previous} label={prevBtn} ariaLabel="Pagination link: previous"/>
            {#if !minimalMode}
                {#each data as link, i}
                <Button href={link.url} class={getNumLinkClass(link?.active)} label={(i+1).toString()} ariaLabel="Pagination page {i+1}"/>
                {/each}
            {/if}
            <Button class={getNumLinkClass()} on:click={next} label={nextBtn} ariaLabel="Pagination link: next"/>
        </ButtonGroup>
    </div>
{/if}