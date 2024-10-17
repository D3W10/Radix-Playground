export interface ServerResult<T> {
    status: -1 | 0 | 1;
    data?: T;
}