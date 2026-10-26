<script lang="ts">
	import '#lib/css/main.css';
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '#lib/assets/favicon.ico';
	import { barHidden } from '#lib/state.svelte.js';
	import type { LayoutProps } from './$types';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import { Button } from 'bits-ui';
	import Options from './Options.svelte';
	import LogIn from './LogIn.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { PUBLIC_HELP_URL } from '$app/env/public';
	import Show from '@lucide/svelte/icons/eye';
	import Hide from '@lucide/svelte/icons/eye-closed';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { setNavBarContext } from '#lib/context.js';
	import { Toaster } from 'svelte-sonner';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let { data, children }: LayoutProps = $props();

	let logOutOpen = $state(false);

	let pageNavBarContent: Snippet | undefined = $state();

	setNavBarContext({
		setContent(snippet: Snippet) {
			pageNavBarContent = snippet;
			return onDestroy(() => {
				pageNavBarContent = undefined;
			});
		}
	});

	function getLanguage(locale: string) {
		switch (locale) {
			case 'fr':
				return 'francais';
			default:
				return 'english';
		}
	}

	let loadingBarClass = $state('');

	beforeNavigate(() => {
		loadingBarClass = 'before-nav';
	});

	afterNavigate(() => {
		loadingBarClass = 'after-nav';
	});

	let logInOpen = $state(false);

	onMount(() => {
		document.getElementById('logIn')?.addEventListener('click', () => {
			logInOpen = true;
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher
	darkClassNames={['dark']}
	lightClassNames={['light']}
	defaultTheme="turquoise-stripes"
	defaultMode="system"
	themeStorageKey="graphopage-theme"
	modeStorageKey="graphopage-mode"
/>

<Toaster />

<div class="nav-bar">
	{#if !barHidden.value}
		<div
			class="fixed top-0 flex w-screen items-center border-b border-(--o) bg-(--bg) px-7 py-5"
		>
			<div class="flex w-full gap-4">
				{#if data.loggedIn}
					<button class="nav-bar-link" onclick={() => (logOutOpen = true)}
						>{m.log_out()}</button
					>
				{:else}
					<a class="nav-bar-link" href={resolve('/')}>{m.graphopage()}</a>
					<a class="nav-bar-link" href={resolve('/signup')}>{m.sign_up()}</a>

					<LogIn bind:open={logInOpen} />
				{/if}
				<Options />

				<a
					class="nav-bar-link"
					rel="external"
					href="{PUBLIC_HELP_URL}/{getLanguage(getLocale())}"
					target="_blank">{m.help()}</a
				>
			</div>
			<h1 class="text-4xl font-bold whitespace-nowrap">
				{page.data.title ?? m.graphopage()}
			</h1>
			<div class="flex w-full items-center justify-end gap-2 text-right">
				{#if pageNavBarContent}
					{@render pageNavBarContent()}
				{/if}
				{#if page.route.id === '/student/assignment/[assignment]'}
					<button class="hover-button size-10" onclick={() => (barHidden.value = true)}
						><Show size={20} /></button
					>
				{/if}
			</div>
		</div>

		<div class="h-20"></div>
	{:else if barHidden.value}
		<button
			class="hover-button border-o fixed top-5 right-7 size-10"
			onclick={() => (barHidden.value = false)}><Hide size={20} /></button
		>
	{/if}
</div>
<div class="loading-bar fixed top-19.5 z-50 h-0.5 shadow-xl {loadingBarClass}"></div>

<main class="min-h-[calc(100vh-5rem)]">
	{@render children()}
</main>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>

<AlertDialog bind:open={logOutOpen}>
	<p class="mb-8 text-center text-lg">{m.are_you_sure()} {m.confirm_log_out()}</p>
	{#snippet go()}
		<form method="POST" action="/?/signOut">
			<Button.Root type="submit">{m.go()}</Button.Root>
		</form>
	{/snippet}
</AlertDialog>
