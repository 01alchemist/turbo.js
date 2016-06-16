import {SharedArrayBuffer, IMemory} from "./IMemory";
import {MemoryBase} from "./MemoryBase";
/**
 * Created by Nidin Vinayakan on 13/6/2016.
 */
export class Memory extends MemoryBase implements IMemory{

    constructor(public TOTAL_MEMORY:number) {
        super(new window["SharedArrayBuffer"](TOTAL_MEMORY));
    }
}