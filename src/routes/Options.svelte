<script lang="ts">
	import Select from '#lib/components/Select.svelte';
	import { mode, setMode, setTheme, theme } from 'mode-watcher';
	import { Label, Popover } from 'bits-ui';
	import { fade } from 'svelte/transition';
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

	// Backgrounds
	const backgrounds = [
		{
			label: 'Stripes',
			value: 'stripes'
		},
		{
			label: 'Nothing :(',
			value: 'nothing'
		}
	];

	function onBackgroundChange(v: 'stripes' | 'dots' | 'nothing') {
		setTheme(color + '-' + v);
	}

	// Colors
	const colors = [
		{
			label: '<div class="swatch bg-(--red)"></div> ' + m.red(),
			value: 'red'
		},
		{
			label: '<div class="swatch bg-(--yellow)"></div> ' + m.yellow(),
			value: 'yellow'
		},
		{
			label: '<div class="swatch bg-(--green)"></div> ' + m.green(),
			value: 'green'
		},
		{
			label: '<div class="swatch bg-(--turquoise)"></div> Turquoise',
			value: 'turquoise'
		},
		{
			label: '<div class="swatch bg-(--blue)"></div> ' + m.blue(),
			value: 'blue'
		},
		{
			label: '<div class="swatch bg-(--purple)"></div> ' + m.purple(),
			value: 'purple'
		},
		{
			label: '<div class="swatch bg-(--neutral)"></div> ' + m.neutral(),
			value: 'neutral'
		}
	];

	function onColorChange(v: string) {
		setTheme(v + '-' + background);
	}

	function getTheme(theme: string | undefined): string[] {
		return (theme ?? 'turquoise-stripes').split('-');
	}

	let [color, background] = $derived(getTheme(theme.current));
</script>

<Popover.Root>
	<Popover.Trigger class="nav-bar-link">{m.options()}</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content sideOffset={10} forceMount>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div {...props} transition:fade={{ duration: 100 }}>
							<div class="flex flex-col gap-4 p-3">
								<div class="m-auto w-fit">
									<Label.Root
										>{m.mode()}:
										<Select
											options={modes}
											value={mode.current}
											onChange={onModeChange}
										/></Label.Root
									>
								</div>

								<div class="m-auto w-fit">
									<Label.Root
										>{m.color()}:
										<Select
											options={colors}
											value={color}
											onChange={onColorChange}
										/></Label.Root
									>
								</div>

								<div class="m-auto w-fit">
									<Label.Root
										>{m.background()}:
										<Select
											options={backgrounds}
											value={background}
											onChange={onBackgroundChange}
										/></Label.Root
									>
								</div>

								<div class="m-auto w-fit">
									<Label.Root
										>{m.language()}:
										<Select
											options={languages}
											value={getLocale()}
											onChange={onLangChange}
										/></Label.Root
									>
								</div>
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
