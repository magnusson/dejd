<script lang="ts">
	export let currentTrack: {
		cover?: string;
		artist: string;
		title: string;
		release_date?: string;
	};
	export let newGame: () => void;
</script>

<div class="flex flex-col items-center text-white">
	<img src={currentTrack.cover} alt="" class="mb-2 w-40 md:w-60" />
	<p>{currentTrack.artist} - <strong>{currentTrack.title}</strong></p>
	{#if currentTrack.release_date}
		<p class="text-sm">{currentTrack.release_date}abc</p>
	{/if}
	<button
		class="mt-4 block rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold uppercase leading-6 text-neutral-200"
		on:click={newGame}
	>
		Next
	</button>
</div>
