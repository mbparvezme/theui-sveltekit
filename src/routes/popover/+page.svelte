<script lang="ts">
  import {Popover} from "$lib"
</script>


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


<div>
  <button id="trigger-1" class="px-4 py-2 bg-blue-500 text-white rounded" data-popover>Trigger 1</button>
  <div data-popover-id="trigger-1" class="popover bg-gray-200 p-2 rounded shadow hidden max-w-64">
    <h4>Header</h4>
    <p>Popover 1 Popover 2 Popover 3 Popover 4  Popover 5 Popover 6</p>
  </div>
  <Popover triggerID="trigger-1" />
  
  <button id="trigger-2" class="px-4 py-2 bg-blue-500 text-white rounded" data-popover>Trigger 2</button>
  <Popover triggerID="trigger-2" position="right">
    Popover 1 Popover 2 Popover 3 Popover 4  Popover 5 Popover 6
  </Popover>
</div>




<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>