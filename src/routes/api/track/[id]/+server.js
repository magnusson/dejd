// src/routes/api/track/[id]/+server.js
export async function GET({ params }) {
	const { id } = params;

	const res = await fetch(`https://api.deezer.com/track/${id}`);

	if (!res.ok) {
		return new Response('Failed to fetch track data', { status: res.status });
	}

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
