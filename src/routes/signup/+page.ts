import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { m } from '#lib/paraglide/messages.js';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	if (parentData.loggedIn) {
		return redirect(303, '/student');
	}

	return {
		title: m.sign_up()
	};
};
