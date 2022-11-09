import { useEffect } from 'react';
import { IPlaylist } from '../../Models/playlist';

interface Props {
    activePlaylist: IPlaylist | undefined;
    setActivePlaylist: any;
    setEditPlaylist: any;
}
const PlaylistPreviewPresentation = ({ activePlaylist, setActivePlaylist, setEditPlaylist }: Props) => {
    const toggleEdit = () => {
        setEditPlaylist(activePlaylist);
        setActivePlaylist(undefined);
    };
    useEffect(() => {}, []);

    if (activePlaylist) {
        return (
            <div>
                <div>
                    <button onClick={() => toggleEdit()}>Edit Playlist</button>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default PlaylistPreviewPresentation;
