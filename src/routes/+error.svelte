<script lang="ts">
	import { Button } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{m.title_somethingHappened()} | {m.name_celadon()}</title>
</svelte:head>

<div class="fixed top-0 left-0 flex h-screen w-screen items-center justify-center select-none">
	<p class="text-[40rem] font-black text-(--a)">{page.status}</p>
</div>

<div class="absolute top-[50%] left-[50%] w-fit translate-[-50%] text-center">
	<p class="mb-20 max-w-300 text-2xl">
		{m.message_somethingHappenedTryAgain()}
	</p>
	<Button.Root href={resolve('/')} class="big-button">{m.button_home()}</Button.Root>
</div>
