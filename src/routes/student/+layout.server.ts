import { handleHttpError, unwrap } from '#lib/error.js';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ parent, locals }) => {
	const parentData = await parent();
	const {
		data: { user }
	} = await locals.supabase.auth.getUser();

	if (!parentData.loggedIn || !user) {
		return redirect(303, '/');
	}

	if (parentData.admin) {
		return redirect(303, '/admin');
	}

	try {
		const user = unwrap(await locals.supabase.from('users').select('name'), 109);

		return {
			name: user[0].name
		};
	} catch (error: any) {
		return handleHttpError(error);
	}
};
