<script lang="ts">
	import type { Track } from '$lib/types/Track';
	import { clickOutside } from '$lib/utils/clickOutside';

	export let playlists: { [key: string]: { active: boolean } };
	export let playlistsChanged: (playlists: { [key: string]: { active: boolean } }) => void;
	export let availablePlaylists: { [key: string]: Track[] };
	export let ignoredTracks: Track[];
	export let restoreIgnoredTrack: (track: Track) => void;

	let open = false;

	$: activePlaylists = Object.values(playlists).filter((playlist) => playlist.active).length;

	const togglePlaylist = (playlist: string) => {
		playlists[playlist].active = !playlists[playlist].active;
	};
</script>

<div use:clickOutside={() => (open = false)}>
	<button on:click={() => (open = !open)} class="ml-4" aria-label="Playlists">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6 text-white"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
			/>
		</svg>
	</button>
	<div
		class="absolute left-8 right-8 top-20 z-50 mx-auto hidden max-w-md rounded-lg bg-white p-5 shadow lg:top-32"
		class:block={open}
		class:hidden={!open}
	>
		<div class="flex items-center justify-between">
			<h2 class="font-lilita text-2xl">Playlists</h2>
			<button on:click={() => (open = false)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
		<div class="flex flex-col">
			{#each Object.keys(playlists) as playlist}
				<div class="flex items-center">
					<input
						id={playlist}
						type="checkbox"
						class="h-6 w-6 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
						checked={playlists[playlist].active}
						on:change={() => togglePlaylist(playlist)}
						disabled={activePlaylists === 1 && playlists[playlist].active}
					/>
					<label for={playlist} class="ml-2 w-full py-3 text-sm font-medium">
						{playlist} <span class="text-xs">({availablePlaylists[playlist].length} songs)</span>
					</label>
				</div>
			{/each}
			<button
				class="self-end rounded-md bg-blue-700 px-3 py-2 text-right text-sm font-semibold uppercase leading-6 text-neutral-200"
				on:click={() => {
					playlistsChanged(playlists);
					open = false;
				}}
			>
				Save
			</button>
		</div>
		<div>
			<h3 class="font-lilita text-xl">Ignored tracks</h3>
			<p class="text-sm">Tracks that you've chosen to ignore will not be played again.</p>
			<ul class="mt-2 max-h-44 overflow-y-auto">
				{#each ignoredTracks as track}
					<li
						class="item-center flex justify-between px-3 py-2 text-sm font-medium hover:bg-slate-200"
					>
						{track.artist} - {track.title}
						<button on:click={() => restoreIgnoredTrack(track)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="pointer-events-none size-4"
							>
								<path
									fill-rule="evenodd"
									d="M9.75 3.5A2.75 2.75 0 0 0 7 6.25v5.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V6.25a4.25 4.25 0 0 1 8.5 0v1a.75.75 0 0 1-1.5 0v-1A2.75 2.75 0 0 0 9.75 3.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
