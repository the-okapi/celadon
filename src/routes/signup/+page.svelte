<script lang="ts">
	import { Button, Label } from 'bits-ui';
	import type { PageProps } from './$types';
	import { m } from '#lib/paraglide/messages.js';
	import { resolve } from '$app/paths';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>{m.sign_up()} | {m.celadon()}</title>
</svelte:head>

<div class="m-auto flex h-[calc(100vh-5rem)] w-screen flex-col items-center justify-center">
	<a href={resolve('/')} class="mt-10 hover:underline">← {m.back()}</a>
	<h1 class="mt-5 mb-15 text-center text-3xl font-black">{m.sign_up()}</h1>
	<form method="POST" class="flex w-fit flex-col items-center">
		<div class="text-left">
			<Label.Root for="name">{m.name()}:</Label.Root><br />
			<input type="text" id="name" value={form?.name} name="name" class="w-70" required />
		</div>
		<div class="text-left">
			<Label.Root for="email">{m.email()}:</Label.Root><br />
			<input type="email" id="email" value={form?.email} name="email" class="w-70" required />
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
		<div class="mb-3 text-left">
			<Label.Root for="confirmPassword">{m.confirm()} {m.password()}:</Label.Root><br />
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				value={form?.confirmPassword}
				class="w-70"
				required
			/>
		</div>
		{#if form?.fail}
			<p class="max-w-70 text-center leading-4 text-(--r)">
				{form?.message}
			</p>
		{/if}
		<Button.Root type="submit" class="mt-10 w-fit">{m.submit()}</Button.Root>
	</form>
</div>
