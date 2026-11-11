<script lang="ts">
	import { getNavBarContext } from '#lib/context.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { m } from '#lib/paraglide/messages.js';
	import watermark from '#lib/assets/watermark.png';

	let { children, data } = $props();

	const { setContent } = getNavBarContext();

	setContent(navBarContent);
</script>

{#snippet navBarContent()}
	<a href={resolve('/student')} class="underline-link">{data.name}</a>
	<div class="w-2"></div>
{/snippet}

<svelte:head>
	<title>{page.data.title} | {m.celadon()}</title>
</svelte:head>

{@render children()}

<img class="fixed right-3 bottom-3 z-50! w-10 opacity-50" src={watermark} alt={m.celadon()} />
