<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { formatDate } from '#lib/util.js';
	import { Button } from 'bits-ui';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import Info from '@lucide/svelte/icons/info';
	import Undo from '@lucide/svelte/icons/undo-2';
	import Edit from './Edit.svelte';
	import View from './View.svelte';

	let { data, params } = $props();

	let assignmentDetailsOpen = $state(false);

	let confirmUnsubmitOpen = $state(false);
</script>

{#snippet assignmentDetails()}
	<Button.Root
		class="flex size-10 items-center justify-center p-0!"
		onclick={() => (assignmentDetailsOpen = true)}
		title={m.assignment_details()}
	>
		<Info size={20} />
	</Button.Root>
{/snippet}

{#if !data.assignment.submitted}
	<Edit content={data.document.content} assignment={params.assignment}>
		{@render assignmentDetails()}
	</Edit>
{:else}
	<View content={data.document.content} submitted={data.assignment.submitted}>
		{@render assignmentDetails()}
		<Button.Root
			class="flex size-10 items-center justify-center p-0!"
			title={m.unsubmit()}
			onclick={() => (confirmUnsubmitOpen = true)}
		>
			<Undo size={20} />
		</Button.Root>
	</View>
{/if}

<AlertDialog bind:open={assignmentDetailsOpen} message={m.ok()} cancelOverride>
	<div class="mb-5">
		{#if new Date() > new Date(data.assignment.due_date)}
			<div class="badge m-auto w-fit! bg-(--r) px-5!">{m.late()}</div>
		{/if}
		<p class="w-full text-center">
			{m.due_date()}: <i>{formatDate(data.assignment.due_date)}</i>
		</p>
		<h2 class="text-center text-2xl font-bold">{data.assignment.name}</h2>
		<p class="m-auto block w-fit">{data.assignment.description}</p>
	</div>
</AlertDialog>

<AlertDialog bind:open={confirmUnsubmitOpen}>
	<p class="mb-4 w-100 text-center">{m.are_you_sure()} {m.undo_submission()}</p>
	{#snippet go()}
		<form method="POST" action="?/undo">
			<Button.Root type="submit">{m.go()}</Button.Root>
		</form>
	{/snippet}
</AlertDialog>
