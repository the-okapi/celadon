<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { formatDate } from '#lib/util.js';
	import Tabs from '#lib/components/Tabs.svelte';
	import HoverButton from '#lib/components/HoverButton.svelte';
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { slide } from 'svelte/transition';

	let { data, params } = $props();

	type Assignment = {
		id: string;
		name: string;
		description: string;
		due_date: string;
	};
</script>

{#snippet list(assignments: Assignment[])}
	<div class="mt-5 flex flex-col gap-4 px-30">
		{#each assignments as assignment (assignment.id)}
			<!-- <div class="box relative p-0!">
				<HoverButton
					class="flex h-full w-full cursor-pointer items-center justify-center rounded-xl"
					href={resolve('/admin/[org]/[class]/[assignment]', {
						org: params.org,
						class: params.class,
						assignment: assignment.id
					})}
				>
					{#snippet child(hover: boolean)}
						<div class="relative w-fit text-center">
							<div class="absolute -top-8 w-full">
								{#if new Date() > new Date(assignment.due_date)}
									<p class="badge mx-auto mb-4 w-fit! bg-(--r) px-5!">
										{m.past()}
									</p>
								{:else}
									<p
										class="badge mx-auto mb-4 w-fit! bg-(--p) px-5! text-(--p-fg)"
									>
										{m.upcoming()}
									</p>
								{/if}
							</div>
							<p class="italic">{formatDate(assignment.due_date)}</p>
							<h3 class="text-center text-2xl font-bold">
								{assignment.name}
							</h3>
							<p class="px-8">{assignment.description}</p>
						</div>
						{#if hover}
							<div class="absolute bottom-2 left-0 w-full text-center">
								<p transition:slide>Hello</p>
							</div>
						{:else}
							<div class="absolute bottom-2 left-0 w-full text-center">
								<p transition:slide>
									{m.manage()}
									{m.assignment()}
								</p>
							</div>
						{/if}
					{/snippet}
				</HoverButton>
			</div> -->
			<HoverButton
				href={resolve('/admin/[org]/[class]/[assignment]', {
					assignment: assignment.id,
					...params
				})}
				class="border-o relative flex h-15 w-full items-center gap-3 rounded-3xl bg-(--bg) py-3 pr-6 pl-3"
			>
				{#snippet child(hover: boolean)}
					{#if new Date() > new Date(assignment.due_date)}
						<p class="badge min-w-fit! bg-(--r) px-5!">
							{m.past()}
						</p>
					{:else}
						<p class="badge min-w-fit! overflow-x-visible bg-(--p) px-5! text-(--p-fg)">
							{m.upcoming()}
						</p>
					{/if}
					<p class="mr-4 text-xl font-bold whitespace-nowrap">
						{assignment.name}
					</p>
					<p class="whitespace-nowrap italic">{formatDate(assignment.due_date)}</p>
					<p class="overflow-hidden text-ellipsis whitespace-nowrap">
						{assignment.description}
						{assignment.description}
						{assignment.description}
					</p>
					{#if hover}
						<div class="absolute right-0 pr-1.5" transition:slide={{ axis: 'x' }}>
							<ArrowRight size={15} />
						</div>
					{/if}
				{/snippet}
			</HoverButton>
		{/each}
	</div>
	{#if assignments.length === 0}
		<p class="w-full text-center text-xl">{m.no_assignments_here()}</p>
	{/if}
{/snippet}
{#snippet upcoming()}
	{const assignments = $derived(
		data.assignments.filter((a: Assignment) => new Date() < new Date(a.due_date))
	)}
	{@render list(assignments)}
{/snippet}
{#snippet past()}
	{const assignments = $derived(
		data.assignments.filter((a: Assignment) => new Date() >= new Date(a.due_date))
	)}
	{@render list(assignments)}
{/snippet}

<div class="w-screen pt-5">
	<Tabs labels={[m.upcoming(), m.past()]} snippets={[upcoming, past]} />
</div>
