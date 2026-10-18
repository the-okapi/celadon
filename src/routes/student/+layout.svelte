<script lang="ts">
	import { getNavBarContext } from '#lib/context.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { m } from '#lib/paraglide/messages.js';

	let { children } = $props();

	const { setContent } = getNavBarContext();

	setContent(navBarContent);
</script>

{#snippet navBarContent()}
	<a href={resolve('/student')} class="nav-bar-link">{m.home()}</a>
	<div class="w-2"></div>
{/snippet}

<svelte:head>
	<title>{page.data.title} | {m.repaper()}</title>
</svelte:head>

{@render children()}
