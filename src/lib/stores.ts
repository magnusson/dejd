import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const getCurrentDate = () => new Date().toISOString().slice(0, 10);

const statsStorage = browser && localStorage.getItem('stats');
let storedStats = statsStorage
	? JSON.parse(statsStorage)
	: {
			played: 0,
			wins: 0,
			skips: 0,
			streak: 0,
			maxStreak: 0,
			daily: {
				date: getCurrentDate(),
				played: 0,
				wins: 0,
				skips: 0,
				streak: 0,
				maxStreak: 0
			}
		};
if (!storedStats.daily || storedStats.daily.date !== getCurrentDate()) {
	storedStats = {
		...storedStats,
		daily: {
			date: getCurrentDate(),
			played: 0,
			wins: 0,
			skips: 0,
			streak: 0,
			maxStreak: 0
		}
	};
}
export const stats = writable(browser && storedStats);
stats.subscribe((val) => {
	if (browser) {
		val.daily.date = getCurrentDate();
		localStorage.stats = JSON.stringify(val);
	}
});

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

const neverRepeatStorageInfo = browser && localStorage.getItem('neverRepeatInfo');
const storedNeverRepeatInfo = neverRepeatStorageInfo ? JSON.parse(neverRepeatStorageInfo) : true;
export const neverRepeatInfo = writable(browser && storedNeverRepeatInfo);
neverRepeatInfo.subscribe((val) => browser && (localStorage.neverRepeatInfo = JSON.stringify(val)));

const neverRepeatStorage = browser && localStorage.getItem('neverRepeat');
const storedNeverRepeat = neverRepeatStorage ? JSON.parse(neverRepeatStorage) : false;
export const neverRepeat = writable(browser && storedNeverRepeat);
neverRepeat.subscribe((val) => browser && (localStorage.neverRepeat = JSON.stringify(val)));

const playedTracksStorage = browser && localStorage.getItem('playedTracks');
const storedPlayedTracks = playedTracksStorage ? JSON.parse(playedTracksStorage) : [];
export const playedTracks = writable(browser && storedPlayedTracks);
playedTracks.subscribe((val) => browser && (localStorage.playedTracks = JSON.stringify(val)));
