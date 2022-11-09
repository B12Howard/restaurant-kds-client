import { useState } from 'react';
import { GetUserDataByKey } from '../../Services/LocalStorage';
import { ConvertPayloadDTO, IConvertPayloadDTO } from '../../Models/ConvertPayload';
import ConvertToGifService from '../../Services/Api/ConverterService';
import Button from '../../Shared/Components/ButtonType1/button';
// @ts-ignore
import { toast } from 'materialize-css/dist/js/materialize.min.js';
import DurationInput from '../../Shared/Components/Time/duration-input';

const GifCreator = () => {
    const [mp4Url, setMp4Url] = useState<string>('');
    const [start, setStart] = useState<{ hour: string; min: string; sec: string }>({
        hour: '',
        min: '',
        sec: '',
    });
    const [end, setEnd] = useState<{ hour: string; min: string; sec: string }>({
        hour: '',
        min: '',
        sec: '',
    });

    const submit = async () => {
        if (!mp4Url || !start || !end) return;

        if (!validateDuration()) {
            toast({ html: 'Start time has to be before the end time', displayLength: 3000 });

            return;
        }

        const uid = GetUserDataByKey('uid');
        const payload: IConvertPayloadDTO = new ConvertPayloadDTO({
            video: mp4Url,
            start: `${createNumberForPayload(start.hour)}:${createNumberForPayload(start.min)}:${createNumberForPayload(
                start.sec
            )}`,
            end: `${createNumberForPayload(end.hour)}:${createNumberForPayload(end.min)}:${createNumberForPayload(
                end.sec
            )}`,
            wsUserID: uid,
        });

        const res = await ConvertToGifService(payload);

        // TODO parse json for message
        const message = await res.json();
        toast({ html: res.statusText, displayLength: 3000 });
    };

    const createNumberForPayload = (num: string | number) => {
        if (typeof num === 'number') {
            num = num.toString();
            if (num.length < 1) {
                num = '00';
            }
        }
        return num.padStart(2, '0');
    };

    const validateDuration = () => {
        const startTime = new Date();
        const endTime = new Date();

        return (
            startTime.setHours(Number(start.hour), Number(start.min), Number(start.sec), 0) <=
            endTime.setHours(Number(end.hour), Number(end.min), Number(end.sec), 0)
        );
    };

    return (
        <>
            <div>
                Gif Creator
                <input
                    id="mp4Url"
                    name="mp4Url"
                    type="text"
                    value={mp4Url}
                    onChange={(ev) => setMp4Url(ev.target.value)}
                />
                <label htmlFor="email">MP4 URL</label>
            </div>

            <DurationInput setTime={setStart} time={start} />
            <label>Start</label>

            <DurationInput setTime={setEnd} time={end} />
            <label>End</label>

            <div>
                <Button name={'Submit'} callback={(val: any) => submit()} />
            </div>
        </>
    );
};

export default GifCreator;
