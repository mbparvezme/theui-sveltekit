
<script lang="ts">
  import { roundedClass, inputContainerClass, inputClasses, animationClass, shadowClass } from "$lib/functions";
</script>

<div class="p-8">
  <button class="p-4 bg-alt text-alt {roundedClass("xl", "topEnd")}">Hello</button><br><br>

  <input type="text" class={inputClasses({variant: "filled", animate: "normal"}, {})}><br><br>
  <button class="p-4 bg-red-600 {roundedClass("full")}">Hello</button><br><br>
  <div class="p-4 {roundedClass("md", "all", "last")}">
    <button class="p-4 bg-red-600 {roundedClass("lg", "end")}">Hello</button>
    <button class="p-4 bg-red-600">Hello</button>
  </div>
  <br><br>
  <input type="file"  class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 {roundedClass( "xl", "all", "fileButton" )}"/>
</div>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
