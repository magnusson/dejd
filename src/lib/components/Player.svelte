<script lang="ts">
	import { MAX_GUESSES } from '$lib/constants';
	import { onMount } from 'svelte';

	export let track: string;
	export let guessCount: number;

	const PLAY_LENGTH = [1, 2, 4, 7, 11, 16, 30];

	let audio: HTMLAudioElement;
	let currentTime: number = 0;
	let timeoutId: number;

	$: {
		guessCount && play();
	}
	$: maxLength = guessCount === MAX_GUESSES ? 30 : 16;

	onMount(() => {
		audio.volume = 0.1;
	});

	const play = () => {
		let timeout = PLAY_LENGTH[guessCount] * 1000;
		clearTimeout(timeoutId);

		if (audio.paused) {
			audio.play();
		} else {
			timeout -= currentTime * 1000;
		}

		timeoutId = setTimeout(() => {
			audio.pause();
			audio.currentTime = 0;
		}, timeout);
	};
</script>

<button on:click={play} class="mx-auto block" aria-label="Play">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="h-12 w-12 text-neutral-200"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
		/>
	</svg>
</button>
<div class="bg relative flex h-3 w-full overflow-hidden border">
	<div class="bg-neutral-700" style="width: {(PLAY_LENGTH[guessCount] / maxLength) * 100}%" />
	<div class="absolute h-3 bg-sky-500" style="width: {(currentTime / maxLength) * 100}%" />
	{#each PLAY_LENGTH.slice(0, guessCount < MAX_GUESSES ? -1 : PLAY_LENGTH.length) as second}
		<div class="bg absolute bottom-0 top-0 border-r" style="left: {(second / maxLength) * 100}%" />
	{/each}
</div>
<audio bind:this={audio} bind:currentTime src={track} class="hidden" />
