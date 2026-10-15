import type { PageServerLoad } from './$types';
import { m } from '#lib/paraglide/messages.js';

export const load: PageServerLoad = () => {
	return {
		title: m.account()
	};
};
