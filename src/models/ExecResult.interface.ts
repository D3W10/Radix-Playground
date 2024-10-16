export interface ExecResult {
    status: -1 | 0 | 1;
    log: string;
    err: string;
}