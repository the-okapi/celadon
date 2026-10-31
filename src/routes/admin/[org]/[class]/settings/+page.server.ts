import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { handleFormActionError, unwrapNoData } from '#lib/error.js';
import { m } from '#lib/paraglide/messages.js';

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
			return handleFormActionError(e, { message: m.something_happened() });
		}

		return redirect(303, '/admin');
	}
} satisfies Actions;
