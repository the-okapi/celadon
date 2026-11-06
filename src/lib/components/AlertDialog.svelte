<script lang="ts">
	import { Button, AlertDialog } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
	import { fade } from 'svelte/transition';

	let {
		open = $bindable(),
		children,
		go = null,
		cancel = true,
		message = m.cancel(),
		onclose = () => {},
		cancelOverride = false
	} = $props();

	function close() {
		open = false;
		onclose();
	}

	function onOpenChange(o: boolean) {
		if (o === false) {
			onclose();
		}
	}
</script>

{#if open}
	<AlertDialog.Root {onOpenChange} bind:open>
		<AlertDialog.Portal>
			<AlertDialog.Content interactOutsideBehavior="close" forceMount>
				{#snippet child({ props, open })}
					{#if open}
						<div {...props} transition:fade={{ duration: 100 }}>
							{@render children()}
							{#if go}
								<div class="m-auto flex w-fit gap-4">
									{#if cancel}
										<AlertDialog.Cancel data-button-root class="gray-button"
											>{message}</AlertDialog.Cancel
										>
									{/if}
									{@render go()}
								</div>
							{:else if cancelOverride}
								<Button.Root
									data-button-root
									onclick={close}
									class="gray-button m-auto block">{message}</Button.Root
								>
							{/if}
						</div>
					{/if}
				{/snippet}
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
{/if}
<!--
<div class="absolute z-50!">
	{#if open}
		<button data-alert-dialog-overlay onclick={() => (open = false)} aria-label="Close Dialog"
		></button>
		<div data-alert-dialog-content transition:fade={{ duration: 100 }}>
			{@render children?.()}
			{#if go}
				<div class="m-auto flex w-fit gap-4">
					{#if cancel}
						<Button.Root onclick={close} class="gray-button">{message}</Button.Root>
					{/if}
					{@render go()}
				</div>
			{:else if cancelOverride}
				<Button.Root onclick={close} class="gray-button m-auto block">{message}</Button.Root
				>
			{/if}
		</div>
	{/if}
</div> -->
