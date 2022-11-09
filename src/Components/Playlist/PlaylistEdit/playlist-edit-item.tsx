import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IPlaylistRecord } from '../../../Models/record';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Button, Modal } from 'react-materialize';

interface Props {
    record: IPlaylistRecord;
    index: number;
    deleteRecord: any;
    playlistOrder: IPlaylistRecord[];
    setDuration: any;
}

const PlaylistEditItem = ({ record, index, deleteRecord, playlistOrder, setDuration }: Props) => {
    const prepareObjectUrl = (blob: Blob): string => {
        try {
            return URL.createObjectURL(blob);
        } catch (error) {
            return '';
        }
    };

    return (
        <Draggable draggableId={record.id + '' + index} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className={`flex top`}>
                        <img
                            className="edit-preview"
                            src={record?.blob?.size ? prepareObjectUrl(record.blob) : record.url}
                            alt="loading..."
                        />

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
                                        deleteRecord(index);
                                    }}
                                >
                                    Confirm
                                </Button>,
                            ]}
                            fixedFooter={false}
                            header="Confirm Delete"
                            id="Modal-13"
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
                            <span className={`modal-text`}>Do you want to delete {record.url}?</span>
                        </Modal>
                    </div>
                    <div className={`preview-container`}>{record.url}</div>

                    <span className={`label`}>Duration (seconds)</span>
                    <input
                        className={`seconds-input`}
                        type="number"
                        min="0"
                        value={playlistOrder[index].duration}
                        onChange={(e) => setDuration(index, e.target.value)}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default PlaylistEditItem;
