<script lang="ts">
	import "../app.css";
	import "$lib/style.css";
	let { children } = $props()

	import { navigating, page, updated } from "$app/state";
</script>

{@render children()}

{JSON.stringify(page)}
