import type { Track } from '$lib/types/Track';

export const formatTrack = (track: Track) => `${track.title} - ${track.artist}`;
