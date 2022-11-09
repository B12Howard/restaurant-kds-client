import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { db } from '../../../db';
import { IPlaylist } from '../../../Models/playlist';
import { IPlaylistRecord, PlaylistRecord } from '../../../Models/record';
// @ts-ignore
import { toast } from 'materialize-css/dist/js/materialize.min.js';

interface Props {
    editPlaylist: IPlaylist | undefined;
    setEditPlaylist: any;
}

const usePlaylistEdit = ({ editPlaylist, setEditPlaylist }: Props) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');
    const [playlistOrder, setPlaylistOrder] = useState<IPlaylistRecord[] | null | undefined>(undefined);
    const myPlaylists = useLiveQuery(() => db.playlists.toArray());
    const [targetPlaylist, setTargetPlaylist] = useState<number | null>();

    useEffect(() => {
        setPlaylistOrder(editPlaylist?.record);
    }, [editPlaylist]);

    function getPlaylists() {
        return myPlaylists;
    }

    async function addGif(playlist: IPlaylist, url: string) {
        if (!playlist.id) return;
        if (!url) return;

        try {
            const id = playlist.id;
            const record = new PlaylistRecord(url);
            await convertToBlob([record]);

            await db.playlists
                .where('id')
                .equals(playlist.id)
                .modify((playlist: IPlaylist) => (playlist.record ? playlist.record.push(record) : null));

            await refresh(id);

            setUrl('');
        } catch (error) {
            setStatus(`Failed to add ${playlist.name}: ${error}`);
        }
    }

    async function addGifFromUploads(playlist: IPlaylist, url: string) {
        if (!playlist.id) return;
        if (!url) return;

        try {
            const id = playlist.id;
            const record = new PlaylistRecord(url);
            await convertToBlobWithHeaders([record]);

            await db.playlists
                .where('id')
                .equals(playlist.id)
                .modify((playlist: IPlaylist) => (playlist.record ? playlist.record.push(record) : null));

            await refresh(id);

            setUrl('');
        } catch (error) {
            setStatus(`Failed to add ${playlist.name}: ${error}`);
        }
    }

    async function saveOrder(playlistOrder: IPlaylistRecord[], playlist: IPlaylist) {
        if (!playlist.id) return;
        if (!playlistOrder) return;

        try {
            convertToBlob(playlistOrder).then(async () => {
                if (!playlist.id) return;
                await db.playlists
                    .where('id')
                    .equals(playlist.id)
                    .modify((playlist: IPlaylist) => (playlist.record = [...playlistOrder]));

                toast({ html: 'Saved', displayLength: 3000 });
            });
        } catch (error) {
            setStatus(`Failed to update playlist order: ${error}`);
        }
    }

    async function deleteRecord(deletedIndex: number) {
        if (!editPlaylist || !editPlaylist?.id) return;
        if (!playlistOrder) return;

        const copyPlaylist = playlistOrder.filter((element, index) => index !== deletedIndex);
        try {
            await db.playlists
                .where('id')
                .equals(editPlaylist.id)
                .modify((playlist: IPlaylist) => (playlist.record = copyPlaylist));

            await refresh(editPlaylist.id);
        } catch (error) {
            setStatus(`Failed to delete`);
        }
    }

    async function refresh(id: number) {
        await db.playlists
            .where('id')
            .equals(id)
            .toArray()
            .then((x) => {
                if (!x.length) return;
                setEditPlaylist(x[0]);
            });
    }

    async function convertToBlob(playlistOrder: IPlaylistRecord[]) {
        for (let element of playlistOrder) {
            try {
                if (!element.blob) {
                    const res = await fetch(element.url);
                    const blob: Blob = await res.blob();

                    if (blob) {
                        element['blob'] = blob;
                    }
                }
            } catch (error) {}
        }
    }

    async function convertToBlobWithHeaders(playlistOrder: IPlaylistRecord[]) {
        for (let element of playlistOrder) {
            try {
                const res = await fetch(element.url, {
                    method: 'GET',
                    mode: 'cors',
                });
                const blob: Blob = await res.blob();

                if (blob) {
                    element['blob'] = blob;
                }
            } catch (error) {}
        }
    }

    function addGifFromUpload(playlistId: number, url: string) {}

    return {
        targetPlaylist,
        setTargetPlaylist,
        addGifFromUpload,
        addGif,
        status,
        setStatus,
        url,
        setUrl,
        saveOrder,
        playlistOrder,
        setPlaylistOrder,
        deleteRecord,
        getPlaylists,
        addGifFromUploads,
    };
};

export default usePlaylistEdit;
