import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params }) => {
	const parentData = await parent();

	const foundClass = parentData.classes?.find(
		(a: { value: string; label: string }) => a.value === params.class
	);

	return {
		class: {
			id: foundClass.value,
			name: foundClass.label
		}
	};
};
