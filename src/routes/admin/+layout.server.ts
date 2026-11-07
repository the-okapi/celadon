import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleHttpError, unwrap } from '#lib/error.js';
import { createOrganization } from '#lib/actions.js';

export const load: LayoutServerLoad = async ({ parent, locals }) => {
	const parentData = await parent();
	if (!parentData.loggedIn) {
		return redirect(303, '/');
	}

	if (!parentData.admin) {
		return redirect(303, '/student');
	}

	const {
		data: { user }
	} = await locals.supabase.auth.getUser();

	if (!user) {
		return redirect(303, '/');
	}

	try {
		let memberships = unwrap(
			await locals.supabase
				.from('organization_memberships')
				.select('id, organization')
				.eq('user', user.id),
			103
		);

		if (memberships.length < 1) {
			const [{ name }] = unwrap(
				await locals.supabase.from('users').select('name').eq('id', user.id),
				111
			);

			createOrganization(user.id, name, locals.supabase);

			memberships = unwrap(
				await locals.supabase
					.from('organization_memberships')
					.select('id, organization')
					.eq('user', user.id),
				112
			);
		}

		const classes = unwrap(
			await locals.supabase
				.from('classes')
				.select('id, name')
				.eq('organization', memberships[0].organization),
			15
		);

		return {
			classes: classes.map((a: { id: string; name: string }) => ({
				value: a.id,
				label: a.name
			}))
		};
	} catch (e: any) {
		return handleHttpError(e);
	}
};
