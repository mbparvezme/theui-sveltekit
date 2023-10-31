<script>
        import { page } from '$app/stores'
  import { Tooltip, Container } from "$lib"
</script>

<Container class="flex gap-8">
    <div class=" w-20 h-10 bg-slate-300" data-tooltip="Hello TheUI tooltip.." data-tooltip-position="top"></div>
    <div class=" w-20 h-10 bg-slate-300" data-tooltip="Hello TheUI tooltip.." data-tooltip-position="bottom"></div>
    <div class=" w-20 h-10 bg-slate-300" data-tooltip="Hello TheUI tooltip.." data-tooltip-position="left"></div>
    <div class=" w-20 h-10 bg-slate-300" data-tooltip="Hello TheUI tooltip.." data-tooltip-position="right" data-trigger-by="click"></div>
    <Tooltip class=" "/>
    {$page.url}
</Container>