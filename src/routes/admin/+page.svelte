<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { Label, Button } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { data, form } = $props();

	function goToClass(org: string, classId: string) {
		goto(
			resolve('/admin/[org]/[class]', {
				org,
				class: classId
			}),
			{
				refreshAll: true
			}
		);
	}
</script>

<div class="grid grid-cols-3 gap-7 px-20 pt-4 pb-10">
	{#if data.organization?.admin}
		<div class="box">
			<button
				class="box hover-box"
				onclick={() =>
					goto(resolve('/admin/[org]', { org: data.organization.id }), {
						refreshAll: true
					})}
			>
				<div>
					<h2 class="text-center text-4xl font-bold">
						{data.organization.name}
					</h2>
				</div>
				<div class="absolute bottom-2 left-0 w-full">
					<p>{m.manage()} {m.organization()}</p>
				</div>
			</button>
		</div>
		<div class="box" in:fade>
			<form method="POST" action="?/create">
				<h2 class="mb-10 text-center text-3xl font-bold">{m.create_class()}</h2>
				<Label.Root for="className">{m.class_name()}:</Label.Root><br />
				<input type="text" name="className" id="className" class="mr-1 h-10" required />
				<Button.Root type="submit">{m.submit()}</Button.Root>
				{#if form?.createFailure}
					<p class="absolute text-(--red)">{form?.message}</p>
				{/if}
				<input type="hidden" name="organization" value={data.organization.id} />
			</form>
		</div>
	{/if}

	{#if data.organization}
		{#each data.classes as classData (classData.id)}
			<div class="box">
				<button
					class="box hover-box"
					onclick={() => goToClass(data.organization.id, classData.id)}
				>
					<div>
						<h2 class="text-center text-4xl font-bold">{classData.name}</h2>
					</div>
					<div class="absolute bottom-2 left-0 w-full">
						<p>{m.manage_class()}</p>
					</div>
				</button>
			</div>
		{/each}
	{/if}
</div>
