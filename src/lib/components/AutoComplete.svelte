<script lang="ts">
	import { playlist } from '$lib/playlist';
	import type { Track } from '$lib/types/Track';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { formatTrack } from '$lib/utils/formatTrack';
	import { normalizeText } from '$lib/utils/normalizeText';

	export let guess: Track | null;
	export let search: string;

	$: filteredTracks = playlist.filter((track: Track) => {
		const trackTitle = formatTrack(track);
		const cleanTitle = normalizeText(trackTitle);

		return cleanTitle.includes(normalizeText(search));
	});
	$: searchOpen =
		search.length > 1 &&
		filteredTracks.length > 0 &&
		!(filteredTracks.length === 1 && filteredTracks[0].id === guess?.id);
</script>

<div class="relative mb-2 flex flex-col">
	<input
		type="text"
		bind:value={search}
		class="w-full rounded-md bg-white px-3 py-2 shadow-sm outline-none"
		placeholder="Search for artist or song title"
	/>
	{#if searchOpen}
		<div
			class="absolute top-full mt-2 max-h-96 w-full overflow-auto rounded-md bg-white"
			use:clickOutside={() => (search = '')}
		>
			{#each filteredTracks as track}
				<button
					class="w-full p-2.5 text-left hover:bg-neutral-100"
					on:click={() => {
						search = formatTrack(track);
						guess = track;
					}}
				>
					{formatTrack(track)}
				</button>
			{/each}
		</div>
	{/if}
</div>
