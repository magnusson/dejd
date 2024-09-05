<script lang="ts">
	import { neverRepeatInfo, stats } from '$lib/stores';
</script>

<div
	class="absolute left-1/2 top-20 w-full max-w-md -translate-x-1/2 rounded-md bg-blue-50 p-4 lg:bottom-auto lg:top-4 lg:max-w-lg"
	role="alert"
	class:hidden={!$neverRepeatInfo || $stats.played < 3}
>
	<button
		class="absolute right-0 top-0 m-4"
		on:click={() => ($neverRepeatInfo = !$neverRepeatInfo)}
	>
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
	<p class="text-sm font-semibold text-blue-700">Tired of tracks repeating?</p>
	<p class="text-sm text-blue-700">Enable "Never repeat a track" in the playlists settings. 🤩</p>
</div>
