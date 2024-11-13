<script lang="ts">
	import '../app.css';
	import DarkMode from "$lib/Utility/DarkMode.svelte"
	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(()=>{
		document.getElementById('toggleDirection')?.addEventListener('click', () => {
			document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
		});
	})
</script>

<nav class="flex gap-4 px-8 mb-8 font-semibold bg-gray-200 uppercase">
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/">Home</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/accordion">Accordion</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/alert">Alert</a>
	<a class="px-6 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/badge">Badge</a>
	<a class="px-3 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/breadcrumb">Breadcrumb</a>
	<a class="px-3 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/chips">Chips</a>
	<a class="px-3 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/collapse">Collapse</a>
	<a class="px-3 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/drawer">Drawer</a>
	<a class="px-3 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/modal">Modal</a>
	<DarkMode />
	<button class="px-3 py-6 active:bg-brand-primary-500 active:text-on-brand-primary-500" id="toggleDirection">RTL/LTR</button>
</nav>

<div class="p-8">
	{@render children()}
</div>
