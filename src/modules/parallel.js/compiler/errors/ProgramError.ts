import {CapturedError} from "./CapturedError";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class ProgramError extends CapturedError {
    constructor(file:string, line:number, msg:string) {
        super("ProgramError", file + ":" + line + ": " + msg);
    }
}