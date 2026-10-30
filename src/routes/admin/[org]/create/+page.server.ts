import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { handleFormActionError, unwrap, unwrapNoData } from '#lib/error.js';
import { m } from '#lib/paraglide/messages.js';

export const actions = {
	default: async ({ request, locals, params }) => {
		console.log('hello');
		const { name } = Object.fromEntries(await request.formData());

		try {
			const {
				data: { user }
			} = await locals.supabase.auth.getUser();

			if (!user) {
				return redirect(303, '/');
			}

			const check = unwrap(
				await locals.supabase
					.from('organization_memberships')
					.select('id')
					.eq('organization', params.org)
					.eq('admin', true)
					.eq('user', user.id),
				105
			);

			if (!check?.[0]) {
				return redirect(303, '/admin');
			}

			const id = crypto.randomUUID();

			unwrapNoData(
				await locals.supabase.from('classes').insert({
					id,
					name,
					creator: user.id,
					organization: params.org
				}),
				106
			);

			return redirect(303, `/admin/${params.org}/${id}`);
		} catch (error: any) {
			return handleFormActionError(
				error,
				fail(500, { failure: true, message: m.something_happened() })
			);
		}
	}
} satisfies Actions;
