<script lang="ts">
	import type { SELECT_DATA } from "$lib/types"
  import { Select } from "$lib"

  let selectArray: SELECT_DATA[] = [
    "select 1",
    "select 2",
    "select 3",
    "select 4",
  ]

  let selectObj: SELECT_DATA[] = [
    { text: "Option 1", value: 1 },
    { text: "Option 2", value: 2 },
    { text: "Option 3", value: 3 },
    { text: "Option 4", value: 4 },
    { text: "Option 5", value: 5 },
    { text: "Option 6", value: 6 },
    { text: "Option 7", value: 7 },
    { text: "Option 8", value: 8 },
    { text: "Option 9", value: 9 },
    { text: "Option 10", value: 10 },
  ];
</script>

<Select label="Select Array" name="select_array" options={selectArray} placeholder="-- Select --" />
<br>
<br>
<Select label="Select Obj" name="select_obj" options={selectObj} placeholder="-- Select --" floatingLabel value={5} />
<br>

<br>
<Select label="Select Obj variant FLAT" variant="flat" name="select_obj" options={selectObj} placeholder="-- Select --" floatingLabel value={5} />
<br>
<br>
<Select label="Select Obj variant FLAT" name="select_obj" options={selectObj} placeholder="-- Select --" floatingLabel value={5} />
<br>