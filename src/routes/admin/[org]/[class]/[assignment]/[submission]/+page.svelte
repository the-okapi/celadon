<script lang="ts">
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import { extensions, viewerExtensions } from '#lib/tiptap.js';
	import { m } from '#lib/paraglide/messages.js';
	import { formatDate } from '#lib/util.js';
	import { downloadDocument } from '#lib/pdf.js';
	import { Button } from 'bits-ui';
	import { resolve } from '$app/paths';

	let element: any = $state();
	let editorState: { editor: Editor | null } = $state({ editor: null });

	let { data, params } = $props();

	onMount(async () => {
		editorState.editor = new Editor({
			element,
			extensions: [...extensions, ...viewerExtensions],
			content: data.submission.document.content,
			editable: false
		});
	});

	async function download() {
		await downloadDocument(
			data.submission.user.name,
			data.title,
			editorState.editor?.getHTML() ?? ''
		);
	}
</script>

<div class="flex">
	<div class="w-110"></div>
	<div class="flex flex-col">
		<div class="h-30"></div>
		<div
			class="relative flex h-screen w-[calc(100vw-27.5rem)] flex-col items-center justify-center gap-4 pt-33 pb-5"
		>
			<div class="flex items-center justify-center gap-6">
				<p>
					{data.submission.user.name}
					–
					{#if data.submission.submitted !== null}
						{m.submitted()} {formatDate(data.submission.submitted)}
					{:else}{m.not()} {m.submitted()}
					{/if}
					<Button.Root onclick={download} class="small-button mx-3"
						>{m.download_pdf()}</Button.Root
					>
					<Button.Root
						class="small-button px-4! py-2!"
						href={resolve('/admin/[org]/[class]/[assignment]', { ...params })}
						>{m.close()}</Button.Root
					>
				</p>
			</div>

			<div class="tiptap-container">
				<div spellcheck="false" bind:this={element} style="zoom: 0.68;"></div>
			</div>
		</div>
	</div>
</div>
