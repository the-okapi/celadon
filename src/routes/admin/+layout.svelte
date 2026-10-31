<script lang="ts">
	import { page } from '$app/state';
	import { DropdownMenu } from 'bits-ui';
	import { getNavBarContext } from '#lib/context.js';
	import { m } from '#lib/paraglide/messages.js';
	import Expand from '@lucide/svelte/icons/chevrons-up-down';
	import Dropdown from '#lib/components/Dropdown.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Plus from '@lucide/svelte/icons/plus';

	let { children, data, params } = $props();

	const { setContent } = getNavBarContext();

	setContent(navBarContent);
</script>

{#snippet navBarContent()}
	{#if data.organization}
		<div class="flex items-center gap-1">
			<p>
				{(
					data.classes.find(
						(a: { value: string; label: string }) => a.value === params.class
					) ?? {
						label: m.select_a_class()
					}
				).label}
			</p>
			<Dropdown class="more-padding">
				{#snippet trigger()}
					<DropdownMenu.Trigger>
						<Expand size={18} />
					</DropdownMenu.Trigger>
				{/snippet}
				<DropdownMenu.Item
					data-select-item
					class="rounded-t-xl border-x border-t border-(--o) hover:bg-(--a)! {data.classes
						.length === 0
						? 'rounded-b-xl border-b'
						: ''}"
					onSelect={() =>
						goto(resolve('/admin/[org]/create', { org: data.organization.id }))}
				>
					<div class="flex items-center">
						<Plus size={17} />
						<div class="w-1.5"></div>
						<em>
							{m.create_class()}
						</em>
					</div>
				</DropdownMenu.Item>
				{#each data.classes as option, i (option.value)}
					<DropdownMenu.Item
						data-select-item
						class="more-padding border-x border-(--o) hover:bg-(--a)!  {i ===
						data.classes.length - 1
							? 'rounded-b-xl border-b'
							: ''}"
						onSelect={() =>
							goto(
								resolve('/admin/[org]/[class]', {
									org: data.organization.id,
									class: option.value
								})
							)}>{@html option.label}</DropdownMenu.Item
					>
				{/each}
			</Dropdown>
		</div>
		<p class="mr-1.5">—</p>
		<a href={resolve('/admin/[org]', { org: data.organization.id })} class="nav-bar-link"
			>{data.organization.name}</a
		>
		<p class="mx-1.5">—</p>
	{/if}
	<a href={resolve('/admin/account')} class="nav-bar-link">{data.name}</a>
{/snippet}

<svelte:head>
	<title>{page.data.title} | {m.celadon()}</title>
</svelte:head>

{@render children()}
