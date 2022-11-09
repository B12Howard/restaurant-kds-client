import { PlaylistRecord } from './record';

export interface IPlaylist {
    id?: number;
    name: string;
    record?: PlaylistRecord[];
}
