<script lang="ts">
	import { Button } from 'bits-ui';
	import { onMount } from 'svelte';
	import { m } from '#lib/paraglide/messages.js';

	let { class: c = '', children, ...props } = $props();

	let seconds = $state(5);

	onMount(() => {
		const interval = setInterval(reduce, 1000);

		function reduce() {
			seconds -= 1;
			if (seconds === 0) {
				clearInterval(interval);
			}
		}
	});
</script>

{#if seconds > 0}
	<Button.Root disabled class="red-button {c}" {...props}>{m.loading()} {seconds}</Button.Root>
{:else}
	<Button.Root class="red-button {c}" {...props}>
		{@render children()}
	</Button.Root>
{/if}
