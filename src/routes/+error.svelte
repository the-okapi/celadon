<script lang="ts">
	import { Button } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{m.something_happened_short()} | {m.celadon()}</title>
</svelte:head>

<div
	class="border-o absolute top-[50%] left-[50%] w-fit translate-[-50%] rounded-3xl bg-background p-7 text-center"
>
	<p class="mb-5 w-80">
		{m.something_happened()}
		<strong>{m.error()} {page.status}</strong>
	</p>
	<Button.Root href={resolve('/')} class="h-fit py-2.5!">{m.home()}</Button.Root>
</div>
