<script>
  import { Tooltip, Container } from "$lib"
</script>

<Container class="flex gap-8">
    <div class="w-20 h-10 bg-slate-300" data-tooltip="1 Hello TheUI <b>tooltip</b>.." data-tooltip-position="top">Tooltip</div>
    <div class="w-20 h-10 bg-slate-300" data-tooltip="2 Hello TheUI tooltip.." data-tooltip-position="bottom">Tooltip</div>
    <div class="w-20 h-10 bg-slate-300" data-tooltip="3 Hello TheUI tooltip.." data-tooltip-position="left">Tooltip</div>
    <div class="w-20 h-10 bg-slate-300" data-tooltip="4 Hello TheUI tooltip.." data-tooltip-position="bottom" data-tooltip-event="click">Tooltip</div>
    <Tooltip />
</Container>