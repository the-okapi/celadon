<script lang="ts">
	import 'nprogress/nprogress.css';
	import '#lib/css/main.css';
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '#lib/assets/favicon.png';
	import type { LayoutProps } from './$types';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import { Button } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { PUBLIC_ENGLISH_HELP_URL, PUBLIC_FRENCH_HELP_URL } from '$app/env/public';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { feedback } from './remote';
	import { showToast } from '#lib/toast.js';
	import Loader from '#lib/components/Loader.svelte';
	import nprogress from 'nprogress';
	import watermark from '#lib/assets/watermark.avif';

	let { data, children }: LayoutProps = $props();

	let signOutOpen = $state(false);

	let feedbackOpen = $state(false);

	onMount(() => {
		nprogress.configure({
			showSpinner: false,
			template: '<div class="bar" role="bar"></div>'
		});
	});

	beforeNavigate(() => {
		if (data.loggedIn) {
			nprogress.start();
		}
	});

	afterNavigate(() => {
		nprogress.done();
	});

	let feedbackContent = $state('');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher
	darkClassNames={['dark']}
	lightClassNames={['light']}
	defaultMode="system"
	modeStorageKey="celadon-mode" />

<Toaster />

{#if data.loggedIn}
	<nav
		class="fixed top-0 left-0 flex h-screen w-48 flex-col items-start border-r border-outline bg-background p-6">
		<a class="underline-link mb-3" href={resolve('/home')}>
			<h2 class="text-2xl font-bold">{m.name_celadon()}</h2>
		</a>

		<button class="underline-link" onclick={() => (signOutOpen = true)}>{m.sign_out()}</button>

		<a class="underline-link" href={resolve('/options')}>{m.options()}</a>

		<button class="underline-link" onclick={() => (feedbackOpen = true)}>{m.feedback()}</button>

		<a
			class="underline-link"
			rel="external"
			target="_blank"
			href={getLocale() === 'en' ? PUBLIC_ENGLISH_HELP_URL : PUBLIC_FRENCH_HELP_URL}>
			{m.help()}
		</a>
	</nav>
	<main class="ml-48 flex min-h-screen w-[calc(100vw-12rem)] items-center justify-center">
		<div class="h-fit w-fit">
			{@render children()}
		</div>
	</main>

	<img
		class="fixed right-3 bottom-3 z-50! w-10 opacity-50"
		src={watermark}
		alt={m.name_celadon()} />
{:else}
	<main class="flex min-h-screen w-screen items-center justify-center">
		<div class="h-fit w-fit">
			{@render children()}
		</div>
	</main>
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>

<AlertDialog bind:open={feedbackOpen}>
	{let loading = $state(false)}
	<div class="flex h-50 w-100 flex-col items-center justify-center">
		{#if loading}
			<Loader />
		{:else}
			<h2 class="mb-2 text-center text-3xl font-bold">{m.feedback()}</h2>
			<form
				{...feedback.enhance(async (form) => {
					loading = true;
					await form.submit();
					if (form.result?.success) {
						showToast(m.thank_feedback(), 'success');
						feedbackOpen = false;
						feedbackContent = '';
					} else {
						showToast(m.error_somethingHappened(), 'error');
					}
					loading = false;
				})}>
				<textarea
					{...feedback.fields.content.as('text')}
					bind:value={feedbackContent}
					class="h-30 w-100"
					required
					placeholder={m.something_improve()}
					disabled={loading}></textarea
				><br />
				<div class="flex justify-center gap-3">
					<Button.Root
						type="button"
						class="gray-button"
						onclick={() => (feedbackOpen = false)}>
						{m.button_cancel()}
					</Button.Root>
					<Button.Root type="submit">{m.button_submit()}</Button.Root>
				</div>
			</form>
		{/if}
	</div>
</AlertDialog>

<AlertDialog bind:open={signOutOpen}>
	<p class="mb-8 text-center text-lg">{m.are_you_sure()} {m.confirm_sign_out()}</p>
	{#snippet go()}
		<form method="POST" action="/?/signout">
			<Button.Root type="submit">{m.button_go()}</Button.Root>
		</form>
	{/snippet}
</AlertDialog>
