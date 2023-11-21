<script lang="ts">
    import type { BUTTON_SIZE } from "$lib/types"
    import { createEventDispatcher } from "svelte"
    import { page } from "$app/stores"
    import { twMerge } from "tailwind-merge"
    import { Button, ButtonGroup } from "$lib"

    export let prevBtn: string = "&larr;"
    export let nextBtn: string = "&rarr;"
    export let size: BUTTON_SIZE = "md"
    export let buttonStyle: string = ""
    export let activeButtonStyle: string = ""
    export let align: 'left' | 'center' | 'right' = "center"

    export let data: Array<{url: string, active?: boolean}> = []

    const dispatch = createEventDispatcher()
    const previous = () => dispatch("previous")
    const next = () => dispatch("next")

    let getNumLinkClass = (url: string) => {
        if($page.url.toString()==url){
            twMerge("bg-brand border-brand-100 text-on-brand", activeButtonStyle)
        }else{
            twMerge("bg-transparent border-l border-r border-gray-100 text-default hover:bg-brand", buttonStyle)
        }
    }
</script>

{#if data.length > 0}
    <div class="theui-pagination flex" class:justify-center={align=="center"} class:justify-end={align=="right"}>
        <ButtonGroup label="Pagination" {size} let:size round={"none"} class={twMerge("border border-gray-100 dark:border-gray-700", $$props?.class)}>
            <Button class={getNumLinkClass("")} on:click={previous} label={prevBtn} config={{size}} ariaLabel="Pagination link: previous"/>
            {#each data as link, i}
            <Button href={link.url} class={getNumLinkClass(link?.url)} label={(i+1).toString()} config={{size}} ariaLabel="Pagination page {i+1}"/>
            {/each}
            <Button class={getNumLinkClass("")} on:click={next} label={nextBtn} config={{size}} ariaLabel="Pagination link: next"/>
        </ButtonGroup>
    </div>
{/if}