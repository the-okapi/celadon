<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import { Button, Label } from 'bits-ui';
	import { enhance } from '$app/forms';

	let { form } = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>{m.sign_up()} | {m.celadon()}</title>
</svelte:head>

<form
	method="POST"
	use:enhance={() => {
		loading = true;

		return ({ update, result }) => {
			if (result.status !== 303) {
				loading = false;
			}
			update();
		};
	}}
	class="m-auto w-fit"
>
	<div class="flex flex-col items-center pt-10">
		<a href={resolve('/')} class="relative hover:underline">{m.back_button()}</a>
		<h1 class="mt-5 mb-15 text-center text-4xl font-black">{m.sign_up()}</h1>
	</div>
	<div>
		<div class="text-left">
			<Label.Root for="name">{m.name()}:</Label.Root><br />
			<input type="text" id="name" value={form?.name} name="name" class="w-80" required />
		</div>
		<div class="text-left">
			<Label.Root for="email">{m.email()}:</Label.Root><br />
			<input type="email" id="email" value={form?.email} name="email" class="w-80" required />
		</div>
		<div class="text-left">
			<Label.Root for="password">{m.password()}:</Label.Root><br />
			<input
				type="password"
				id="password"
				value={form?.password}
				name="password"
				class="w-80"
				required
			/>
		</div>
		<div class="text-left">
			<Label.Root for="confirmPassword">{m.confirm()} {m.password()}:</Label.Root><br />
			<input
				type="password"
				name="confirmPassword"
				id="password"
				value={form?.confirmPassword}
				class="w-80"
				required
			/>
		</div>
		{#if form?.fail}
			<p class="mt-3 max-w-80 text-center leading-4 text-(--r)">
				{form?.message}
			</p>
		{/if}
	</div>
	<Button.Root disabled={loading} type="submit" class="m-auto mt-10 block"
		>{m.submit()}</Button.Root
	>
</form>
