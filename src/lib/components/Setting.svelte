<script module>
	export { divider };
</script>

<script lang="ts">
	let { title, description = null, children } = $props();
</script>

{#snippet divider()}
	<div class="m-auto my-3 w-[90%] border-b border-outline"></div>
{/snippet}

<div class="m-4 flex w-full">
	<div class="w-full">
		<h2 class="text-xl font-bold">{title}</h2>
		{#if description}
			<p class="leading-4">{description}</p>
		{/if}
	</div>
	<div class="flex w-fit items-center">
		{@render children()}
	</div>
</div>
