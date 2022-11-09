import { faPlusSquare, faTrashCan, faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Modal, Select } from 'react-materialize';
import { IPlaylist } from '../../Models/playlist';
import CustomButton from '../../Shared/Components/ButtonType1/button';
import usePlaylistEdit from '../Playlist/PlaylistEdit/playlist-edit-smart';
import useGif from '../GifCreator/gif-smart';
import usePlaylist from '../Playlist/playlist-smart';

const MyUploads = () => {
    const {
        completeGetSignedUrl,
        getSignedUrl,
        previewUrl,
        setPreviewUrl,
        rowCount,
        setRowCount,
        paginationCount,
        paginationRes,
        setPaginationRes,
        deleteGifById,
        getGifsPagination,
        paginationNext,
        paginationPrev,
    } = useGif();

    const { saveOrder, targetPlaylist, setTargetPlaylist, getPlaylists, addGif, playlistOrder, addGifFromUploads } =
        usePlaylistEdit({
            editPlaylist: undefined,
            setEditPlaylist: null,
        });

    const { getPlaylistForEdit, editPlaylist, setEditPlaylist } = usePlaylist();
    const [localTargetPlaylistObj, setLocalTargetPlaylistObj] = useState<IPlaylist | null | undefined>();

    useEffect(() => {
        getGifsPagination().then((res) => {
            res.json().then((data) => {
                if (data) {
                    setPaginationRes(data);
                }
            });
        });
    }, []);

    const playlistList = getPlaylists()
        ?.filter((playlist: IPlaylist) => playlist.name)
        ?.map((playlist: IPlaylist, idx) => {
            if (idx === 0) {
                return (
                    <>
                        <option value=""></option>
                        <option key={idx} value={JSON.stringify(playlist)}>
                            {playlist.name}
                        </option>
                    </>
                );
            }
            return (
                <option key={idx} value={JSON.stringify(playlist)}>
                    {playlist.name}
                </option>
            );
        }, this);

    const refreshPagination = (count: number = 10) => {
        getGifsPagination(null, count, rowCount).then((res) => {
            res.json().then((data) => {
                if (data) {
                    setPaginationRes(data);
                }
            });
        });
    };

    const deleteGif = async (gifId: number | undefined) => {
        if (!gifId) return;

        const deleteRes = await deleteGifById(gifId);

        if (deleteRes?.status && deleteRes?.status >= 200 && deleteRes.status < 300) {
            refreshPagination(rowCount);
        }
    };

    const addGifUploadToPlaylist = async (url: string) => {
        if (!localTargetPlaylistObj) return;
        const signedUrl = await completeGetSignedUrl(url).catch(alert);
        const imageUrl = signedUrl?.authenticatedUrl && signedUrl.authenticatedUrl;

        if (!localTargetPlaylistObj || !imageUrl) return;

        await addGifFromUploads(localTargetPlaylistObj, imageUrl);

        setTargetPlaylist(null);
        setPreviewUrl('');
        setEditPlaylist(undefined);
    };

    return (
        <>
            <div className={``}>
                <Helmet>
                    <title>My Remote Files</title>
                </Helmet>
            </div>
            <div className={`col-md-6 mb-5`}>My Remote Files</div>

            <table>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginationRes?.records?.map((record, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <span>{record.url}</span>
                                </td>
                                <td>{record.created_at?.Time}</td>
                                <td>
                                    <div className={`flex`}>
                                        <div>
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
                                                            addGifUploadToPlaylist(record.url);
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>,
                                                ]}
                                                fixedFooter={false}
                                                header="Add to Playlist"
                                                id="Modal-16"
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
                                                        <FontAwesomeIcon icon={faPlusSquare} />
                                                    </button>
                                                }
                                            >
                                                <div>
                                                    <Select
                                                        id="Select-31"
                                                        multiple={false}
                                                        onChange={(e) =>
                                                            setLocalTargetPlaylistObj(JSON.parse(e.target.value))
                                                        }
                                                        options={{
                                                            classes: '',
                                                            dropdownOptions: {
                                                                alignment: 'left',
                                                                autoTrigger: true,
                                                                closeOnClick: true,
                                                                constrainWidth: true,
                                                                coverTrigger: true,
                                                                hover: false,
                                                                inDuration: 150,
                                                                onCloseEnd: () => {
                                                                    // setTargetPlaylist(null);
                                                                    setPreviewUrl('');
                                                                },
                                                                //   onCloseStart: null,
                                                                //   onOpenEnd: null,
                                                                onOpenStart: () => {
                                                                    // document.getElementById('Select-31')?.nodeValue
                                                                    //     ? (document.getElementById(
                                                                    //           'Select-31'
                                                                    //       ).nodeValue = null)
                                                                    //     : null;
                                                                    // setTargetPlaylist(this.);
                                                                    // setPreviewUrl('');
                                                                },
                                                                outDuration: 250,
                                                            },
                                                        }}
                                                        value=""
                                                    >
                                                        {playlistList}
                                                    </Select>
                                                </div>
                                            </Modal>
                                        </div>
                                        <div>
                                            <Modal
                                                actions={[
                                                    <Button
                                                        flat
                                                        modal="close"
                                                        node="button"
                                                        // onClick={() => setPreviewUrl('')}
                                                    >
                                                        Close
                                                    </Button>,
                                                ]}
                                                fixedFooter={false}
                                                header="Preview"
                                                id="Modal-13"
                                                open={false}
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,
                                                    onCloseEnd: () => {
                                                        setPreviewUrl('');
                                                    },
                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%',
                                                }}
                                                trigger={
                                                    <button className={`action-button`}>
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            onClick={() => getSignedUrl(record.url)}
                                                        />
                                                    </button>
                                                }
                                            >
                                                <div className={'preview-modal'}>
                                                    View Gif Here
                                                    <div>
                                                        {previewUrl && (
                                                            <img
                                                                className="uploaded-file-preview"
                                                                src={previewUrl}
                                                                alt="loading..."
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                {/* put dropdown here and button to add to playlist */}
                                                {/* put trash to delete, opens modal */}
                                            </Modal>
                                        </div>
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
                                                        deleteGif(record?.id);
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
                                            <span>Do you want to delete {record.url}?</span>
                                        </Modal>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                My Files
                <div className="">
                    <Select
                        noLayout
                        name="mySelect"
                        onChange={(event) => {
                            setRowCount(+event.target.value);
                            refreshPagination(+event.target.value);
                        }}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </Select>
                </div>
                <div className="flex">
                    <CustomButton name={'◀'} callback={() => paginationPrev()} disabled={paginationCount === 0} />

                    <CustomButton name={'▶'} callback={() => paginationNext()} />
                </div>
            </div>
        </>
    );
};

export default MyUploads;
