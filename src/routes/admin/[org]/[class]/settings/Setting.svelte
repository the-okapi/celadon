<script lang="ts">
	let { title, description, children } = $props();
</script>

<div class="m-4 flex">
	<div class="w-full">
		<h2 class="text-xl font-bold">{title}</h2>
		<p class="leading-4">{description}</p>
	</div>
	<div class="flex w-fit items-center">
		{@render children()}
	</div>
</div>
