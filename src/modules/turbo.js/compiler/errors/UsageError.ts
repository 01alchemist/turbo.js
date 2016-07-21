import {CapturedError} from "./CapturedError";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class UsageError extends CapturedError {
    constructor(msg:string) {
        super("UsageError", "Usage error: " + msg);
    }
}