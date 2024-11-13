<script lang="ts">
	import '../app.css';
	import DarkMode from "$lib/Utility/DarkMode.svelte"
	let { children } = $props();
</script>

<nav class="flex px-8 mb-8 font-semibold bg-gray-200 uppercase">
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/">Home</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/accordion">Accordion</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/alert">Alert</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/badge">Badge</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/breadcrumb">Breadcrumb</a>
	<DarkMode />
</nav>

<div class="p-8">
	{@render children()}
</div>
