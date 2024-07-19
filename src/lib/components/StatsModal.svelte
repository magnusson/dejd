<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';

	export let stats: {
		played: number;
		wins: number;
		skips: number;
		streak: number;
		maxStreak: number;
		daily: {
			played: number;
			wins: number;
			skips: number;
			streak: number;
			maxStreak: number;
		};
	};
	let open = false;
</script>

<div use:clickOutside={() => (open = false)}>
	<button on:click={() => (open = !open)} class="ml-4" aria-label="Stats">
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
				d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
			/>
		</svg>
	</button>
	<div
		class="absolute left-8 right-8 top-20 z-50 mx-auto hidden max-w-md rounded-lg bg-white p-5 shadow lg:top-32"
		class:block={open}
		class:hidden={!open}
	>
		<div class="flex items-center justify-between">
			<h2 class="font-lilita text-2xl">Stats</h2>
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
		<h3 class="mt-4 font-lilita text-xl">Today</h3>
		<div class="grid grid-cols-5">
			<div class="text-center">
				<p class="font-lilita text-2xl">{stats.daily?.played}</p>
				<p class="text-sm">Played</p>
			</div>
			<div class="text-center" title={`${stats.daily?.wins} wins`}>
				<p class="font-lilita text-2xl">
					{Math.round((stats.daily?.wins / stats.daily?.played) * 100)}%
				</p>
				<p class="text-sm">Wins</p>
			</div>
			<div class="text-center">
				<p class="font-lilita text-2xl">{stats.daily?.streak}</p>
				<p class="text-sm">Current streak</p>
			</div>
			<div class="text-center">
				<p class="font-lilita text-2xl">{stats.daily?.maxStreak}</p>
				<p class="text-sm">Best streak</p>
			</div>
			<div class="text-center">
				<p class="font-lilita text-2xl">
					<span class="blur-md hover:blur-none">{stats.daily?.skips}</span>
				</p>
				<p class="text-sm">Skips</p>
			</div>
		</div>
		<h3 class="mt-4 font-lilita text-xl">Overall</h3>
		<div class="grid grid-cols-4">
			<div class="text-center">
				<p class="font-lilita text-2xl">{stats.played}</p>
				<p class="text-sm">Played</p>
			</div>
			<div class="text-center" title={`${stats.wins} wins`}>
				<p class="font-lilita text-2xl">{Math.round((stats.wins / stats.played) * 100)}%</p>
				<p class="text-sm">Wins</p>
			</div>
			<div class="text-center">
				<p class="font-lilita text-2xl">{stats.maxStreak}</p>
				<p class="text-sm">Best streak</p>
			</div>
			<div class="text-center">
				<p class="font-lilita text-2xl">
					<span class="blur-md hover:blur-none">{stats.skips}</span>
				</p>
				<p class="text-sm">Skips</p>
			</div>
		</div>
	</div>
</div>
