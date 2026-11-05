<script lang="ts">
	let { open = $bindable() } = $props();
</script>

<p>{open}</p>

<!-- <script lang="ts">
	import { Popover } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
	import { fade } from 'svelte/transition';
	import Loader from '#lib/components/Loader.svelte';
	import { Label, Button } from 'bits-ui';

	let loading = $state(false);


	let { open = $bindable() } = $props();
</script>

<Popover.Root bind:open>
	<Popover.Trigger class="nav-bar-link">{m.sign_up()}</Popover.Trigger>
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
									<form {onsubmit}>
										<div class="mb-5 w-60">
											<Label.Root
												for="email"
												class={loading ? 'opacity-50' : ''}
												>{m.email()}:</Label.Root
											>
											<input
												type="email"
												id="email"
												class="w-60"
												bind:value={email}
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
												type="password"
												class="w-60"
												bind:value={password}
												required
											/>
										</div>
										<div class="absolute w-60 text-center">
											<p class="text-xs text-(--r)">{error}</p>
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
