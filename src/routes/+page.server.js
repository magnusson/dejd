export function load({ cookies }) {
	const neverRepeatInfo = cookies.get('neverRepeatInfo');

	cookies.set('neverRepeatInfo', 'true', { path: '/' });

	return {
		neverRepeatInfo
	};
}
