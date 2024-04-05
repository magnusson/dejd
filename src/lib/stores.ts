import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const statsStorage = browser && localStorage.getItem('stats');
const storedStats = statsStorage
	? JSON.parse(statsStorage)
	: {
			played: 0,
			wins: 0,
			skips: 0,
			streak: 0,
			maxStreak: 0
		};
export const stats = writable(browser && storedStats);
stats.subscribe((val) => browser && (localStorage.stats = JSON.stringify(val)));
