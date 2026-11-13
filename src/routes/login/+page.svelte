<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import { Button, Label } from 'bits-ui';
	import { enhance } from '$app/forms';
	import nprogress from 'nprogress';

	let { form } = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>{m.log_in()} | {m.celadon()}</title>
</svelte:head>

<div class="absolute top-10 left-0 w-screen text-center">
	<a href={resolve('/')} class="underline-link">{m.back_button()}</a>
</div>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		nprogress.start();

		return ({ update, result }) => {
			if (result.status !== 303) {
				nprogress.done();
				loading = false;
			}
			update();
		};
	}}
>
	<h1 class="mb-15 text-center text-4xl font-bold">{m.log_in()}</h1>
	<div class="text-left">
		<Label.Root for="email">{m.email()}:</Label.Root><br />
		<input type="email" id="email" value={form?.email} name="email" class="w-80" required />
	</div>
	<div class="text-left">
		<Label.Root for="password">{m.password()}:</Label.Root><br />
		<input
			type="password"
			name="password"
			id="password"
			value={form?.password}
			class="w-80"
			required
		/>
	</div>
	{#if form?.fail}
		<p class="mt-3 max-w-80 text-center leading-4 text-(--r)">
			{form?.message}
		</p>
	{/if}
	<Button.Root disabled={loading} type="submit" class="m-auto mt-10 block"
		>{m.submit()}</Button.Root
	>
</form>
