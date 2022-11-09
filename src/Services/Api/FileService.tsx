import { IGifFileRes } from '../../Models/GifRes';
import { IPaginationDTO } from '../../Models/Pagination';
import { GetUserToken } from '../LocalStorage';
import Domain from './Domain';

/**
 * Returns a Promise
 *
 * @param {string} link The user's input url
 * @return {Promise}
 */
export default class FileService {
    public headers = {};
    public userEndpoint = '';
    public fileEndpoint = '';

    constructor() {
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + GetUserToken(),
        };
        this.userEndpoint = `${Domain()}getUser`;
        this.fileEndpoint = `${Domain()}getSignedUrlGif`;
    }

    GetGifsPagination(payload: IPaginationDTO<IGifFileRes>) {
        const options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        };
        return fetch(`${this.userEndpoint}/getGifs`, options);
    }

    DeleteGifById(gifId: number) {
        const options = {
            method: 'Delete',
            headers: this.headers,
            body: JSON.stringify({ gifId }),
        };
        return fetch(`${this.userEndpoint}/deleteGif`, options);
    }

    GetSignedUrl(authenticatedUrl: string) {
        const options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ authenticatedUrl }),
        };
        return fetch(`${this.fileEndpoint}`, options);
    }
}
