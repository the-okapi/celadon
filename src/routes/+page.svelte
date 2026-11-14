<script lang="ts">
	import { PUBLIC_ENGLISH_HELP_URL, PUBLIC_FRENCH_HELP_URL } from '$app/env/public';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { Button } from 'bits-ui';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import favicon from '#lib/assets/favicon.png';
	import { setLocale } from '#lib/paraglide/runtime.js';

	onMount(() => {
		goto(resolve('/'));
	});
</script>

<svelte:head>
	<title>{m.celadon()}</title>
</svelte:head>

<div class="h-20"></div>

<div class="m-auto mb-10 w-fit rounded-[3.8rem] shadow-2xl shadow-primary">
	<img src={favicon} class="w-60" alt={m.celadon()} />
</div>

<h1 class="relative text-center text-8xl leading-32 font-black text-primary">
	{m.celadon()}
</h1>
<h2 class="relative text-center text-3xl">{m.slogan()}</h2>

<div class="m-auto mt-10 flex h-10 w-fit items-center justify-center gap-3">
	<Button.Root
		class="big-button"
		rel="external"
		target="_blank"
		href={getLocale() === 'en' ? PUBLIC_ENGLISH_HELP_URL : PUBLIC_FRENCH_HELP_URL}
		>{m.help()}</Button.Root
	>
	<Button.Root class="big-button" href={resolve('/login')}>{m.log_in()}</Button.Root>
	<Button.Root class="big-button" href={resolve('/signup')}>{m.sign_up()}</Button.Root>
</div>

<div class="h-20"></div>

<div class="flex justify-center gap-7 text-2xl">
	<div class="border-o h-80 w-110 rounded-3xl bg-background p-7 pt-10 shadow-lg">
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

	<div class="border-o h-80 w-110 rounded-3xl bg-background p-7 pt-10 shadow-lg">
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

	<div class="border-o relative h-80 w-110 rounded-3xl bg-background p-7 pt-8 shadow-lg">
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

<footer
	class="z-50! flex h-16 w-screen items-center justify-center gap-6 border-t border-outline bg-background px-6"
>
	<a href="mailto:contact@celadon.work">contact@celadon.work</a>

	<div class="h-8 border-l border-outline"></div>

	{#if getLocale() === 'en'}
		<button class="underline-link" onclick={() => setLocale('fr')}>Français</button>
	{:else}
		<button class="underline-link" onclick={() => setLocale('en')}>English</button>
	{/if}

	<a
		rel="external"
		target="_blank"
		class="underline-link"
		href={getLocale() === 'en' ? PUBLIC_ENGLISH_HELP_URL : PUBLIC_FRENCH_HELP_URL}>{m.help()}</a
	>
</footer>
