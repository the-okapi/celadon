import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { handleHttpError, unwrapNoData } from '#lib/error.js';

export const actions = {
	remove: async ({ params, locals }) => {
		const {
			data: { user }
		} = await locals.supabase.auth.getUser();

		if (!user) {
			return redirect(303, '/');
		}

		try {
			unwrapNoData(
				await locals.supabase
					.from('classes')
					.delete()
					.eq('id', params.class)
					.eq('organization', params.org),
				108
			);
		} catch (e: any) {
			return handleHttpError(e);
		}

		return redirect(303, '/admin');
	}
} satisfies Actions;
