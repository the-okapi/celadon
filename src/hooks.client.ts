import { showToast } from '#lib/toast';
import type { HandleClientError } from '@sveltejs/kit/hooks';

export const handleError: HandleClientError = async ({ kind, error, event }) => {
	showToast('Hello', 'error');
};
