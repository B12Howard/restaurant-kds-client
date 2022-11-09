import { IFirebaseAuthResponse } from '../Models/FirebaseAuth';

/**
 * Sets user data into local storage
 * @param {object} data of the form {"first_name", "last_name", "email", "linkedin"} 3/15/21
 * @param {string} accessToken jwt token
 */
export const SetUserDataLocalStorage = (data: IFirebaseAuthResponse) => {
    localStorage.setItem('accessToken', data.stsTokenManager.accessToken);
    localStorage.setItem('refreshToken', data.stsTokenManager.refreshToken);
    localStorage.setItem('user', JSON.stringify(data));
};

export const GetUserDataByKey = (key: string) => {
    const user = localStorage.getItem('user');
    if (!user) return;
    return JSON.parse(user)[key];
};

export const DeleteLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
};

export const GetUserToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;
    return accessToken;
};
