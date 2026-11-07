<script lang="ts">
	import { PUBLIC_HELP_URL } from '$app/env/public';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { Button, Label } from 'bits-ui';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import favicon from '#lib/assets/favicon.png';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import Loader from '#lib/components/Loader.svelte';
	import { enhance } from '$app/forms';

	onMount(() => {
		goto(resolve('/'));
	});

	let logInOpen = $state(false);
	let signUpOpen = $state(false);

	let { form } = $props();
</script>

<svelte:head>
	<title>{m.celadon()}</title>
</svelte:head>

<div class="h-20"></div>

<div class="m-auto w-fit rounded-[6rem] bg-(--a) p-10">
	<img src={favicon} class="m-auto w-60" alt={m.celadon()} />
</div>

<h1 class="relative text-center text-8xl leading-32 font-black text-(--p)">
	{m.celadon()}
</h1>
<h2 class="relative text-center text-3xl">{m.slogan()}</h2>

<div class="m-auto mt-10 flex h-10 w-fit items-center justify-center gap-3">
	<Button.Root class="big-button" rel="external" href={PUBLIC_HELP_URL}>{m.help()}</Button.Root>
	<Button.Root class="big-button" href={resolve('/login')}>{m.log_in()}</Button.Root>
	<Button.Root class="big-button" href={resolve('/signup')}>{m.sign_up()}</Button.Root>
</div>

<div class="h-20"></div>

<div class="flex justify-center gap-7 text-2xl">
	<div class="border-o h-80 w-110 rounded-3xl bg-(--bg) p-7 pt-10">
		<h2 class="text-center text-4xl font-bold">{m.word_processing()}</h2>
		<br />
		<ul class="list-inside list-disc">
			<li>{m.no_copy_paste_ai()}</li>
			<li>{m.consistent_font_spacing()}</li>
			<li>{m.images_and_links()}</li>
			<li>{m.no_autocorrect_spellchecking()}</li>
			<li>{m.support_accents()}</li>
		</ul>
	</div>

	<div class="border-o h-80 w-110 rounded-3xl bg-(--bg) p-7 pt-10">
		<h2 class="text-center text-4xl font-bold">{m.no_more()}</h2>
		<br />
		<ul class="list-inside list-disc">
			<li>{m.losing_homework()}</li>
			<li>{m.wrong_fonts()}</li>
			<li>{m.illegible_handwriting()}</li>
			<li>{m.forgetting_due_date()}</li>
			<li>{m.wrong_permissions()}</li>
		</ul>
	</div>

	<div class="border-o relative h-80 w-110 rounded-3xl bg-(--bg) p-7 pt-8">
		<h2 class="text-center text-4xl font-bold">{m.assignments()}</h2>
		<br />
		<ul class="list-inside list-disc {getLocale() === 'fr' ? '*:my-1.5 *:leading-6' : ''}">
			<li>{m.classes_organize_students()}</li>
			<li>{m.due_dates_assignments()}</li>
			<li class="my-1.5 leading-6">{m.one_document_student_assignment()}</li>
			<li>{m.grade_book()}*</li>
		</ul>
		<p class="absolute bottom-0.5 left-0 w-110 text-center text-sm">
			*{m.feature_wip()}
		</p>
	</div>
</div>

<div class="h-15"></div>

<AlertDialog bind:open={logInOpen} onclose={() => (form = null)}>
	{let loading = $state(false)}
	<div class="flex h-60 w-90 items-center justify-center">
		{#if loading}
			<Loader />
		{:else}
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					loading = true;
					return ({ update, result }) => {
						update();
						if (result.status !== 303) {
							loading = false;
						}
					};
				}}
			>
				<h2 class="text-center text-3xl font-black">{m.log_in()}</h2>
				<div class="mb-5">
					<Label.Root for="email" class={loading ? 'opacity-50' : ''}
						>{m.email()}:</Label.Root
					><br />
					<input
						id="email"
						class="w-80"
						value={form?.email}
						type="email"
						name="email"
						required
					/>
				</div>
				<div class="mb-0.5 w-60">
					<Label.Root for="password" class={loading ? 'opacity-50' : ''}
						>{m.password()}:</Label.Root
					>
					<input
						id="password"
						value={form?.password}
						class="w-80"
						type="password"
						name="password"
						required
					/>
				</div>
				<div class="absolute w-80 text-center">
					<p class="text-xs text-(--r)">
						{form?.logInMessage}
					</p>
				</div>
				<div class="m-auto mt-7 flex w-fit gap-6">
					<Button.Root
						class="gray-button"
						type="button"
						onclick={() => {
							logInOpen = false;
							form = null;
						}}>{m.cancel()}</Button.Root
					>
					<Button.Root type="submit">{m.submit()}</Button.Root>
				</div>
			</form>
		{/if}
	</div>
</AlertDialog>

<AlertDialog bind:open={signUpOpen}>
	<p>Hello</p>
</AlertDialog>
