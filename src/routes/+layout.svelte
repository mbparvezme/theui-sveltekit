<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<div class="p-8">
	{@render children()}
</div>
