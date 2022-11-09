export interface ISqlDate {
    Time: string | null;
    Valid: boolean | null;
}

export class SqlDate implements ISqlDate {
    Time: string | null = null;
    Valid: boolean | null = null;
    constructor(params: Partial<ISqlDate>) {
        return Object.assign(this, params);
    }
}
