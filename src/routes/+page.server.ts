import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { error500, handleFormActionError, unwrap, unwrapNoData } from '#lib/error.js';
import { m } from '#lib/paraglide/messages.js';
import { object, string, safeParse } from 'valibot';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.loggedIn) {
		return redirect(307, '/student');
	}

	return {
		title: m.celadon()
	};
};

const LogInSchema = object({
	email: string(),
	password: string()
});

const SignUpSchema = object({
	name: string(),
	email: string(),
	password: string(),
	confirmPassword: string()
});

export const actions = {
	logIn: async ({ locals, request }) => {
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
	},
	signUp: async ({ locals, request }) => {
		const formData = safeParse(SignUpSchema, Object.fromEntries(await request.formData()));

		if (!formData.success) {
			return error500();
		}

		const { name, email, password, confirmPassword } = formData.output;

		if (password !== confirmPassword) {
			return fail(400, { signUpMessage: m.password_confirm_dont_match() });
		}

		const { error: signUpError } = await locals.supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name
				}
			}
		});

		if (signUpError) {
			console.error(signUpError, 'Error Code 110');
			return fail(400, { fail: true, signUpMessage: m.something_happened(), name, email });
		}

		return redirect(303, '/admin');
	},
	signOut: async ({ locals }) => {
		const { error: e } = await locals.supabase.auth.signOut();

		if (e) {
			console.error(e, 'Error Code 84');
			return error500();
		}

		return redirect(303, '/');
	}
} satisfies Actions;
