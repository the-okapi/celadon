import { form, getRequestEvent } from '$app/server';
import { object, string } from 'valibot';
import { unwrap, unwrapNoData } from '#lib/error.js';
import { m } from '#lib/paraglide/messages.js';
import { redirect } from '@sveltejs/kit';

const LogInSchema = object({
	email: string(),
	password: string()
});

export const logIn = form(LogInSchema, async ({ email, password }) => {
	const { locals } = getRequestEvent();

	try {
		const {
			data: { user },
			error
		} = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error || !user) {
			return { status: 404, message: m.email_password_incorrect() };
		}

		const check = unwrap(
			await locals.supabase.from('users').select('can_delete').eq('id', user.id),
			85
		);

		if (!check[0].can_delete) {
			return redirect(303, '/student');
		}

		unwrapNoData(await locals.supabase.auth.signOut(), 86);

		return { stauts: 404, message: m.email_password_incorrect() };
	} catch {
		return { status: 500, message: m.email_password_incorrect() };
	}
});
