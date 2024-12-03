<script lang="ts">
	import { generateToken } from "$lib/function.core"
	import { getContext } from "svelte"

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any

  // $effect(() => console.log(CTX))

  CTX.slides.push(id)
</script>

<div {id} class="item flex-shrink-0 w-full h-64 bg-blue-500 flex items-center justify-center text-white">
  {id}
</div>