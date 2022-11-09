import { GetUserToken } from './LocalStorage';
/**
 * This function checks the user's localstorage for a jwt token to determine whether the token is still valid
 *
 * @return {{type: sting, status: bool}} key value pair
 */
function isTokenValid() {
    let token = GetUserToken();
    const now = new Date().valueOf();

    if (token === 'undefined') token = undefined;
    if (token !== undefined && token !== null && token !== '') {
        const tokenParts = token.split(/\./);
        const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
        const jwtDate = new Date(tokenDecoded.exp * 1000);
        const newDate = new Date();
        const isExp = newDate > jwtDate;

        if (isExp) {
            localStorage.clear();
            return { type: 'normal', status: false };
        }

        // Valid token
        if (now < jwtDate) {
            return { type: 'normal', status: true };
        }
    } else {
        localStorage.clear();
        return { type: 'normal', status: false };
    }
}

export { isTokenValid };
