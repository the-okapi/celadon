<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import Loader from '#lib/components/Loader.svelte';
	import { Button, Label } from 'bits-ui';

	let { form } = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>{m.log_in()} | {m.celadon()}</title>
</svelte:head>

<div class="m-auto flex h-[calc(100vh-5rem)] w-screen flex-col items-center justify-center">
	{#if loading}
		<Loader />
	{:else}
		<a href={resolve('/')} class="mt-10 hover:underline">← {m.back()}</a>
		<div class="border-o m-auto rounded-2xl bg-(--bg) px-15 py-10">
			<form method="POST" class="flex w-fit flex-col items-center">
				<h1 class="mb-4 text-center text-3xl font-black">{m.log_in()}</h1>
				<div class="text-left">
					<Label.Root for="email">{m.email()}:</Label.Root><br />
					<input
						type="email"
						id="email"
						value={form?.email}
						name="email"
						class="w-70"
						required
					/>
				</div>
				<div class="text-left">
					<Label.Root for="password">{m.password()}:</Label.Root><br />
					<input
						type="password"
						name="password"
						id="password"
						value={form?.password}
						class="w-70"
						required
					/>
				</div>
				{#if form?.fail}
					<p class="max-w-70 text-center leading-4 text-(--r)">
						{form?.message}
					</p>
				{/if}
				<Button.Root type="submit" class="mt-3 w-fit">{m.submit()}</Button.Root>
			</form>
		</div>
	{/if}
</div>
