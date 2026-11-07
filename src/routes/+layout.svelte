<script lang="ts">
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
	import { onDestroy, type Snippet } from 'svelte';
	import { setNavBarContext } from '#lib/context.js';
	import { Toaster } from 'svelte-sonner';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { feedback } from './remote';
	import { showToast } from '#lib/toast.js';

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
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher
	darkClassNames={['dark']}
	lightClassNames={['light']}
	defaultMode="system"
	modeStorageKey="celadon-mode"
/>

<Toaster />

{#if data.loggedIn}
	<div class="nav-bar">
		{#if !barHidden.value}
			<div
				class="fixed top-0 flex w-screen items-center border-b border-(--o) bg-(--bg) px-7 py-5"
			>
				<div class="flex w-full">
					<button class="nav-bar-link" onclick={() => (signOutOpen = true)}
						>{m.sign_out()}</button
					>
				</div>
				<h1 class="text-4xl font-bold whitespace-nowrap">
					{page.data.title ?? m.celadon()}
				</h1>
				<div class="flex w-full items-center justify-end gap-2 text-right">
					{#if pageNavBarContent}
						{@render pageNavBarContent()}
					{/if}
					{#if page.route.id === '/student/assignment/[assignment]'}
						<button
							class="hover-button size-10"
							onclick={() => (barHidden.value = true)}><Show size={20} /></button
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
{/if}

<div class="fixed top-0 z-50 h-2 rounded-br-full bg-(--p) shadow-xl {loadingBarClass}"></div>

<main class="min-h-[calc(100vh-4rem)]">
	{@render children()}
</main>

<footer
	class="z-50! flex h-16 w-screen items-center justify-center gap-6 border-t border-(--o) bg-(--bg) px-6"
>
	<p>© 2026 Unlimited Stuff Ltd.</p>

	<a href="mailto:contact@celadon.work">contact@celadon.work</a>

	<div class="h-8 border-l border-(--o)"></div>

	{#if getLocale() === 'en'}
		<button class="nav-bar-link" onclick={() => setLocale('fr')}>Français</button>
	{:else}
		<button class="nav-bar-link" onclick={() => setLocale('en')}>English</button>
	{/if}

	{#if mode.current === 'dark'}
		<button class="nav-bar-link" onclick={() => setMode('light')}>{m.light()}</button>
	{:else}
		<button class="nav-bar-link" onclick={() => setMode('dark')}>{m.dark()}</button>
	{/if}

	<div class="h-8 border-l border-(--o)"></div>

	{#if data.loggedIn}
		<button class="nav-bar-link" onclick={() => (feedbackOpen = true)}>{m.feedback()}</button>
	{/if}

	<a
		rel="external"
		target="_blank"
		class="nav-bar-link"
		href="{PUBLIC_HELP_URL}/{getLanguage(getLocale())}">{m.help()}</a
	>
</footer>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>

<AlertDialog bind:open={feedbackOpen}>
	{let loading = $state(false)}
	<h2 class="text-center text-2xl font-black">{m.feedback()}</h2>
	<form
		{...feedback.enhance(async (form) => {
			loading = true;
			await form.submit();
			if (form.result?.success) {
				showToast(m.thank_feedback(), 'success');
			} else {
				showToast(m.something_happened(), 'error');
			}
		})}
	>
		<textarea name="content" disabled={loading}></textarea>

		<Button.Root type="submit">{m.submit()}</Button.Root>
	</form>
</AlertDialog>

<AlertDialog bind:open={signOutOpen}>
	<p class="mb-8 text-center text-lg">{m.are_you_sure()} {m.confirm_sign_out()}</p>
	{#snippet go()}
		<form method="POST" action="/?/signout">
			<Button.Root type="submit">{m.go()}</Button.Root>
		</form>
	{/snippet}
</AlertDialog>
