<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import Back from '@lucide/svelte/icons/arrow-left';
</script>

<p class="inline-flex items-center hover:underline">
	<Back class="size-6 pr-1.5 hover:underline" />
	{m.back()}
</p>
