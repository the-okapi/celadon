import { Resend } from 'resend';
import { PRIVATE_RESEND_API_KEY } from '$app/env/private';
import { PUBLIC_CELADON_URL } from '$app/env/public';

const resend = new Resend(PRIVATE_RESEND_API_KEY);

export async function sendInvitationEmail(data: {
	email: string;
	name: string;
	organization: { id: string; name: string };
	invitation: string;
}) {
	await resend.emails.send({
		from: 'Celadon <noreply@celadon.work>',
		to: data.email,
		template: {
			id: 'invitation-email',
			variables: {
				NAME: data.name,
				ORGANIZATION: data.organization.name,
				LINK:
					PUBLIC_CELADON_URL +
					'/invitation/' +
					data.organization.id +
					'/' +
					data.invitation
			}
		}
	});
}
