import { form, getRequestEvent } from '$app/server';
import { object, string } from 'valibot';
import { unwrapNoData } from '#lib/error.js';
import { redirect } from '@sveltejs/kit';

const FeedbackSchema = object({
	content: string()
});

export const feedback = form(FeedbackSchema, async ({ content }) => {
	const { locals } = getRequestEvent();

	const {
		data: { user }
	} = await locals.supabase.auth.getUser();

	if (!user) {
		return redirect(303, '/');
	}

	try {
		unwrapNoData(
			await locals.supabase.from('feedback').insert({
				user: user.id,
				content
			}),
			111
		);
	} catch {
		return { success: false, content };
	}

	return { success: true };
});
