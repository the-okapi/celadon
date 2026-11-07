import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { object, string, safeParse } from 'valibot';
import { m } from '#lib/paraglide/messages.js';
import { error500, unwrapNoData } from '#lib/error.js';
import { createOrganization } from '#lib/actions.js';

const SignupSchema = object({
	name: string(),
	email: string(),
	password: string(),
	confirmPassword: string()
});

export const actions = {
	default: async ({ request, locals }) => {
		const formData = safeParse(SignupSchema, Object.fromEntries(await request.formData()));

		if (!formData.success) {
			return fail(400, {
				fail: true,
				message: m.something_happened(),
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		}

		const { name, email, password, confirmPassword } = formData.output;

		if (password !== confirmPassword) {
			return fail(400, {
				fail: true,
				message: m.password_confirm_dont_match(),
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		}

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

			createOrganization(user.id, name, locals.supabase);
		} catch (error: any) {
			if (error.code === 'user_already_exists') {
				return fail(409, { fail: true, message: m.email_taken(), ...formData.output });
			} else {
				return fail(500, {
					fail: true,
					message: m.something_happened(),
					...formData.output
				});
			}
		}

		return redirect(303, '/admin');
	}
} satisfies Actions;
