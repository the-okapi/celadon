<script lang="ts">
	import X from '@lucide/svelte/icons/x';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import CircleX from '@lucide/svelte/icons/circle-x';

	let { state = 'default', message, closeToast } = $props();
</script>

<div class="border-o relative flex w-80 items-center gap-2 rounded-xl bg-background p-5 shadow-2xl">
	{#if state === 'success'}
		<CircleCheck size={20} color="var(--p)" />
	{:else if state === 'error'}
		<CircleX size={20} color="var(--red)" />
	{/if}
	<p class="leading-5">
		{message}
	</p>
	<button
		onclick={closeToast}
		class="border-o absolute -top-2 -right-2 cursor-pointer rounded-full bg-background p-1 text-right hover:bg-(--a)"
		><X size={15} /></button
	>
</div>
