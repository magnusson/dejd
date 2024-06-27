<script lang="ts">
	export let currentTrack: {
		cover?: string;
		artist: string;
		title: string;
		release_date?: string;
	};
	export let newGame: () => void;
	export let ignoreTrack: () => void;

	let ignoredTrack = false;

	const handleIgnoreTrack = () => {
		ignoredTrack = true;
		ignoreTrack();
	};
</script>

<div class="flex flex-col items-center text-white">
	<img src={currentTrack.cover} alt="" class="mb-2 w-40 md:w-60" />
	<p>{currentTrack.artist} - <strong>{currentTrack.title}</strong></p>
	{#if currentTrack.release_date}
		<p class="text-sm">{currentTrack.release_date}</p>
	{/if}
	<button
		class="mt-4 block rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold uppercase leading-6 text-neutral-200"
		on:click={newGame}
	>
		Next
	</button>
	<div class="mt-4 text-xs leading-6 text-neutral-500">
		{#if ignoredTrack}
			<p>It's gone, sorry you didn't like it. 🥺</p>
		{:else}
			<button class="flex items-center hover:text-rose-500" on:click={handleIgnoreTrack}>
				Ignore track
			</button>
		{/if}
	</div>
</div>
