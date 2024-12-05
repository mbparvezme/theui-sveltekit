<script lang="ts">
	import { generateToken } from "$lib/function.core"
	import { getContext } from "svelte"

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any
  CTX.slides.push(id)
</script>

<div class="item flex-shrink-0 w-full h-64 bg-blue-500 flex items-center justify-center text-white">
  {id}
</div>