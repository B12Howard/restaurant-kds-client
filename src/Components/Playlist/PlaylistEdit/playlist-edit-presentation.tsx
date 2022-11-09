import usePlaylistEdit from './playlist-edit-smart';
import { IPlaylist } from '../../../Models/playlist';
import CustomButton from '../../../Shared/Components/ButtonType1/button';
import { useNavigate } from 'react-router-dom';
import './_playlist.scss';
import { Button, Modal } from 'react-materialize';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    playlist: IPlaylist | undefined;
    editPlaylist: IPlaylist | undefined;
    setEditPlaylist: any;
    setActivePlaylist: any;
    setPlaylistForPlayer: any;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
    deletePlaylist: any;
}

const PlaylistEditPresentation = ({
    editPlaylist,
    setEditPlaylist,
    setActivePlaylist,
    playlist,
    setPlaylistForPlayer,
    newPlaylist,
    setNewPlaylist,
    addPlaylist,
    deletePlaylist,
}: Props) => {
    const navigate = useNavigate();

    const { addGif, url, setUrl, saveOrder, playlistOrder, setPlaylistOrder, deleteRecord, getPlaylists } =
        usePlaylistEdit({
            editPlaylist,
            setEditPlaylist,
        });

    return (
        <>
            <p>Add Playlist</p>
            <div>
                <input type="text" value={newPlaylist} onChange={(ev) => setNewPlaylist(ev.target.value)} />
            </div>
            <div>
                <CustomButton
                    name={'Add Playlist'}
                    callback={(val: any) => {
                        addPlaylist(newPlaylist);
                        setNewPlaylist('');
                    }}
                />
            </div>
            <div>
                <p>Playlists</p>
            </div>

            <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getPlaylists()
                            ?.filter((playlist: IPlaylist) => playlist.name)
                            ?.map((playlist: IPlaylist, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td
                                            className={`playlist-list-item fixed-5`}
                                            onClick={() => {
                                                setEditPlaylist(playlist);
                                                setActivePlaylist(playlist);
                                                navigate(`/home/playlist/${playlist.id}/edit`, {
                                                    replace: false,
                                                });
                                            }}
                                        >
                                            <span>{playlist.name}</span>
                                        </td>
                                        <td>{playlist.record?.length}</td>
                                        <td>
                                            <Modal
                                                actions={[
                                                    <Button flat modal="close" node="button">
                                                        Cancel
                                                    </Button>,
                                                    <Button
                                                        flat
                                                        modal="close"
                                                        node="button"
                                                        onClick={() => {
                                                            deletePlaylist(playlist);
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>,
                                                ]}
                                                fixedFooter={false}
                                                header="Confirm Delete"
                                                id="Modal-11"
                                                open={false}
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,

                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%',
                                                }}
                                                trigger={
                                                    <button className={`action-button`}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                }
                                            >
                                                <span>Do you want to delete {playlist.name}?</span>
                                            </Modal>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </>
        </>
    );
};

export default PlaylistEditPresentation;
