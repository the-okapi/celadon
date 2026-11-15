import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const parentData = await parent();

	if (!parentData.loggedIn) {
		return redirect(303, '/');
	}
};
