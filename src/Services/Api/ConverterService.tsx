import { IConvertPayloadDTO } from '../../Models/ConvertPayload';
import { GetUserToken } from '../LocalStorage';
import Domain from './Domain';

/**
 * Returns a Promise
 *
 * @param {string} link The user's input url
 * @return {Promise}
 */
export default function ConvertToGifService(payload: IConvertPayloadDTO) {
    const token = GetUserToken();
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(payload),
    };
    return fetch(Domain() + 'useConverter/convertVideoToGif', options);
}
