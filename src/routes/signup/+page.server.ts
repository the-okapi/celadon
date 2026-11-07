import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { object, string, safeParse } from 'valibot';
import { m } from '#lib/paraglide/messages.js';
import { error500, unwrapNoData } from '#lib/error.js';
import { createOrganization } from '#lib/actions.js';

const SignupSchema = object({
	name: string(),
	email: string(),
	password: string()
});

export const actions = {
	default: async ({ request, locals }) => {
		const formData = safeParse(SignupSchema, Object.fromEntries(await request.formData()));

		if (!formData.success) {
			return fail(400, {
				fail: true,
				message: m.something_happened(),
				name: '',
				email: ''
			});
		}

		const { email, password, name } = formData.output;

		try {
			unwrapNoData(
				await locals.supabase.auth.signUp({
					email,
					password,
					options: {
						data: {
							name
						}
					}
				}),
				110
			);

			const {
				data: { user }
			} = await locals.supabase.auth.getUser();

			if (!user) {
				return error500();
			}

			createOrganization(user.id, locals.supabase);
		} catch {
			return error500();
		}

		return redirect(303, '/admin');
	}
} satisfies Actions;
