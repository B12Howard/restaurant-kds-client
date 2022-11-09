export interface IConvertPayloadDTO {
    video: string;
    start: string;
    end: string;
    wsUserID?: string;
}

export class ConvertPayloadDTO implements IConvertPayloadDTO {
    video: string = '';
    start: string = '';
    end: string = '';
    wsUserID?: string;
    constructor(params: Partial<IConvertPayloadDTO>) {
        return Object.assign(this, params);
    }
}
