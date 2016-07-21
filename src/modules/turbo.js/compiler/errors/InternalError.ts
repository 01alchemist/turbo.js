import {CapturedError} from "./CapturedError";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class InternalError extends CapturedError {
    constructor(msg:string) {
        super("InternalError", "Internal error: " + msg);
    }
}