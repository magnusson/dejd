<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';

	let open = false;
</script>

<div use:clickOutside={() => (open = false)}>
	<button on:click={() => (open = !open)} class="ml-4" aria-label="About">
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
				d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
			/>
		</svg>
	</button>
	<div
		class="absolute left-8 right-8 top-20 z-50 mx-auto hidden max-w-md rounded-lg bg-white p-5 shadow lg:top-32"
		class:block={open}
		class:hidden={!open}
	>
		<div class="flex items-center justify-between">
			<h2 class="font-lilita text-2xl">About</h2>
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
		<div>
			<p>
				Try to guess the song based on a few seconds of it. Skip to hear more of the song. You have
				6 guesses. Good luck and have fun!
			</p>
			<p>The tracks are from Deezer API.</p>
			<svg viewBox="0 0 992 279" xmlns="http://www.w3.org/2000/svg" class="mt-2 h-8">
				<path
					clip-rule="evenodd"
					d="M353.119 68.19h54.962c34.031 0 58.095 22.64 58.095 54.82s-24.064 54.82-58.095 54.82h-54.962V68.19Zm42.717 80.023h9.967c10.679 0 16.375-7.119 16.375-25.203 0-18.083-5.696-25.203-16.375-25.203h-9.967v50.406Zm167.163 29.617h-90.275V68.19h90.275v29.617h-47.701v12.673h44.853v24.206h-44.853v13.527h47.701v29.617Zm100.526 0h-90.274V68.19h90.274v29.617h-47.7v12.673h44.853v24.206h-44.853v13.527h47.7v29.617Zm327.639 0c-6.152-16.765-14.756-34.653-26.33-54.704 13.536-3.97 21.631-12.504 21.631-25.603 0-19.935-18.368-29.333-47.416-29.333h-59.803v109.64h42.716v-45.352c9.491 15.984 16.483 31.068 21.074 45.352h48.128Zm-69.202-60.658V97.807h14.809c6.265 0 9.825 3.418 9.825 9.683s-3.56 9.682-9.825 9.682h-14.809Zm-52.968 60.658h-90.275V68.19h90.275v29.617h-47.7v12.673h44.853v24.206h-44.853v13.527h47.7v29.617ZM673.779 97.807h44.076c-18.287 14.963-33.337 31.91-44.931 50.406v29.617h96.967v-29.617h-48.466c11.106-16.158 26.625-32.248 48.466-50.406V68.19h-96.112v29.617Z"
					fill-rule="evenodd"
					fill="#0F0D13"
				>
				</path>
				<path
					clip-rule="evenodd"
					d="M232.97 42.874c2.569-14.89 6.339-24.254 10.515-24.271h.008c7.787.026 14.099 32.498 14.099 72.59 0 40.091-6.321 72.589-14.116 72.589-3.196 0-6.145-5.518-8.519-14.765-3.752 33.85-11.538 57.119-20.552 57.119-6.974 0-13.233-13.978-17.435-36.022-2.869 41.924-10.09 71.669-18.53 71.669-5.297 0-10.126-11.787-13.701-30.979-4.299 39.617-14.231 67.376-25.813 67.376-11.582 0-21.532-27.75-25.813-67.376-3.549 19.192-8.378 30.979-13.701 30.979-8.44 0-15.643-29.745-18.53-71.669-4.202 22.044-10.444 36.022-17.436 36.022-9.004 0-16.8-23.261-20.551-57.119-2.357 9.274-5.323 14.765-8.519 14.765-7.795 0-14.116-32.498-14.116-72.59 0-40.09 6.32-72.59 14.116-72.59 4.184 0 7.928 9.39 10.523 24.272C49.057 17.198 55.81.51 63.446.51c9.067 0 16.924 23.6 20.64 57.87 3.638-24.942 9.155-40.843 15.335-40.843 8.66 0 16.022 31.274 18.75 74.897 5.129-22.366 12.554-36.397 20.773-36.397 8.218 0 15.643 14.04 20.763 36.398 2.737-43.624 10.09-74.898 18.751-74.898 6.17 0 11.679 15.9 15.334 40.843C197.5 24.11 205.357.51 214.423.51c7.61 0 14.389 16.697 18.547 42.363ZM.09 84.053c0-17.922 3.583-32.454 8.006-32.454s8.007 14.532 8.007 32.454c0 17.921-3.584 32.454-8.007 32.454S.09 101.974.09 84.053Zm261.653 0c0-17.922 3.584-32.454 8.007-32.454 4.422 0 8.007 14.532 8.007 32.454 0 17.921-3.585 32.454-8.007 32.454-4.423 0-8.007-14.533-8.007-32.454Z"
					fill-rule="evenodd"
					fill="#A238FF"
				>
				</path>
			</svg>
		</div>
	</div>
</div>
