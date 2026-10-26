import type { PageLoad } from './$types';
import { m } from '#lib/paraglide/messages.js';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		title: m.settings_for({ for: parentData.class.name })
	};
};
