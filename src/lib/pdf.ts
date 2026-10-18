import { browser } from '$app/env';

export async function downloadDocument(name: string, title: string, text: string) {
	console.log(text);

	if (!browser) return;

	const html2pdf = (await import('html2pdf.js')).default;

	const information = document.createElement('p');
	information.textContent = name + ' - ' + title;

	information.style.lineHeight = '4rem';
	information.style.fontSize = '15pt';
	information.style.textAlign = 'center';
	information.style.fontWeight = 'bold';

	const container = document.createElement('div');
	container.id = 'pdf';
	container.innerHTML = text;

	container.style.color = '#000';
	container.style.backgroundColor = '#fff';
	container.style.paddingBottom = '10px';
	container.style.whiteSpace = 'pre-wrap';
	container.style.fontFamily = 'Georgia';

	(container.querySelectorAll('h1') as NodeListOf<HTMLElement>).forEach((item) => {
		item.style.fontSize = '30pt';
		item.style.textAlign = 'center';
	});

	(container.querySelectorAll('h2') as NodeListOf<HTMLElement>).forEach((item) => {
		item.style.fontSize = '18pt';
		item.style.textAlign = 'center';
	});

	(container.querySelectorAll('p') as NodeListOf<HTMLElement>).forEach((item) => {
		item.style.fontSize = '14pt';
		item.style.lineHeight = '1.7rem';
		item.style.marginBottom = '0.6rem';
	});

	const main = document.createElement('div');

	main.appendChild(information);
	main.appendChild(container);

	html2pdf()
		.from(main)
		.set({
			margin: 20,
			filename: title + '.pdf',
			// @ts-expect-error For some reason doesn't detect this property
			pagebreak: {
				mode: 'avoid-all'
			},
			jsPDF: {
				format: 'letter'
			}
		})
		.save();
}
