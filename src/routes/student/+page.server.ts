import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { unwrap, error500 } from '#lib/error.js';
import { m } from '#lib/paraglide/messages.js';

export const load: PageServerLoad = async ({ locals }) => {
	const {
		data: { user }
	} = await locals.supabase.auth.getUser();

	if (!user) {
		return redirect(303, '/');
	}

	try {
		const classes = unwrap(
			await locals.supabase
				.from('class_memberships')
				.select('id, class ( id, name, organization ), admin')
				.eq('user', user.id),
			17
		);

		return {
			classes,
			title: m.home()
		};
	} catch {
		return error500();
	}
};
