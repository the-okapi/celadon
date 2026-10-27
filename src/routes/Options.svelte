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
			label: 'Polka Dots',
			value: 'dots'
		},
		{
			label: 'Nothing :(',
			value: 'nothing'
		}
	];

	function onBackgroundChange(v: 'stripes' | 'dots' | 'nothing') {
		setTheme(v);
	}
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
										>{m.background()}:
										<Select
											options={backgrounds}
											value={theme.current}
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
