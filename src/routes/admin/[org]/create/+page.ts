import type { PageLoad } from './$types';
import { m } from '#lib/paraglide/messages.js';

export const load: PageLoad = () => {
	return {
		title: m.create_class()
	};
};
