import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { IPlaylist } from '../../../Models/playlist';
import { IPlaylistRecord } from '../../../Models/record';
import Button from '../../../Shared/Components/ButtonType1/button';
import usePlaylistEdit from './playlist-edit-smart';
import PlaylistEditItem from './playlist-edit-item';

interface Props {
    editPlaylist: IPlaylist | undefined;
    setEditPlaylist: any;
    setPlaylistForPlayer: any;
}

const EditSinglePlaylist = ({ editPlaylist, setEditPlaylist, setPlaylistForPlayer }: Props) => {
    const { addGif, url, setUrl, saveOrder, playlistOrder, setPlaylistOrder, deleteRecord, getPlaylists } =
        usePlaylistEdit({
            editPlaylist,
            setEditPlaylist,
        });
    const navigate = useNavigate();

    // TODO use useEffect to fetch playlist by id number if editPlaylist is false

    const setDuration = (index: number, duration: string) => {
        if (!playlistOrder) {
            return;
        }
        const alteredplaylistOrder: IPlaylistRecord[] | undefined = [...playlistOrder];

        if (playlistOrder) {
            alteredplaylistOrder[index].duration = Number(duration);
            const prop = index;

            if (playlistOrder) {
                setPlaylistOrder(alteredplaylistOrder);
            }
        }
    };

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (destination === undefined || destination === null) return null;
        // Make sure we're actually moving the item
        if (destination.index === source.index) return null;
        // Move the item within the list
        // Start by making a new list without the dragged item
        if (!playlistOrder) return;

        const newList = playlistOrder?.filter((_: any, idx: number) => idx !== source.index);
        newList.splice(destination.index, 0, playlistOrder[source.index]);

        setPlaylistOrder(newList);
    };

    return (
        <div>
            <div>
                <button
                    className={`back`}
                    onClick={() => {
                        navigate(`/home/playlists`, { replace: false });
                    }}
                >
                    <FontAwesomeIcon size={'2x'} icon={faCircleLeft} />
                </button>
            </div>

            {editPlaylist && (
                <div className={`base-form-container`}>
                    <div>
                        <input type="text" value={url} onChange={(ev) => setUrl(ev.target.value)} />
                    </div>
                    <div className={`flex  base-input-container`}>
                        <div className={`button-container`}>
                            <Button
                                name={'Add Gif'}
                                callback={() => {
                                    if (!editPlaylist) return;
                                    addGif(editPlaylist, url);
                                }}
                            />
                        </div>
                        <div className={`button-container`}>
                            <Button
                                name={'Save Changes'}
                                callback={() => {
                                    if (!playlistOrder) return;
                                    saveOrder(playlistOrder, editPlaylist);
                                }}
                            />
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="preview-records">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {playlistOrder?.map((record: IPlaylistRecord, index: number) => (
                                        <div>
                                            <PlaylistEditItem
                                                key={index}
                                                record={record}
                                                index={index}
                                                deleteRecord={deleteRecord}
                                                playlistOrder={playlistOrder}
                                                setDuration={setDuration}
                                            />
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </div>
    );
};

export default EditSinglePlaylist;
