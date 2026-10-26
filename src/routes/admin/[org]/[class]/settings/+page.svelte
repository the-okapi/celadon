<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { Button } from 'bits-ui';
	import Setting from './Setting.svelte';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import { enhance } from '$app/forms';
	import { handleFormError } from '#lib/error.js';

	let { data, form } = $props();

	let confirmDeleteOpen = $state(false);
</script>

{#snippet divider()}
	<div class="m-auto my-3 w-[90%] border-b border-(--o)"></div>
{/snippet}

<div class="flex h-full w-full items-center justify-center py-5">
	<div class="border-o h-fit w-200 rounded-xl bg-(--bg)">
		<Setting title={m.delete_class()} description={m.delete_class_description()}>
			<Button.Root class="red-button" onclick={() => (confirmDeleteOpen = true)}
				>{m.delete()}</Button.Root
			>
		</Setting>
		{@render divider()}
	</div>
</div>

<AlertDialog bind:open={confirmDeleteOpen}>
	<p class="mb-8 w-100 text-center text-lg">
		{m.are_you_sure()}
		{m.delete_the_class({ class: data.class.name })}
	</p>
	{#snippet go()}
		<form
			action="?/remove"
			use:enhance={() => {
				return handleFormError(form?.message);
			}}
			method="POST"
		>
			<Button.Root type="submit" class="red-button">{m.delete()}</Button.Root>
		</form>
	{/snippet}
</AlertDialog>
