import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePlaylist from './playlist-smart';
import EditSinglePlaylist from './PlaylistEdit/edit-single-playlist-presentation';
import PlaylistEditPresentation from './PlaylistEdit/playlist-edit-presentation';
import './PlaylistEdit/_playlist.scss';
interface Props {
    mode: string;
}

const PlaylistLayout = ({ mode }: Props) => {
    const [displayMode, setDisplayMode] = useState<string>(mode);
    const [params, setParams] = useState<string>();
    const { playlistId } = useParams();
    const {
        newPlaylist,
        setNewPlaylist,
        addPlaylist,
        deletePlaylist,
        playlist,
        setActivePlaylist,
        editPlaylist,
        setEditPlaylist,
        setPlaylistForPlayer,
        getPlaylistForEdit,
    } = usePlaylist();

    useEffect(() => {
        setDisplayMode(mode);
    }, [mode]);

    useEffect(() => {
        setParams(playlistId);
        if (mode === 'edit' && !editPlaylist && playlistId) {
            getPlaylistForEdit(Number(playlistId));
        }
    }, [playlistId]);

    return (
        <>
            {displayMode === 'list' && (
                <div>
                    <PlaylistEditPresentation
                        setPlaylistForPlayer={setPlaylistForPlayer}
                        playlist={playlist}
                        editPlaylist={editPlaylist}
                        setEditPlaylist={setEditPlaylist}
                        setActivePlaylist={setActivePlaylist}
                        newPlaylist={newPlaylist}
                        setNewPlaylist={setNewPlaylist}
                        addPlaylist={addPlaylist}
                        deletePlaylist={deletePlaylist}
                    />
                </div>
            )}
            {displayMode === 'edit' && (
                <div>
                    <EditSinglePlaylist
                        setPlaylistForPlayer={setPlaylistForPlayer}
                        editPlaylist={editPlaylist}
                        setEditPlaylist={setEditPlaylist}
                    />
                </div>
            )}
        </>
    );
};

export default PlaylistLayout;
