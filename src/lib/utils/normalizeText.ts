export const normalizeText = (text: string): string =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/[^a-zåäö0-9 ]/gi, '')
		.toLowerCase()
		.trim();
