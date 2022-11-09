import { SqlDate } from './Date';

export interface IPaginationDTO<T> {
    rowCount: number;
    lastId: number | null;
    lastDate: SqlDate | null;
    records?: T[];
    next: boolean;
}

export class PaginationDTO<T> implements IPaginationDTO<T> {
    rowCount: number = 0;
    lastId: number | null = null;
    lastDate: SqlDate | null = null;
    records?: T[] = [];
    next: boolean = true;
    constructor(params: Partial<IPaginationDTO<T>>) {
        return Object.assign(this, params);
    }
}
