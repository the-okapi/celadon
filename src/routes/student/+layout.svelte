<script lang="ts">
	import { page } from '$app/state';
	import { m } from '#lib/paraglide/messages.js';

	let { children } = $props();
</script>

<svelte:head>
	<title>{page.data.title} | {m.celadon()}</title>
</svelte:head>

{@render children()}
