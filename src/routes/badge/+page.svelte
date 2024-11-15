<script lang="ts">
	import {Badge} from "$lib"
</script>

<h3 class="text-2xl mb-4 relative">This is title <Badge/></h3>
<p class="text-2xl bg-gray-400 mb-4">Products <Badge title="Hello badge"/></p>
<p class="text-2xl bg-gray-200 relative inline-block">Products <Badge class="border-white" title="Hello badge" text="News" topFixed={true}/></p>
