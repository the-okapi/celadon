<script lang="ts">
	import Select from '#lib/components/Select.svelte';
	import { mode, setMode } from 'mode-watcher';
	import Setting, { divider } from '#lib/components/Setting.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { setLocale } from '#lib/paraglide/runtime.js';

	// Light/Dark
	const modes = $derived([
		{
			label: m.system(),
			value: 'system'
		},
		{
			label: m.light(),
			value: 'light'
		},
		{
			label: m.dark(),
			value: 'dark'
		}
	]);

	function onModeChange(v: 'dark' | 'light' | 'system') {
		setMode(v);
	}

	// Language
	const languages = [
		{
			label: 'English',
			value: 'en'
		},
		{
			label: 'Français',
			value: 'fr'
		}
	];

	function onLangChange(v: 'en' | 'fr') {
		setLocale(v);
	}
</script>

<svelte:head>
	<title>{m.options()} | {m.celadon()}</title>
</svelte:head>

<button class="nav-bar-link m-auto mb-5 block" onclick={() => history.back()}
	>{m.back_button()}</button
>

<h1 class="mb-15 text-center text-4xl font-black">{m.options()}</h1>

<div class="flex h-full w-300 flex-col items-center justify-center px-80">
	<Setting title={m.mode()}>
		<Select options={modes} value={mode.current} onChange={onModeChange} />
	</Setting>

	{@render divider()}

	<Setting title={m.language()}>
		<Select options={languages} value={getLocale()} onChange={onLangChange} />
	</Setting>
</div>
