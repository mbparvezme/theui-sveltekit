<script lang="ts">
	import { generateToken } from "$lib/function.core"
	import { getContext, onMount } from "svelte"

  let id: string = generateToken()
  let CTX = getContext('SLIDER') as any

  let count = CTX.slides.length
  let translate = 0

  onMount(() => {
    translate = -count * (document.getElementById(id)?.clientWidth ?? 0)
  })

  CTX.slides.push(id)
</script>

<div class="item flex-shrink-0 w-full h-64 bg-blue-500 flex items-center justify-center text-white" data-translate={translate}>
  {id}
</div>