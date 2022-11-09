export interface IPlaylistRecord {
    id?: number;
    url: string;
    order?: number;
    blob?: Blob;
    duration: number;
}

export class PlaylistRecord implements IPlaylistRecord {
    id?: number;
    url: string;
    order?: number;
    blob?: Blob;
    duration: number;
    constructor(url: string, duration?: number) {
        this.url = url;
        this.duration = duration ?? 2500;
    }
}
