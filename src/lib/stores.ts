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

const defaultPlaylists = {
	Original: { active: true, playlist: 'Original' },
	Disney: { active: true, playlist: 'Disney' },
	Swedish: { active: true, playlist: 'Swedish' },
	Special: { active: true, playlist: 'Special' },
	Bandle: { active: true, playlist: 'Bandle' },
	Holland: { active: true, playlist: 'Holland' }
};
const playlistsStorage = browser && localStorage.getItem('playlists');
const storedPlaylists = playlistsStorage
	? { ...defaultPlaylists, ...JSON.parse(playlistsStorage) }
	: defaultPlaylists;
export const playlists = writable(browser && storedPlaylists);
playlists.subscribe((val) => browser && (localStorage.playlists = JSON.stringify(val)));

const ignoredTracksStorage = browser && localStorage.getItem('ignoredTracks');
const storedIgnoredTracks = ignoredTracksStorage ? JSON.parse(ignoredTracksStorage) : [];
export const ignoredTracks = writable(browser && storedIgnoredTracks);
ignoredTracks.subscribe((val) => browser && (localStorage.ignoredTracks = JSON.stringify(val)));
