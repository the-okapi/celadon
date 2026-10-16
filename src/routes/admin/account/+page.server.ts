import { handleHttpError, unwrap } from '#lib/error.js';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const {
		data: { user }
	} = await locals.supabase.auth.getUser();

	if (!user) {
		return redirect(303, '/');
	}

	try {
		const user = unwrap(await locals.supabase.from('users').select('id, name, email'), 107);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			title: user.name
		};
	} catch (error: any) {
		return handleHttpError(error);
	}
};
