<script lang="ts">
	import { stats, playlists } from '$lib/stores';
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
	import { disney, original, special, swedish } from '$lib/playlists';

	const availablePlaylists = {
		Original: original,
		Disney: disney,
		Swedish: swedish,
		Special: special
	};
	let previousTrackCorrect = false;
	let guesses: GuessState[] = [];
	let search = '';
	let guess: Track | null = null;
	let currentTrack: Track;

	$: playlist = Object.values($playlists)
		.filter((playlist) => (playlist as { active: boolean; playlist: string }).active)
		.map(
			(playlist) =>
				availablePlaylists[
					(playlist as { active: boolean; playlist: string })
						.playlist as keyof typeof availablePlaylists
				]
		)
		.flat();
	$: $playlists && newGame();

	$: formatGuess = (i: number) =>
		guesses[i] ? (guesses[i] !== 'Skipped' ? formatTrack(guesses[i] as Track) : guesses[i]) : '';
	$: guessClass = (i: number) =>
		guesses[i]
			? guesses[i] !== 'Skipped' && (guesses[i] as Track).id === currentTrack.id
				? 'scale-110 bg-green-300 font-semibold transition-transform duration-300'
				: 'animate-shake bg-red-300 font-medium'
			: 'bg-neutral-300';

	const newTrack = () => {
		$stats.played++;

		// Randomly select a track from the playlist exclude the current track
		const randomTrack = playlist.filter((track) => track.id !== currentTrack?.id)[
			Math.floor(Math.random() * playlist.length)
		];

		// Check that the track preview is available
		fetch(randomTrack.preview)
			.then((response) => {
				if (!response.ok) {
					throw new Error();
				} else {
					currentTrack = randomTrack;
				}
			})
			.catch(() => newTrack());
	};

	const makeGuess = () => {
		guesses = [...guesses, guess!];

		// If the guess is correct fill up the guesses array so the game will end
		// and the GameOver component will be displayed
		if (guess!.id === currentTrack.id) {
			// Update the streak and max streak
			previousTrackCorrect = true;
			$stats.streak++;
			if ($stats.streak > $stats.maxStreak) {
				$stats.maxStreak = $stats.streak;
			}

			$stats.wins++;
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
		guesses = [...guesses, 'Skipped'];
	};

	const newGame = () => {
		// Reset the streak if the previous track was incorrect
		if (!previousTrackCorrect) {
			$stats.streak = 0;
		}

		newTrack();
		previousTrackCorrect = false;
		guesses = [];
	};

	const playlistsChanged = (updatedPlaylists: { [key: string]: { active: boolean } }) => {
		playlists.set(updatedPlaylists);
	};
</script>

<header class="mx-auto mb-4 grid max-w-lg grid-cols-3 items-center">
	<h1 class=" col-start-2 justify-center text-center font-lilita text-5xl text-white">DEJD</h1>
	<div class="flex justify-self-end">
		<PlaylistsModal playlists={$playlists} {playlistsChanged} />
		<StatsModal stats={$stats} />
		<AboutModal />
	</div>
</header>
<main class="mx-auto max-w-lg space-y-4">
	<ul class="space-y-4">
		{#each [...Array(MAX_GUESSES).keys()] as i}
			<li class="flex min-h-[2rem] items-center justify-center rounded p-1 text-sm {guessClass(i)}">
				{formatGuess(i)}
			</li>
		{/each}
	</ul>
	<Player track={currentTrack?.preview} guessCount={guesses.length} />
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
		<GameOver {currentTrack} {newGame} />
	{/if}
</main>
