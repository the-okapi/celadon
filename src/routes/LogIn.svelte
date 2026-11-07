<!-- <script lang="ts">
	import { Button, Label } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import Loader from '#lib/components/Loader.svelte';
	import { logIn } from './remote';
	import { m } from '#lib/paraglide/messages.js';
	import { Popover } from 'bits-ui';

	let { open = $bindable() } = $props();

	let loading = $state(false);
</script>

<Popover.Root bind:open>
	<Popover.Trigger class="nav-bar-link">{m.log_in()}</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content sideOffset={10} forceMount>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div {...props} transition:fade={{ duration: 100 }}>
							<div class="flex h-65 w-67 items-center justify-center">
								{#if loading}
									<Loader />
								{:else}
									<form
										{...logIn.enhance(async (form) => {
											loading = true;
											await form.submit();
											loading = false;
										})}
									>
										<div class="mb-5 w-60">
											<Label.Root
												for="email"
												class={loading ? 'opacity-50' : ''}
												>{m.email()}:</Label.Root
											>
											<input
												id="email"
												class="w-60"
												{...logIn.fields.email.as('email')}
												required
											/>
										</div>
										<div class="mb-0.5 w-60">
											<Label.Root
												for="password"
												class={loading ? 'opacity-50' : ''}
												>{m.password()}:</Label.Root
											>
											<input
												id="password"
												class="w-60"
												{...logIn.fields.password.as('password')}
												required
											/>
										</div>
										<div class="absolute w-60 text-center">
											<p class="text-xs text-(--r)">
												{logIn.result?.message}
											</p>
										</div>
										<Button.Root type="submit" class="m-auto mt-7 block w-fit"
											>{m.submit()}</Button.Root
										>
									</form>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root> -->
