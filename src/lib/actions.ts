import { getLocale } from '#lib/paraglide/runtime.js';
import { unwrapNoData } from '#lib/error.js';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function createOrganization(userId: string, name: string, supabase: SupabaseClient) {
	const id = crypto.randomUUID();

	let orgName = name + "'s Organization";

	if (getLocale() === 'fr') {
		orgName = 'Organisation de ' + name;
	}

	unwrapNoData(
		await supabase.from('organizations').insert({
			id,
			name: orgName,
			creator: userId
		}),
		81
	);

	unwrapNoData(
		await supabase
			.from('users')
			.update({
				organization: id
			})
			.eq('id', userId),
		82
	);
}
