<script lang="ts">
	import { resolve } from '$app/paths';
	import { m } from '#lib/paraglide/messages.js';

	let { children, data, params } = $props();
</script>

<div
	class="fixed top-20 z-20! flex h-16 w-screen items-center gap-7 border-t border-b border-(--o) bg-(--bg) px-7"
>
	<a class="nav-bar-link text-lg font-bold" href={resolve('/admin/[org]/[class]', { ...params })}
		>{data.class.name}</a
	>

	<a class="nav-bar-link" href={resolve('/admin/[org]/[class]/assignments', { ...params })}
		>{m.assignments()}</a
	>

	<a class="nav-bar-link" href={resolve('/admin/[org]/[class]/create', { ...params })}
		>{m.create_assignment()}</a
	>

	<a class="nav-bar-link" href={resolve('/admin/[org]/[class]/settings', { ...params })}
		>{m.settings()}</a
	>
</div>

<div class="relative top-16 flex h-[calc(100vh-9rem)]">
	{@render children()}
</div>
