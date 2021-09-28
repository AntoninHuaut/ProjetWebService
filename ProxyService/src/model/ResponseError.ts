export default class ResponseError extends Error {

    private readonly _status: number;
    private readonly _path: string;

    constructor(status: number, path: string, msg: string) {
        super(msg);
        this._status = status;
        this._path = path;
    }

    get status() {
        return this._status;
    }

    get path() {
        return this._path;
    }
}