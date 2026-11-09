<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import { Button, Label } from 'bits-ui';

	let { form } = $props();
</script>

<svelte:head>
	<title>{m.log_in()} | {m.celadon()}</title>
</svelte:head>

<form method="POST" class="m-auto grid w-fit grid-rows-3">
	<div class="flex flex-col items-center pt-10">
		<a href={resolve('/')} class="relative hover:underline">{m.back_button()}</a>
		<h1 class="mt-5 mb-15 text-center text-4xl font-black">{m.log_in()}</h1>
	</div>
	<div>
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
	</div>
	<div>
		{#if form?.fail}
			<p class="max-w-80 text-center leading-4 text-(--r)">
				{form?.message}
			</p>
		{/if}
		<Button.Root type="submit" class="m-auto mt-10 block">{m.submit()}</Button.Root>
	</div>
</form>
