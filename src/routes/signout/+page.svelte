<script lang="ts">
	import { Button } from 'bits-ui';
	import { m } from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.sign_out()} | {m.celadon()}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<form method="POST" action="/?/signout" class="m-5">
	<Button.Root type="submit">{m.sign_out()}</Button.Root>
</form>
