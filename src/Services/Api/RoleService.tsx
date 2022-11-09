import { IGifFileRes } from '../../Models/GifRes';
import { IPaginationDTO } from '../../Models/Pagination';
import { GetUserToken } from '../LocalStorage';
import Domain from './Domain';

export default class RoleService {
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

    GetRoleType(payload: IPaginationDTO<IGifFileRes>) {
        const options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        };
        return fetch(`${this.userEndpoint}/getGifs`, options);
    }
}
