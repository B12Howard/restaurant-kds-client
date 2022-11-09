export interface IFirebaseAuthResponse {
    displayName: string;
    email: string;
    expiresIn: number;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
    accessToken: string;
    stsTokenManager: {
        accessToken: string;
        expirationTime: number | null;
        refreshToken: string;
    };
}

export class FirebaseAuthResponse implements IFirebaseAuthResponse {
    displayName: string = '';
    email: string = '';
    expiresIn: number = 0;
    idToken: string = '';
    kind: string = '';
    localId: string = '';
    refreshToken: string = '';
    registered: boolean = false;
    accessToken: string = '';
    stsTokenManager = {
        accessToken: '',
        expirationTime: null,
        refreshToken: '',
    };
    constructor(params: Partial<IFirebaseAuthResponse>) {
        return Object.assign(this, params);
    }
}
