<script lang="ts">
	import '../app.css'
	import DarkMode from "$lib/Utility/DarkMode.svelte"
	import { onMount } from 'svelte'
	let { children } = $props()

	onMount(()=>{
		document.getElementById('toggleDirection')?.addEventListener('click', () => {
			document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'
		})
	})
</script>

<nav class="grid grid-cols-12 gap-x-4 px-8 mb-8 font-semibold bg-gray-200 uppercase text-center fixed text-xs">
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/">Home</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/accordion">Accordion</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/alert">Alert</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/badge">Badge</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/breadcrumb">Breadcrumb</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/button">Button</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/chips">Chips</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/collapse">Collapse</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/dropdown">Dropdown</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/drawer">Drawer</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/modal">Modal</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/navbar">Navbar</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/notification">Notification</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/popup">Popup</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/tab">Tab</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/table">Table</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/tooltip">Tooltip</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/pagination">Pagination</a>
	<a class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" href="/progress">Progress</a>
	<DarkMode />
	<button class="p-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" id="toggleDirection">RTL/LTR</button>
</nav>

<div class="px-8 pt-32 pb-48">
	{@render children()}
</div>
