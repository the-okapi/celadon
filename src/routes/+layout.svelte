<script lang="ts">
	import 'nprogress/nprogress.css';
	import '#lib/css/main.css';
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import { ModeWatcher, mode, setMode } from 'mode-watcher';
	import favicon from '#lib/assets/favicon.png';
	import { barHidden } from '#lib/state.svelte.js';
	import type { LayoutProps } from './$types';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import { Button } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale, setLocale } from '#lib/paraglide/runtime.js';
	import { PUBLIC_HELP_URL } from '$app/env/public';
	import Show from '@lucide/svelte/icons/eye';
	import Hide from '@lucide/svelte/icons/eye-closed';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { setNavBarContext } from '#lib/context.js';
	import { Toaster } from 'svelte-sonner';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { feedback } from './remote';
	import { showToast } from '#lib/toast.js';
	import Loader from '#lib/components/Loader.svelte';
	import nprogress from 'nprogress';

	let { data, children }: LayoutProps = $props();

	let signOutOpen = $state(false);

	let feedbackOpen = $state(false);

	let pageNavBarContent: Snippet | undefined = $state();

	setNavBarContext({
		setContent(snippet: Snippet) {
			pageNavBarContent = snippet;
			return onDestroy(() => {
				pageNavBarContent = undefined;
			});
		}
	});

	onMount(() => {
		nprogress.configure({
			showSpinner: false,
			template: '<div class="bar" role="bar"></div>'
		});
	});

	beforeNavigate(() => {
		nprogress.start();
	});

	afterNavigate(() => {
		nprogress.done();
	});

	let feedbackContent = $state('');
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher
	darkClassNames={['dark']}
	lightClassNames={['light']}
	defaultMode="system"
	modeStorageKey="celadon-mode"
/>

<Toaster />

<main class="flex min-h-[calc(100vh-4rem)] items-center justify-center">
	<div class="h-fit w-fit">
		{@render children()}
	</div>
</main>

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
			<h2 class="mb-2 text-center text-3xl font-black">{m.feedback()}</h2>
			<form
				{...feedback.enhance(async (form) => {
					loading = true;
					await form.submit();
					if (form.result?.success) {
						showToast(m.thank_feedback(), 'success');
						feedbackOpen = false;
						feedbackContent = '';
					} else {
						showToast(m.something_happened(), 'error');
					}
					loading = false;
				})}
			>
				<textarea
					{...feedback.fields.content.as('text')}
					bind:value={feedbackContent}
					class="h-30 w-100"
					required
					disabled={loading}></textarea><br />
				<Button.Root type="submit" class="m-auto block">{m.submit()}</Button.Root>
			</form>
		{/if}
	</div>
</AlertDialog>

<AlertDialog bind:open={signOutOpen}>
	<p class="mb-8 text-center text-lg">{m.are_you_sure()} {m.confirm_sign_out()}</p>
	{#snippet go()}
		<form method="POST" action="/?/signout">
			<Button.Root type="submit">{m.go()}</Button.Root>
		</form>
	{/snippet}
</AlertDialog>
