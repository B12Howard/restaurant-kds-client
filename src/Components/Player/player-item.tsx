import { IPlaylistRecord } from '../../Models/record';
import './_player.scss';
interface Props {
    record: IPlaylistRecord;
}

const PlayerItem = ({ record }: Props) => {
    const createImage = (record: IPlaylistRecord): string => {
        let reader = new FileReader();
        if (!record?.blob) return record.url;
        const blobUrl = URL.createObjectURL(record?.blob);

        return blobUrl;
    };

    return (
        <div>
            <img
                className={'player-item'}
                src={record?.blob ? URL.createObjectURL(record?.blob) : record.url}
                alt="loading..."
            />
        </div>
    );
};

export default PlayerItem;
