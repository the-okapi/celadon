<script lang="ts">
	import { PUBLIC_HELP_URL } from '$app/env/public';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { Button } from 'bits-ui';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import favicon from '#lib/assets/favicon.png';

	onMount(() => {
		goto(resolve('/'));
	});
</script>

<svelte:head>
	<title>{m.celadon()}</title>
</svelte:head>

<div class="h-25"></div>

<img src={favicon} class="m-auto w-60" alt={m.celadon()} />
<h1 class="relative mt-3 text-center text-8xl leading-32 font-black text-(--p)">
	{m.celadon()}
</h1>
<h2 class="relative text-center text-3xl">{m.slogan()}</h2>

<div class="m-auto mt-10 flex h-10 w-fit items-center justify-center gap-3">
	<Button.Root class="big-button" rel="external" href={PUBLIC_HELP_URL}>{m.help()}</Button.Root>
	<Button.Root id="logIn" class="big-button">{m.log_in()}</Button.Root>
	<Button.Root id="signUpButton" class="big-button">{m.sign_up()}</Button.Root>
</div>

<div class="h-20"></div>

<div class="flex justify-center gap-7 text-2xl">
	<div class="border-o h-80 w-110 rounded-xl bg-(--bg) p-7 pt-10">
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

	<div class="border-o h-80 w-110 rounded-xl bg-(--bg) p-7 pt-10">
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

	<div class="border-o relative h-80 w-110 rounded-xl bg-(--bg) p-7 pt-8">
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

<div class="h-10"></div>

<p class="relative text-center text-2xl">
	{m.contact()} <strong>contact@celadon.work</strong>
	{m.if_questions()}
</p>

<div class="h-10"></div>
