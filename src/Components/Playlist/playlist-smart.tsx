import { useEffect, useState, useContext } from 'react';
import { db, IFriend } from '../../db';
import { IPlaylist } from '../../Models/playlist';
import { Context } from '../../Store/Store';
// @ts-ignore
import { toast } from 'materialize-css/dist/js/materialize.min.js';

const usePlaylist = ({ defaultAge } = { defaultAge: 21 }) => {
    const [name, setName] = useState('');
    const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
    const [newPlaylist, setNewPlaylist] = useState('');
    const [editPlaylist, setEditPlaylist] = useState<IPlaylist | undefined>(undefined);
    const [url, setUrl] = useState('');
    const [age, setAge] = useState(defaultAge);
    const [status, setStatus] = useState('');
    const [activePlaylist, setActivePlaylist] = useState<IPlaylist | undefined>(undefined);
    // @ts-ignore
    const [context, dispatch] = useContext(Context);

    useEffect(() => {
        db.playlists.orderBy('name').eachPrimaryKey(function (primaryKey) {
            // This callback will be called in the firstName order and provide
            // the primary key of the object it refers to.
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_PLAYLIST',
            payload: {
                playlist,
            },
        });

        if (playlist?.id) {
            const plid = playlist.id;
            const setPlaylist = async (plid: number) => {
                setPlaylistForPlayer(plid);
            };

            setPlaylist(plid);
        }
    }, [playlist]);

    async function getPlaylistForEdit(playlistId: number) {
        if (!playlistId) {
            return;
        }
        await db.playlists
            .where('id')
            .equals(playlistId)
            .toArray()
            .then((x) => {
                if (!x.length) return;
                setEditPlaylist(x[0]);
            });
    }

    async function addPlaylist(name: string) {
        if (!name.length) {
            return;
        }

        try {
            const exists = (await db.playlists.where('name').equals(name).count()) > 0;

            if (exists) {
                toast({ html: `${name} already exists`, displayLength: 3000 });
                return;
            }
            const id = await db.playlists.add({
                name,
                record: [],
            });
            setStatus(`Playlist ${name} successfully added.`);
            setPlaylist(undefined);
        } catch (error) {
            setStatus(`Failed to add ${name}: ${error}`);
        }
    }

    async function deletePlaylist(playlist: IPlaylist) {
        if (!playlist?.id) {
            return;
        }

        try {
            const deleted = await db.playlists.where('id').equals(playlist.id).delete();
            toast({ html: `Playlist ${playlist.name} deleted`, displayLength: 3000 });
        } catch (error) {
            setStatus(`Failed to delete ${name}: ${error}`);
        }
    }

    async function deleteFriend(friend: IFriend) {
        try {
            const pk = friend?.id;
            if (!pk) return;
            const res = await db.friends.delete(pk);
            setStatus(`Friend ${name} successfully deleted.`);
        } catch (error) {
            setStatus(`Failed to delete ${friend.name}: ${error}`);
        }
    }

    async function setPlaylistForPlayer(id: number) {
        await db.playlists
            .where('id')
            .equals(id)
            .toArray()
            .then((x) => {
                if (!x.length) return;
                setActivePlaylist(x[0]);
            });
    }

    return {
        setName,
        setAge,
        name,
        age,
        status,
        deleteFriend,
        addPlaylist,
        deletePlaylist,
        setPlaylist,
        playlist,
        url,
        setUrl,
        activePlaylist,
        setActivePlaylist,
        editPlaylist,
        setEditPlaylist,
        newPlaylist,
        setNewPlaylist,
        setPlaylistForPlayer,
        getPlaylistForEdit,
    };
};

export default usePlaylist;
