<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { formatDate } from '#lib/util.js';
	import Tabs from '#lib/components/Tabs.svelte';
	import { resolve } from '$app/paths';

	let { data, params } = $props();

	type Assignment = {
		id: string;
		name: string;
		description: string;
		due_date: string;
	};
</script>

{#snippet list(assignments: Assignment[])}
	<div class="mt-5 grid grid-cols-3 gap-4 px-30">
		{#each assignments as assignment (assignment.id)}
			<div class="box relative p-0!">
				<a
					class="flex h-full w-full cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-(--a)"
					href={resolve('/admin/[org]/[class]/[assignment]', {
						org: params.org,
						class: params.class,
						assignment: assignment.id
					})}
				>
					<div class="relative w-fit text-center">
						<div class="absolute -top-8 w-full">
							{#if new Date() > new Date(assignment.due_date)}
								<p class="badge mx-auto mb-4 w-fit! bg-(--r) px-5!">
									{m.past()}
								</p>
							{:else}
								<p class="badge mx-auto mb-4 w-fit! bg-(--p) px-5! text-(--p-fg)">
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
					<div class="absolute bottom-2 left-0 w-full text-center">
						<p>
							{m.manage()}
							{m.assignment()}
						</p>
					</div>
				</a>
			</div>
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
