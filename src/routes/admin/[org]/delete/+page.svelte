<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import AlertDialog from '#lib/components/AlertDialog.svelte';
	import { Button } from 'bits-ui';
	import { resolve } from '$app/paths';

	let { params } = $props();
</script>

<div class="flex h-[calc(100vh-5rem)] w-screen items-center justify-center">
	<div class="h-fit text-center">
		<AlertDialog open cancel={false}>
			<p class="mb-5 w-80">
				{m.after_delete()}
			</p>
			{#snippet go()}
				<Button.Root href={resolve('/admin/[org]', { ...params })} class="h-fit py-2!"
					>{m.back()}</Button.Root
				>
			{/snippet}
		</AlertDialog>
	</div>
</div>
