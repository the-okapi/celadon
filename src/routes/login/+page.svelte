<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import { Button, Label } from 'bits-ui';

	let { form } = $props();
</script>

<svelte:head>
	<title>{m.log_in()} | {m.celadon()}</title>
</svelte:head>

<div class="m-auto flex h-[calc(100vh-4rem)] w-screen flex-col items-center justify-center">
	<a href={resolve('/')} class="relative hover:underline">← {m.back()}</a>
	<h1 class="mt-5 mb-15 text-center text-4xl font-black">{m.log_in()}</h1>
	<form method="POST" class="flex w-fit flex-col items-center">
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
		{#if form?.fail}
			<p class="max-w-70 text-center leading-4 text-(--r)">
				{form?.message}
			</p>
		{/if}
		<Button.Root type="submit" class="mt-10 w-fit">{m.submit()}</Button.Root>
	</form>
</div>
