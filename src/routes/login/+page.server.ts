import type { Actions } from './$types';
import { safeParse, object, string } from 'valibot';
import { error500, unwrap, unwrapNoData, handleFormActionError } from '#lib/error.js';
import { fail, redirect } from '@sveltejs/kit';
import { m } from '#lib/paraglide/messages.js';

const LogInSchema = object({
	email: string(),
	password: string()
});

export const actions = {
	default: async ({ locals, request }) => {
		const formData = safeParse(LogInSchema, Object.fromEntries(await request.formData()));

		if (!formData.success) {
			return error500();
		}

		const { email, password } = formData.output;

		try {
			const {
				data: { user },
				error
			} = await locals.supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error || !user) {
				return fail(404, { logInMessage: m.email_password_incorrect(), email, password });
			}

			const check = unwrap(
				await locals.supabase.from('users').select('can_delete').eq('id', user.id),
				85
			);

			if (!check[0].can_delete) {
				return redirect(303, '/student');
			}

			unwrapNoData(await locals.supabase.auth.signOut(), 86);

			return fail(404, { logInMessage: m.email_password_incorrect(), email, password });
		} catch (e) {
			return handleFormActionError(e, {
				logInMessage: m.email_password_incorrect(),
				email,
				password
			});
		}
	}
} satisfies Actions;
