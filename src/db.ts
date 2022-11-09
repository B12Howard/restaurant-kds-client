import Dexie, { Table } from 'dexie';
import { IPlaylist } from './Models/playlist';

export interface IFriend {
    id?: number;
    name: string;
    age: number;
}

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    friends!: Table<IFriend>;
    playlists!: Table<IPlaylist>;

    constructor() {
        super('myDatabase');
        this.version(2).stores({
            friends: '++id, name, age', // Primary key and indexed props
            playlists: '++id, name',
        });
    }
}

export const db = new MySubClassedDexie();
