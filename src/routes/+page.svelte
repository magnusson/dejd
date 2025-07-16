<script lang="ts">
	import { base } from '$app/paths';
	import { stats, playlists, ignoredTracks, playedTracks, neverRepeat } from '$lib/stores';
	import AboutModal from '$lib/components/AboutModal.svelte';
	import AutoComplete from '$lib/components/AutoComplete.svelte';
	import GameOver from '$lib/components/GameOver.svelte';
	import Player from '$lib/components/Player.svelte';
	import StatsModal from '$lib/components/StatsModal.svelte';
	import { MAX_GUESSES } from '$lib/constants';
	import type { GuessState } from '$lib/types/GuessState';
	import type { Track } from '$lib/types/Track';
	import { formatTrack } from '$lib/utils/formatTrack';
	import PlaylistsModal from '$lib/components/PlaylistsModal.svelte';
	import { disney, original, special, swedish, bandle, holland } from '$lib/playlists';
	import { tick } from 'svelte';
	import NeverRepeatInfo from '$lib/components/NeverRepeatInfo.svelte';

	const availablePlaylists = {
		Original: original,
		Disney: disney,
		Swedish: swedish,
		Special: special,
		Bandle: bandle,
		Holland: holland
	};
	let previousTrackCorrect = false;
	let guesses: GuessState[] = [];
	let search = '';
	let guess: Track | null = null;
	let currentTrack: Track;
	let isFirstGame = true;
	let playerPlay: () => void;
	let noTracksLeft = false;

	$: playlist = Object.values($playlists)
		.filter((playlist) => (playlist as { active: boolean; playlist: string }).active)
		.map(
			(playlist) =>
				availablePlaylists[
					(playlist as { active: boolean; playlist: string })
						.playlist as keyof typeof availablePlaylists
				]
		)
		.flat()
		.filter((track) => ($neverRepeat ? !$playedTracks.some((id: number) => id === track.id) : true))
		.filter((track) => !$ignoredTracks.some((ignoredTrack: Track) => ignoredTrack.id === track.id));
	$: $playlists && newGame();
	$: $neverRepeat && guesses.length === MAX_GUESSES && addToPlayedTrack();

	$: formatGuess = (i: number) =>
		guesses[i] ? (guesses[i] !== 'Skipped' ? formatTrack(guesses[i] as Track) : guesses[i]) : '';
	$: guessClass = (i: number) =>
		guesses[i]
			? guesses[i] !== 'Skipped' && (guesses[i] as Track).id === currentTrack.id
				? 'scale-110 bg-green-300 font-semibold transition-transform duration-300'
				: 'animate-shake bg-red-300 font-medium'
			: 'bg-neutral-300';

	const newTrack = async () => {
		$stats.played++;
		$stats.daily.played++;

		if (playlist.length === 0) {
			noTracksLeft = true;
			return;
		} else {
			noTracksLeft = false;
		}

		// Randomly select a track from the playlist exclude the current track
		const filteredPlaylist = playlist.filter((track) => track.id !== currentTrack?.id);
		const randomTrack: Track =
			filteredPlaylist[Math.floor(Math.random() * filteredPlaylist.length)];

		await fetch(`${base}/api/track/${randomTrack.id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Track not found');
				}

				return response.json();
			})
			.then((track) => {
				randomTrack.preview = track.preview;
				currentTrack = randomTrack;
			})
			.catch((error) => {
				console.error('Error fetching track:', error);
				newTrack();
			});
	};

	const makeGuess = () => {
		guesses = [...guesses, guess!];

		// If the guess is correct fill up the guesses array so the game will end
		// and the GameOver component will be displayed
		if (guess!.id === currentTrack.id) {
			// Update the streak and max streak
			previousTrackCorrect = true;
			$stats.streak++;
			$stats.daily.streak++;

			if ($stats.streak > $stats.maxStreak) {
				$stats.maxStreak = $stats.streak;
			}

			if ($stats.daily.streak > $stats.daily.maxStreak) {
				$stats.daily.maxStreak = $stats.daily.streak;
			}

			$stats.wins++;
			$stats.daily.wins++;
			while (guesses.length < 6) {
				guesses = [...guesses, ''];
			}
		}

		// Reset the search and guess
		guess = null;
		search = '';
	};

	const skip = () => {
		$stats.skips++;
		$stats.daily.skips++;
		guesses = [...guesses, 'Skipped'];
		search = '';
		guess = null;
	};

	const newGame = async () => {
		// Reset the streak if the previous track was incorrect
		if (!previousTrackCorrect) {
			$stats.streak = $stats.daily.streak = 0;
		}

		await newTrack();
		previousTrackCorrect = false;
		search = '';
		guesses = [];

		await tick();

		if (!isFirstGame) {
			playerPlay();
		}
		isFirstGame = false;
	};

	const playlistsChanged = (updatedPlaylists: { [key: string]: { active: boolean } }) => {
		playlists.set(updatedPlaylists);
	};

	const ignoreTrack = () => {
		$ignoredTracks = [...$ignoredTracks, currentTrack];
	};

	const restoreIgnoredTrack = (track: Track) => {
		$ignoredTracks = $ignoredTracks.filter((ignoredTrack: Track) => ignoredTrack.id !== track.id);
	};

	const addToPlayedTrack = async () => {
		await tick();
		$playedTracks = [...$playedTracks, currentTrack.id];
	};

	const resetPlayedTrack = async () => {
		$playedTracks = [];
		await tick();
		newGame();
	};
</script>

<header class="mx-auto mb-4 grid max-w-lg grid-cols-3 items-center">
	<h1 class="justify-center font-lilita text-5xl text-white lg:col-start-2 lg:text-center">DEJD</h1>
	<div class="col-start-3 flex justify-self-end">
		<PlaylistsModal
			playlists={$playlists}
			{availablePlaylists}
			{playlistsChanged}
			ignoredTracks={$ignoredTracks}
			{restoreIgnoredTrack}
			{resetPlayedTrack}
		/>
		<StatsModal stats={$stats} />
		<AboutModal />
	</div>
</header>
<main class="mx-auto max-w-lg space-y-4">
	{#if noTracksLeft}
		<div>
			<p class="text-center text-lg font-semibold text-neutral-200">You are amazing! 🤩</p>
			<p class="text-center text-neutral-200">
				You have played all the tracks! 🎉
				<br />
				Thanks for playing. ❤️
			</p>
			<button
				class="mx-auto mt-4 block font-semibold text-neutral-500 hover:text-emerald-500"
				on:click={resetPlayedTrack}
			>
				Click here to reset and start over
			</button>
		</div>
	{:else if currentTrack && currentTrack.preview}
		<ul class="space-y-4">
			{#each [...Array(MAX_GUESSES).keys()] as i}
				<li
					class="flex min-h-[2rem] items-center justify-center rounded p-1 text-sm {guessClass(i)}"
				>
					{formatGuess(i)}
				</li>
			{/each}
		</ul>
		<Player track={currentTrack.preview} guessCount={guesses.length} bind:play={playerPlay} />
		{#if guesses.length < MAX_GUESSES}
			<AutoComplete bind:search bind:guess {playlist} />
			<div class="flex justify-between">
				<button
					class="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold uppercase leading-6 text-neutral-200"
					on:click={skip}
					disabled={!currentTrack}
				>
					Skip
				</button>
				<button
					class="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold uppercase leading-6 text-neutral-200"
					on:click={makeGuess}
					disabled={!guess}
				>
					Guess
				</button>
			</div>
		{:else if currentTrack}
			<GameOver {currentTrack} {newGame} {ignoreTrack} />
		{/if}
	{:else}
		<svg
			class="mx-auto h-7 w-7 animate-spin text-center text-neutral-200"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{/if}
</main>
<NeverRepeatInfo />
