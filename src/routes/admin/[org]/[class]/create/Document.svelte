<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Toggle from '#lib/components/Toggle.svelte';
	import Popover from '#lib/components/Popover.svelte';
	import Select from '#lib/components/Select.svelte';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import Bold from '@lucide/svelte/icons/bold';
	import Italic from '@lucide/svelte/icons/italic';
	import Underline from '@lucide/svelte/icons/underline';
	import FontSize from '@lucide/svelte/icons/a-large-small';
	import { extensions, editorExtensions } from '#lib/tiptap.js';
	import Accents from '#lib/components/Accents.svelte';
	import { Button } from 'bits-ui';

	let element: any = $state();
	let editorState: { editor: Editor | null } = $state({ editor: null });

	let textStyle = $state('p');
	let changeTextStyleOpen = $state(false);

	let addAccentOpen = $state(false);

	function addAccent(str: string) {
		addAccentOpen = false;
		editorState.editor?.chain().insertContent(str).focus().run();
	}

	function updateTextStyle() {
		if (editorState.editor?.isActive('heading', { level: 1 })) {
			textStyle = 'h1';
		} else if (editorState.editor?.isActive('heading', { level: 2 })) {
			textStyle = 'h2';
		} else if (editorState.editor?.isActive('paragraph')) {
			textStyle = 'p';
		}
	}

	function changeTextStyle() {
		if (textStyle === 'h1') {
			editorState.editor?.chain().focus().setHeading({ level: 1 }).run();
		} else if (textStyle === 'h2') {
			editorState.editor?.chain().focus().setHeading({ level: 2 }).run();
		} else {
			editorState.editor?.chain().focus().setParagraph().run();
		}
		changeTextStyleOpen = false;
	}

	onMount(() => {
		editorState.editor = new Editor({
			element,
			extensions: [...extensions, ...editorExtensions],
			content: '',
			onTransaction: ({ editor }) => {
				editorState = { editor };
			},
			onUpdate: () => {
				changesMadeSinceSave = true;
				if (editorState.editor?.isActive('link')) {
					editorState.editor?.commands.unsetLink();
				}
			},
			onSelectionUpdate: updateTextStyle
		});
		updateTextStyle();
	});

	onDestroy(() => {
		editorState.editor?.destroy();
	});

	let changesMadeSinceSave = $state(false);

	function onbeforeunload(event: Event) {
		if (changesMadeSinceSave) {
			event.preventDefault();
		}
	}

	function oncontextmenu(event: Event) {
		event.preventDefault();
	}
</script>

<svelte:window {onbeforeunload} {oncontextmenu} />

<div class="border-o sticky top-38 z-50! m-auto mt-5 flex w-fit gap-2 rounded-xl bg-(--bg) p-2">
	<Toggle
		active={editorState.editor?.isActive('bold')}
		class="toggle-icon"
		onclick={() => editorState.editor?.chain().focus().toggleBold().run()}
		title={m.bold()}
	>
		<Bold size={20} />
	</Toggle>
	<Toggle
		active={editorState.editor?.isActive('italic')}
		class="toggle-icon"
		onclick={() => editorState.editor?.chain().focus().toggleItalic().run()}
		title={m.italic()}
	>
		<Italic size={20} />
	</Toggle>
	<Toggle
		active={editorState.editor?.isActive('underline')}
		class="toggle-icon"
		onclick={() => editorState.editor?.chain().focus().toggleUnderline().run()}
		title={m.underline()}
	>
		<Underline size={20} />
	</Toggle>
	<div class="mx-1 border-l border-(--o)"></div>
	<Popover border={false} bind:open={changeTextStyleOpen}>
		{#snippet trigger()}
			<Button.Root class="icon-button"><FontSize size={20} /></Button.Root>
		{/snippet}
		<Select
			options={[
				{ value: 'p', label: m.body() },
				{ value: 'h2', label: m.subheading() },
				{ value: 'h1', label: m.heading() }
			]}
			bind:value={textStyle}
			onChange={changeTextStyle}
			class="popover-select py-1.5!"
		/>
	</Popover>
	<div class="mx-1 border-l border-(--o)"></div>
	<Button.Root
		onclick={() => {
			addAccentOpen = true;
		}}
		class="icon-button"
		title={m.accents()}
	>
		É
	</Button.Root>
</div>

<div class="py-3 text-center">
	<div class="tiptap-container">
		<div spellcheck="false" bind:this={element} style="zoom: 0.75;"></div>
	</div>
</div>

<AlertDialog bind:open={addAccentOpen} cancelOverride>
	<Accents {addAccent} />
</AlertDialog>
